import { NextRequest, userAgent } from "next/server";
import parser from "ua-parser-js";
import { ProcessDataType } from "./stats";

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

export type RequestReturnType = ProcessDataType & {
  baseData: Page;
};
