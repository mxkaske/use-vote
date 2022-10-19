import React from "react";
import Layout from "../components/common/Layout";
import dynamic from "next/dynamic";
import useStats from "../hooks/useStats";
import { Disclosure, Transition } from "@headlessui/react";
import { Interval } from "src/utils/types";
import cn from "classnames";
import { default as ColorHash } from "color-hash";
import crypto from "crypto";

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

const Chart = dynamic(() => import("../components/charts/StackedAreaChart"), {
  ssr: false,
});

// TODO: check about if the page should be styled with tailwindcss or not

const Analytics = () => {
  const [interval, setInterval] = React.useState<Interval>("7d");
  const { state, data } = useStats({ interval });
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
    <Layout>
      <h1 className="text-3xl font-extrabold mb-6">Analytics</h1>
      <div className="space-y-8">
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
        <ul>
          {/* TODO: create some sort of skeleton here */}
          {/* TODO: include an EmptyState if data.length === 0 */}
          {data ? (
            data?.map((value) => {
              const percentage = value.totalData.count / maxValue;
              const {
                count: intervalTotal,
                rateData,
                rawData,
              } = value.accIntervalData[value.accIntervalData.length - 1];
              const intervalPercentage = intervalTotal / maxIntervalValue;
              return (
                <Disclosure as="li" key={value.baseData.url}>
                  <Disclosure.Button
                    className="block w-full my-2"
                    disabled={intervalTotal === 0}
                  >
                    {({ open }) => (
                      <div className="group relative flex items-center justify-between px-2 py-1">
                        <code>{value.baseData.url}</code>
                        {/* The total amount could move out of the bar */}
                        <p>{intervalTotal}</p>
                        <div className="absolute w-full h-full bg-gray-50 z-[-1] -my-1 -mx-2 rounded-md" />
                        <div
                          style={{ width: `${intervalPercentage * 100}%` }}
                          className={cn(
                            "transition-[width] duration-1000 absolute h-full z-[-1] -my-1 -mx-2 rounded-md",
                            open
                              ? "bg-gray-300"
                              : "bg-gray-200 group-hover:bg-gray-300"
                          )}
                        />
                        <div
                          style={{
                            width: open ? `${intervalPercentage * 100}%` : 0,
                          }}
                          className="transition-[width] duration-1000 absolute w-full h-full z-[-1] -my-1 -mx-2 rounded-md overflow-hidden flex"
                        >
                          {Object.entries(rateData).map(([key, entry], i) => {
                            const percentage = entry / intervalTotal;
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
                    )}
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-gray-500">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex gap-4 items-center">
                        {/* FIXME: reason because it jumps: the key either changes, or automatically gets unmounted as no accIntervalData has been found */}
                        {Object.entries(rateData).map(([key, value], i) => {
                          return (
                            <div key={key} className="flex items-center gap-2">
                              <div
                                style={{
                                  backgroundColor: colorHash.hex(key),
                                }}
                                className="h-4 w-4 rounded-full"
                              />
                              <p>
                                {key}:{" "}
                                <span className="font-bold">{value}</span>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      {rawData.length > 0 && (
                        <div className="text-right">
                          <p className="font-light text-sm">last created</p>
                          <p className="font-medium text-sm">
                            {new Date(
                              rawData[rawData.length - 1].timestamp
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* <Chart data={value.accIntervalData} interval={interval} /> */}
                  </Disclosure.Panel>
                </Disclosure>
              );
            })
          ) : (
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-8 animate-pulse bg-gray-200 rounded-md" />
              <div className="w-full h-8 animate-pulse bg-gray-200 rounded-md" />
              <div className="w-full h-8 animate-pulse bg-gray-200 rounded-md" />
            </div>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default Analytics;
