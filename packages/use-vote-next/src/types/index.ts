import parser from "ua-parser-js";
import { ProcessDataType } from "../utils/stats";

export type Rating = {
  user: string;
  timestamp: number;
  ua: ReturnType<typeof parser>;
  rating: string;
};

export type Page = {
  url: string;
  timestamp: number;
};

export type Interval = "1h" | "24h" | "7d" | "30d";

export type RequestReturnType = ProcessDataType & {
  baseData: Page;
};
