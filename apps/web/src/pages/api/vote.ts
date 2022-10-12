import { NextRequest, userAgent } from "next/server";
import { Redis } from "@upstash/redis";
import crypto from "crypto";
import { z } from "zod";
import { Rating } from "../../utils/types";
import { processData } from "../../utils/stats";

const validateBodyRequest = (body: unknown) => {
  return z
    .object({
      rating: z.string(),
    })
    .safeParse(body);
};

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  try {
    const redis = Redis.fromEnv();
    const pathname = req.nextUrl.searchParams.get("pathname");
    const hostname = req.nextUrl.searchParams.get("hostname");
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
            // @ts-ignore
            pages[key]["ratings"] = results[index];
            const data = processData({ data: results[index] }); // TODO: all interesting stuff!
            // @ts-ignore
            pages[key]["data"] = data;
          });
          return new Response(JSON.stringify(pages), { status: 200 });
        }
        return new Response(JSON.stringify({}), { status: 200 });
      }
      case "PATCH": {
        const json = await req.json();
        const validate = validateBodyRequest(json);
        if (!validate.success) {
          return new Response("Invalid Data", { status: 422 });
        }
        // check if hashmap includes the pathname
        const exist = await redis.hexists(
          `${hostname}:pages`,
          pathname || "root"
        );
        console.log({
          exist,
          ip: req.ip,
          geo: req.geo,
          ua: userAgent(req),
          user: req.ip && crypto.createHash("md5").update(req.ip).digest("hex"),
        });
        if (!exist) {
          await redis.hsetnx(`${hostname}:pages`, pathname || "root", {
            url: `${hostname}${pathname || ""}`,
            timestamp: Date.now(),
          });
        }
        const member: Rating = {
          user: req.ip && crypto.createHash("md5").update(req.ip).digest("hex"),
          geo: req.geo,
          ua: userAgent(req),
          // TODO: FIXME: update prop - For possible future extension, keep it generic
          rating: validate.data.rating, // FIXME: instead of `rating`, call it `data`
          timestamp: Date.now(),
        };
        console.log({ member });
        await redis.zadd(`${hostname}:ratings:${pathname || "root"}`, {
          score: Date.now(),
          member,
        });
        return new Response(JSON.stringify({ ok: "OK" }), { status: 200 });
      }
      default: {
        // return res.status(405).end(`Method ${req.method} Not Allowed.`);
        return new Response(`Method ${req.method} Not Allowed`, {
          status: 405,
        });
      }
    }
  } catch (error) {
    // return res.status(500).json({ error });
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
