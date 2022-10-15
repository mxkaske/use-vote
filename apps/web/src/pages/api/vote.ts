import { NextRequest, NextResponse, userAgent } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { z } from "zod";
import { Rating } from "../../utils/types";
import { processData } from "../../utils/stats";
import { NextApiRequest, NextApiResponse } from "next";
import parser from "ua-parser-js";
import requestIp from "request-ip";

const validateBodyRequest = (body: unknown) => {
  return z
    .object({
      rating: z.string(),
    })
    .safeParse(body);
};

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  // different limiter possible. e.g. tokenBucket
  // avoid DDos, max. 10 request every 10 seconds
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

// REMINDER: makes the whole handler to run on the edge
// edge: NextRequest, server: NextApiRequest
// export const config = {
//   runtime: "experimental-edge",
// };
// REMINDER: removing edge will disable req.geo and
// get the users location easily

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pathname = req.query.pathname as string;
    const hostname = req.query.hostname as string;

    switch (req.method) {
      case "GET": {
        const pages = await redis.hgetall(`${hostname}:pages`);
        if (pages && Object.keys(pages).length > 0) {
          const pipeline = redis.pipeline();
          Object.keys(pages).forEach((page) => {
            pipeline.zrange(`${hostname}:ratings:${page}`, 0, -1);
          });
          const results = (await pipeline.exec()) as Rating[][];
          Object.keys(pages).forEach((key, index) => {
            // @ts-ignore TODO: remove
            pages[key]["ratings"] = results[index];
            // REMINDER: all interesting stuff!
            const data = processData({ data: results[index] });
            // @ts-ignore
            pages[key]["data"] = data;
          });
          // TODO: sort pages by zcount
          // TODO: instead of returing
          // { key: Data, ... }, return
          // a sorted array with key included.
          //
          return res.status(200).json(pages);
        }
        return res.status(200).end();
      }
      case "PATCH": {
        // TODO: extract into separate component
        // TODO: make the ratelimit not mandatory
        const result = await ratelimit.limit("api");
        res.setHeader("X-RateLimit-Limit", result.limit);
        res.setHeader("X-RateLimit-Remaining", result.remaining);
        console.log(result);
        if (!result.success) {
          return res.status(200).json({
            message: "The request has been rate limited.",
            rateLimitState: result,
          });
        }
        //
        const validate = validateBodyRequest(req.body);
        if (!validate.success) {
          return res.status(422).end("Invalid Data");
        }
        // check if hashmap includes the pathname
        const exist = await redis.hexists(
          `${hostname}:pages`,
          pathname || "root"
        );
        if (!exist) {
          await redis.hsetnx(`${hostname}:pages`, pathname || "root", {
            url: `${hostname}${pathname || ""}`,
            timestamp: Date.now(),
          });
        }
        const rate: Rating = {
          user: requestIp.getClientIp(req) || "", // req.ip, // FIXME: do not display private IP - https://vercel.com/templates/next.js/edge-functions-crypto
          ua: parser(req.headers["user-agent"]),
          // TODO: FIXME: update prop - For possible future extension, keep it generic
          rating: validate.data.rating, // FIXME: instead of `rating`, call it `data`
          timestamp: Date.now(),
        };
        await redis.zadd(`${hostname}:ratings:${pathname || "root"}`, {
          score: Date.now(),
          member: rate,
        });
        return res.status(200).json({ ok: "OK" });
      }
      default: {
        return res.status(405).end(`Method ${req.method} Not Allowed.`);
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
