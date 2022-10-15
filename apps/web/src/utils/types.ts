import { NextRequest, userAgent } from "next/server";
import parser from "ua-parser-js";

export type Rating = {
  user: NextRequest["ip"];
  timestamp: number;
  ua: ReturnType<typeof parser>;
  rating: string;
};

export type Page = {
  url: string;
  timestamp: number;
};
