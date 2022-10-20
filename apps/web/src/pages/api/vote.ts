import { NextRequest, NextResponse, userAgent } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { z } from "zod";
import { Rating, Page, RequestReturnType, Interval } from "../../utils/types";
import { processData, ProcessDataType } from "../../utils/stats";
import { NextApiRequest, NextApiResponse } from "next";
import parser from "ua-parser-js";
import requestIp from "request-ip";

// TODO: change Rating type
type Rate = {
  data: {}; // move to here
};

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
    const hostname = req.query.hostname as string; // TODO: should be removed...? or at least not mandatory
    const interval = req.query.interval as Interval; // FIXME: how to prevent invalid data

    switch (req.method) {
      case "GET": {
        const pages = await redis.hgetall(`${hostname}:pages`);
        if (pages && Object.keys(pages).length > 0) {
          const pipeline = redis.pipeline();
          Object.keys(pages).forEach((page) => {
            pipeline.zrange(`${hostname}:ratings:${page}`, 0, -1);
          });
          const results = (await pipeline.exec()) as Rating[][];
          const array: RequestReturnType[] = [];
          Object.keys(pages).forEach((key, index) => {
            const data = processData({ data: results[index], interval });
            // TODO: remove baseData from here, should be returned from data
            array.push({ ...data, baseData: pages[key] as Page });
          });
          array.sort(
            (a, b) => (a.totalData.count > b.totalData.count ? -1 : 1)
            // TODO: also sort by alphabet, otherwise random
          );
          // DISCUSS: is it possible to return the <Backend /> Component here?
          return res.status(200).json(array);
        }
        // FIXME: debug
        return res.status(404).end();
      }
      case "PATCH": {
        // TODO: extract into separate component
        // TODO: make the ratelimit not mandatory
        const result = await ratelimit.limit("api");
        res.setHeader("X-RateLimit-Limit", result.limit);
        res.setHeader("X-RateLimit-Remaining", result.remaining);
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
        return res.status(200).json({ ...rate });
      }
      default: {
        return res.status(405).end(`Method ${req.method} Not Allowed.`);
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
