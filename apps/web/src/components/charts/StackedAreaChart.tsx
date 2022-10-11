import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Rating } from "src/utils/types";
import { getTimeIntervals, intervalData } from "../../utils/interval";

// IDEA: compose to types of charts in one (https://recharts.org/en-US/examples/LineBarAreaComposedChart)
// 1. StackedAreaChart -> accumulated daily ratings
// 2. StackedBarChart -> daily ratings

const toPercent = (decimal: number, fixed = 0) =>
  `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;
  return toPercent(ratio, 2);
};

// TODO: extract into separate type
interface Props {
  data: {
    count: number;
    rawData: Rating[];
    rateData: Record<string, number>;
    start: number;
    end: number;
  }[];
}

const StackedAreaChart = ({ data }: Props) => {
  const { format } = intervalData["7d"];
  const mappedData = data.map((d) => {
    return {
      name: format(d.start),
      // TODO: how to default to 0
      "👍": d.rateData?.["👍"] || 0,
      "👎": d.rateData?.["👎"] || 0,
    };
  });
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      width={500}
      height={200}
      data={mappedData}
      stackOffset="expand" // makes it to percentage!
    >
      <CartesianGrid vertical={false} />
      <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: "#6b7280" }} />
      {/* (v) => ... avoids the second parameter `index` to be set */}
      <YAxis
        tickFormatter={(v) => toPercent(v)}
        tickLine={false}
        axisLine={false}
      />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="👎"
        stackId="1"
        stroke="#f43f5e"
        fill="#f43f5e"
      />
      <Area
        type="monotone"
        dataKey="👍"
        stackId="1"
        stroke="#22c55e"
        fill="#22c55e"
      />
    </AreaChart>
    // </ResponsiveContainer>
  );
};

export default StackedAreaChart;
