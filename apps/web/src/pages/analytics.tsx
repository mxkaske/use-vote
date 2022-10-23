import React from "react";
import Layout from "../components/common/Layout";
import useStats from "../hooks/useStats";
import { Disclosure } from "@headlessui/react";
import { Interval } from "src/utils/types";
import cn from "classnames";
// FIXME: deployment failed
// import { Backend } from "@use-vote/next";
import BarContainer from "src/components/charts/BarContainer";
import DataContainer from "src/components/charts/DataContainer";

// TODO: check about if the page should be styled with tailwindcss or not

type Colors = Record<string, string>;

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
};

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
      {/* <Backend /> */}
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
          {state === "empty" && (
            <div>
              {/* FIXME: can be tested @ 127.0.0.1:3000 */}
              <p>
                Empty State. Check out{" "}
                <a href="use-fdbk.vercel.app" target="_blank" rel="noopener">
                  use-fdbk.vercel.app
                </a>{" "}
                for help.
              </p>
            </div>
          )}
          {/* Loading Skeleton */}
          {!data && state === "loading" && (
            <div className="w-full flex flex-col gap-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-8 animate-pulse bg-gray-200 rounded-md"
                />
              ))}
            </div>
          )}
          {data?.map((value) => {
            // const percentage = value.totalData.count / maxValue;
            const {
              count: intervalTotal,
              rateData,
              rawData,
            } = value.accIntervalData[value.accIntervalData.length - 1];
            const intervalPercentage = intervalTotal / maxIntervalValue;
            return (
              <Disclosure as="li" key={value.baseData.url}>
                <Disclosure.Button
                  className="block w-full my-3 rounded-md"
                  disabled={intervalTotal === 0}
                >
                  {({ open }) => (
                    <BarContainer
                      colors={config.colors}
                      url={value.baseData.url}
                      total={intervalTotal}
                      width={`${intervalPercentage * 100}%`}
                      open={open}
                      rateData={rateData}
                    />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel>
                  {Object.keys(rateData).length > 0 && (
                    <DataContainer
                      colors={config.colors}
                      rawData={rawData}
                      rateData={rateData}
                    />
                  )}
                </Disclosure.Panel>
              </Disclosure>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Analytics;
