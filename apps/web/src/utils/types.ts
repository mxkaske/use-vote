import { NextRequest, userAgent } from "next/server";

export type Rating = {
  user: NextRequest["ip"];
  geo: NextRequest["geo"];
  timestamp: number;
  ua: ReturnType<typeof userAgent>;
  rating: string;
};

export type Page = {
  url: string;
  timestamp: number;
};
