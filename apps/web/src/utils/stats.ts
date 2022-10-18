import { getTimeIntervals } from "./interval";
import { Rating } from "./types";

// consider "👍", "👎" as default rating within "7d" interval
// TODO: make the interval selectable

const sortDataByRating = (data: Rating[]) => {
  return data.reduce<Record<string, number>>((prev, curr) => {
    const key = curr.rating;
    prev[key] = (prev[key] || 0) + 1;
    return prev;
  }, {});
};

export type ProcessDataType = ReturnType<typeof processData>;

export const processData = ({ data }: { data: Rating[] }) => {
  const { startTimestamp, endTimestamp, timeIntervals } =
    getTimeIntervals("7d");

  const intervalData = timeIntervals.map((interval) => {
    const filterData = data.filter(
      (d) => d.timestamp > interval.start && d.timestamp < interval.end
    );
    return {
      ...interval,
      count: filterData.length,
      rawData: filterData,
      // rateData is where we reduce the array to sorted by rating
      rateData: sortDataByRating(filterData),
    };
  });

  const accIntervalData = intervalData.map((interval, index) => {
    const acc = intervalData.slice(0, index + 1).reduce(
      (prev, curr) => {
        prev.count = curr.count += prev.count;
        prev.rawData = [...prev.rawData, ...curr.rawData];
        prev.rateData = sortDataByRating(prev.rawData);
        return prev;
      },
      {
        count: 0,
        rawData: [] as Rating[],
        rateData: {} as Record<string, number>,
      }
    );
    return {
      ...interval,
      ...acc,
    };
  });

  const totalData = {
    // DISCUSS: add rawData here instead of return prop
    count: data.length,
    rateData: sortDataByRating(data),
  };

  return {
    rawData: data,
    intervalData,
    accIntervalData,
    totalData,
    startTimestamp,
    endTimestamp,
    // TODO: refactor: with baseData!
  };
};

export type ProcessData = ReturnType<typeof processData>;
