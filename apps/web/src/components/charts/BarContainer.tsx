import React from "react";
import cn from "classnames";
import { default as ColorHash } from "color-hash";
import crypto from "crypto";

// - [ ] twitter post
var customHash = function (str: string) {
  const strHash = crypto.createHash("sha512").update(str).digest("hex");
  let hash = 0;
  for (let i = 0; i < strHash.length; i++) {
    const chr = strHash.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  console.log(hash);
  return Math.abs(hash);
};

const colorHash = new ColorHash({ hash: customHash });

interface Props {
  url?: string;
  total: number;
  width: number; // deduced by intervalPercentag
  open: boolean;
  rateData: any; // FIXME: any
}

const BarContainer = ({ url, total, width, open, rateData }: Props) => {
  const sortedData = rateData;
  return (
    <div className="group relative flex items-center justify-between px-2 py-1">
      <code>{url}</code>
      {/* The total amount could move out of the bar */}
      <p>{total}</p>
      <div className="absolute w-full h-full bg-gray-50 z-[-1] -my-1 -mx-2 rounded-md" />
      <div
        style={{ width }}
        className={cn(
          "transition-[width] duration-1000 absolute h-full z-[-1] -my-1 -mx-2 rounded-md",
          open ? "bg-gray-300" : "bg-gray-200 group-hover:bg-gray-300"
        )}
      />
      {/* TODO: extract into another separate Component BarDynamicContent */}
      <div
        style={{
          width: open ? width : 0,
        }}
        className="transition-[width] duration-1000 absolute w-full h-full z-[-1] -my-1 -mx-2 rounded-md overflow-hidden flex"
      >
        {Object.entries(rateData).map(([key, entry], i) => {
          const percentage = (entry as number) / total;
          return (
            <div
              key={key}
              style={{
                width: `${percentage * 100}%`,
                backgroundColor: colorHash.hex(key),
              }}
              className="h-full"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default BarContainer;
