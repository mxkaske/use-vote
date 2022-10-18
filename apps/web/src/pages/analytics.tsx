import React from "react";
import Layout from "../components/common/Layout";
import dynamic from "next/dynamic";
import useStats from "../hooks/useStats";
import { Disclosure, Transition } from "@headlessui/react";
import { Interval } from "src/utils/types";
import cn from "classnames";
import { default as ColorHash } from "color-hash";

var customHash = function (str: string) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
var colorHash = new ColorHash({ hash: customHash });

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
      <div className="space-y-6">
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
        <ul>
          {/* TODO: create some sort of skeleton here */}
          {data ? (
            data?.map((value) => {
              const percentage = value.totalData.count / maxValue;
              const { count: intervalTotal, rateData } =
                value.accIntervalData[value.accIntervalData.length - 1];
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
                                  opacity: `${
                                    1 - i / Object.keys(rateData).length
                                  }`,
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
                    <div className="flex gap-4 items-center">
                      {/* FIXME: reason because it jumps: the key either changes, or automatically gets unmounted as no accIntervalData has been found */}
                      {value.accIntervalData.length > 0 &&
                        Object.entries(
                          value.accIntervalData[
                            value.accIntervalData.length - 1
                          ].rateData
                        ).map(([key, value], i) => {
                          return (
                            <div key={key} className="flex items-center gap-2">
                              <div
                                style={{
                                  backgroundColor: colorHash.hex(key),
                                  opacity: `${
                                    1 - i / Object.keys(rateData).length
                                  }`,
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
