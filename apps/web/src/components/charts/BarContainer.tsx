import React from "react";
import cn from "classnames";
import { colorHash } from "src/utils/color";

interface Props {
  colors: Record<string, string>;
  url?: string;
  total: number;
  width: string;
  open: boolean;
  rateData: any; // FIXME: any
}

const BarContainer = ({ url, total, width, open, rateData, colors }: Props) => {
  return (
    <div className="group relative flex items-center justify-between px-2 py-1">
      <code>{url}</code>
      {/* UI: The total amount could move out of the bar */}
      <p className="font-bold">{total}</p>
      <div className="absolute w-full h-full bg-gray-50 z-[-1] -my-1 -mx-2 rounded-md" />
      <div
        style={{ width }}
        className={cn(
          "transition-[width] duration-1000 absolute h-full z-[-1] -my-1 -mx-2 rounded-md",
          open ? "bg-gray-300" : "bg-gray-200 group-hover:bg-gray-300"
        )}
      />
      <div
        style={{
          width: open ? width : 0,
        }}
        className="transition-[width] duration-1000 absolute w-full h-full z-[-1] -my-1 -mx-2 rounded-md overflow-hidden flex"
      >
        {Object.entries(rateData)
          .sort((a, b) => (a[0] > b[0] ? -1 : 1))
          .map(([key, entry], i) => {
            const percentage = (entry as number) / total;
            return (
              <div
                key={key}
                style={{
                  width: `${percentage * 100}%`,
                  backgroundColor: colors[key] || colorHash.hex(key),
                }}
                className="transition-[width] duration-1000 h-full"
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default BarContainer;
