import React from "react";
import Layout from "../components/common/Layout";
import dynamic from "next/dynamic";
import useStats from "../hooks/useStats";
import Link from "next/link";

const Chart = dynamic(() => import("../components/charts/StackedAreaChart"), {
  ssr: false,
});

// TODO: check about if the page should be styled with tailwindcss or not

const Analytics = () => {
  const [data] = useStats();
  let maxValue = 0;
  console.log(data);
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      const amount = value.data.totalData.count;
      maxValue = amount > maxValue ? amount : maxValue;
    });
  }
  const count = data
    ? Object.entries(data).reduce((curr, [key, value]) => {
        return curr + value.data.totalData.count;
      }, 0)
    : undefined;
  console.log(count);
  return (
    <Layout>
      <h1 className="text-3xl font-extrabold mb-6">Analytics</h1>
      <div className="grid gap-8 grid-cols-1">
        {data &&
          count &&
          Object.entries(data).map(([key, value]) => {
            return (
              <div key={key}>
                <div className="relative flex items-center justify-between px-2 py-1">
                  <a href={key} target="_blank" rel="noreferrer">
                    <code>{key}</code>
                  </a>
                  <p>{value.data.totalData.count}</p>
                  <div
                    style={{
                      width: `${Math.round(
                        (value.data.totalData.count / maxValue) * 100
                      )}%`,
                    }}
                    className={`absolute h-full bg-gray-100 z-[-1] -my-1 -mx-2 rounded-md`}
                  />
                </div>
              </div>
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
      </div>
    </Layout>
  );
};

export default Analytics;
