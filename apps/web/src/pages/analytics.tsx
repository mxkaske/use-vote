import React from "react";
import Layout from "../components/common/Layout";
import dynamic from "next/dynamic";
import useStats from "../hooks/useStats";
import { Disclosure } from "@headlessui/react";
import { Interval } from "src/utils/types";
import cn from "classnames";

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
          {data?.map((value) => {
            const percentage = value.totalData.count / maxValue;
            const intervalTotal =
              value.accIntervalData[value.accIntervalData.length - 1].count;
            const intervalPercentage = intervalTotal / maxIntervalValue;

            console.log({
              percentage,
              maxValue,
              maxIntervalValue,
              intervalTotal,
              intervalPercentage,
            });
            return (
              <Disclosure as="li" key={value.baseData.url}>
                <Disclosure.Button className="block w-full my-2">
                  {({ open }) => (
                    <div className="group relative flex items-center justify-between px-2 py-1">
                      <code>{value.baseData.url}</code>
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
                    </div>
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  <div className="p-2">
                    <div>
                      {value.accIntervalData.length > 0 &&
                        Object.entries(
                          value.accIntervalData[
                            value.accIntervalData.length - 1
                          ].rateData
                        ).map(([key, value]) => {
                          return (
                            <div key={key} className="">
                              <p>
                                {key}:{" "}
                                <span className="font-bold">{value}</span>
                              </p>
                            </div>
                          );
                        })}
                    </div>
                    <Chart data={value.accIntervalData} interval={interval} />
                  </div>
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
