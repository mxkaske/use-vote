import { getTimeIntervals } from "./interval";
import { Rating, Interval } from "../types";

// FIXME: REMINDER - THIS IS NOT THE CORRECT FILE

// consider "👍", "👎" as default rating within "7d" interval
// TODO: make the interval selectable

const sortDataByRating = (data: Rating[]) => {
  return data.reduce<{ key: string; value: number }[]>((prev, curr) => {
    const index = prev.findIndex((item) => item.key === curr.rating);
    // prev[key] = (prev[key] || 0) + 1;
    if (index !== -1) {
      prev[index].value += 1;
    } else {
      prev.push({ key: curr.rating, value: 1 });
    }
    return prev.sort((a, b) => (a.key > b.key ? -1 : 1));
  }, []);
};

export type ProcessDataType = ReturnType<typeof processData>;

export const processData = ({
  data,
  interval = "7d",
}: {
  data: Rating[];
  interval: Interval;
}) => {
  const { startTimestamp, endTimestamp, timeIntervals } =
    getTimeIntervals(interval);

  const intervalData = timeIntervals.map((interval) => {
    const filterData = data.filter(
      (d) => d.timestamp > interval.start && d.timestamp < interval.end
    );
    return {
      ...interval,
      count: filterData.length, // FIXME: this number is wrong! - not sure how
      // and if shallow/deep copy is necessary
      rawData: filterData,
      // rateData is where we reduce the array to sorted by rating
      rateData: sortDataByRating(filterData),
    };
  });

  const intervalDataCopy = [...intervalData];

  const accIntervalData = intervalDataCopy.map(
    // remove count as it will be included in ...acc
    ({ count, ...interval }, index) => {
      const acc = intervalDataCopy.slice(0, index + 1).reduce(
        (prev, curr) => {
          const rawData = [...prev.rawData, ...curr.rawData];
          prev.count = rawData.length;
          prev.rawData = rawData;
          prev.rateData = sortDataByRating(prev.rawData);
          return prev;
        },
        {
          count: 0,
          rawData: [] as Rating[],
          rateData: [] as { key: string; value: number }[], // FIXME: move into type
        }
      );
      return {
        ...interval,
        ...acc,
      };
    }
  );

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
