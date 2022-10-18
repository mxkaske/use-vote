import React from "react";
import Layout from "../components/common/Layout";
import dynamic from "next/dynamic";
import useStats from "../hooks/useStats";
import { Disclosure } from "@headlessui/react";

const Chart = dynamic(() => import("../components/charts/StackedAreaChart"), {
  ssr: false,
});

// TODO: check about if the page should be styled with tailwindcss or not

const Analytics = () => {
  const [data] = useStats();
  const [timeframe, setTimeframe] = React.useState<"7d" | "30d">("7d");
  const maxValue =
    data?.reduce((prev, curr) => {
      return prev > curr.totalData.count ? prev : curr.totalData.count;
    }, 0) || 0;

  return (
    <Layout>
      <h1 className="text-3xl font-extrabold mb-6">Analytics</h1>
      <ul className="flex gap-3">
        {(["7d", "30d"] as const).map((key) => {
          return (
            <button
              key={key}
              onClick={() => setTimeframe(key)}
              className="px-4 py-1 rounded-full bg-gray-200"
            >
              {key}
            </button>
          );
        })}
      </ul>
      <ul>
        {data?.map((value) => {
          return (
            <Disclosure as="li" key={value.baseData.url}>
              <Disclosure.Button className="block w-full my-2">
                <div className="relative flex items-center justify-between px-2 py-1">
                  <code>{value.baseData.url}</code>
                  <p>{value.totalData.count}</p>
                  <div
                    style={{
                      width: `${Math.round(
                        (value.totalData.count / maxValue) * 100
                      )}%`,
                    }}
                    className={`absolute h-full bg-gray-100 z-[-1] -my-1 -mx-2 rounded-md`}
                  />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="text-gray-500">
                <div className="p-2">
                  <div>
                    {value.accIntervalData.length > 0 &&
                      Object.entries(
                        value.accIntervalData[value.accIntervalData.length - 1]
                          .rateData
                      ).map(([key, value]) => {
                        return (
                          <div key={key} className="">
                            <p>
                              {key}: <span className="font-bold">{value}</span>
                            </p>
                          </div>
                        );
                      })}
                  </div>
                  <Chart data={value.accIntervalData} />
                </div>
              </Disclosure.Panel>
            </Disclosure>
          );
        })}
        {/* {data &&
          Object.entries(data).map(([key, value]) => {
            return (
              <div key={key} className="-mx-2">
                <div className="border p-2 rounded">
                  <div className="flex justify-between items-center">
                    <h2>{value.url}</h2>
                    <p>
                      total:{" "}
                      <span className="font-bold">
                        {value.data.totalData.count}
                      </span>
                    </p>
                  </div>
                  <div>
                    {value.data.accIntervalData.length > 0 &&
                      Object.entries(
                        value.data.accIntervalData[
                          value.data.accIntervalData.length - 1
                        ].rateData
                      ).map(([key, value]) => {
                        return (
                          <div key={key} className="">
                            <p>
                              {key}: <span className="font-bold">{value}</span>
                            </p>
                          </div>
                        );
                      })}
                  </div>
                  <Chart data={value.data.accIntervalData} />
                </div>
              </div>
            );
          })} */}
      </ul>
    </Layout>
  );
};

export default Analytics;
