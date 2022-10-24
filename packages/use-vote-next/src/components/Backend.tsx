import * as React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import useVoteAnalytics from "../hooks/useVoteAnalytics";
import { strToColor } from "../utils/color";
import cn from "classnames";
import { formatDistance } from "date-fns";
import { Interval } from "../types";

const config = {
  colors: {
    "👍": "#6366f1",
    "👎": "#f43f5e",
    "⭐️": "#ef4444",
    "⭐️⭐️": "#f97316",
    "⭐️⭐️⭐️": "#eab308",
    "⭐️⭐️⭐️⭐️": "#84cc16",
    "⭐️⭐️⭐️⭐️⭐️": "#22c55e",
  },
}; // satisfies { colors: Colors }

const Backend = () => {
  const [interval, setInterval] = React.useState<Interval>("7d");
  const { data, state } = useVoteAnalytics({ interval });

  const maxValue =
    data?.reduce((prev, curr) => {
      return prev > curr.totalData.count ? prev : curr.totalData.count;
    }, 0) || 0;

  const maxIntervalValue =
    data?.reduce((prev, curr) => {
      const c = curr.accIntervalData[curr.accIntervalData.length - 1].count;
      return prev > c ? prev : c;
    }, 0) || 0;

  return (
    <div>
      <h1 className="font-extrabold text-4xl">Analytics</h1>
      <div className="grid gap-4">
        <div className="space-y-3">
          <p className="font-bold">Interval</p>
          <ul className="flex gap-3">
            {(["1h", "24h", "7d", "30d"] as const).map((key) => {
              const active = key === interval;
              return (
                <button
                  key={key}
                  onClick={() => setInterval(key)}
                  className={cn(
                    "px-4 py-0.5 rounded-full",
                    active ? "bg-gray-400" : "bg-gray-200 hover:bg-gray-300"
                  )}
                >
                  {key}
                </button>
              );
            })}
          </ul>
        </div>
        {data?.map((value) => {
          // const percentage = value.totalData.count / maxValue;
          const {
            count: intervalTotal,
            rateData,
            rawData,
          } = value.accIntervalData[value.accIntervalData.length - 1];
          const intervalPercentage = intervalTotal / maxIntervalValue;
          const disabled = rawData.length === 0;
          return (
            <Collapsible.Root key={value.baseData.url} disabled={disabled}>
              <Collapsible.Trigger className="group w-full">
                <div className="relative flex items-center justify-between px-2 py-1">
                  <code className="z-10">{value.baseData.url}</code>
                  {/* UI: The total amount could move out of the bar */}
                  <p className="font-bold z-10">{intervalTotal}</p>
                  <div className="absolute w-full h-full bg-gray-50 z-[-1] -my-1 -mx-2 rounded-md" />
                  <div
                    style={{ width: `${intervalPercentage * 100}%` }}
                    className={cn(
                      "transition-[width] duration-500 absolute h-full z-[-1] -my-1 -mx-2 rounded-md",
                      "group-data-[state=open]:bg-gray-300",
                      "group-data-[state=closed]:bg-gray-200 group-data-[state-closed]:group-hover:bg-gray-300"
                    )}
                  />
                  <div
                    style={{
                      width: `${intervalPercentage * 100}%`,
                    }}
                    className="absolute h-full -my-1 -mx-2 rounded-md overflow-hidden"
                  >
                    <div
                      className={cn(
                        "transition-[width] duration-500 h-full flex",
                        `group-data-[state=closed]:w-0 group-data-[state=open]:w-[100%]`
                      )}
                    >
                      {rateData?.map(({ key, value }) => {
                        const percentage = value / intervalTotal;
                        const color =
                          config.colors[
                            key as keyof typeof config.colors // FIXME: cheating here - but no ts error
                          ];
                        // lastData
                        return (
                          <div
                            key={key}
                            style={{
                              width: `${percentage * 100}%`,
                              backgroundColor: color || strToColor(key),
                            }}
                            className="relative transition-[width] duration-500 h-full"
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Collapsible.Trigger>
              <Collapsible.Content className="data-[state=open]:animate-collabsible-open data-[state=closed]:animate-collabsible-close overflow-hidden">
                <div className="flex items-center justify-between gap-4 mt-2">
                  <div>
                    {/* FIXME: Data visible even if rateData has no data */}
                    <p className="font-bold text-xl">Data</p>
                    <div className="flex gap-4 items-center">
                      {/* FIXME: reason because it jumps: the key either changes, or automatically gets unmounted as no accIntervalData has been found */}
                      {rateData?.map(({ key, value }, i) => {
                        const color =
                          config.colors[key as keyof typeof config.colors];
                        return (
                          <div key={key} className="flex items-center gap-2">
                            <div
                              style={{
                                backgroundColor: color || strToColor(key),
                              }}
                              className="h-4 w-4 rounded-full"
                            />
                            <p>
                              {key}: <span className="font-bold">{value}</span>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {rawData.length > 0 && (
                    <div className="text-right">
                      <p className="font-light text-sm">last created</p>
                      <p className="font-medium text-sm">
                        {formatDistance(
                          new Date(rawData[rawData.length - 1].timestamp), // get last data
                          new Date(),
                          { addSuffix: true }
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          );
        })}
      </div>
    </div>
  );
};

export default Backend;
