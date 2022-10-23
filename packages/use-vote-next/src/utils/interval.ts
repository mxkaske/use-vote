export const intervalData = {
  "1h": {
    milliseconds: 3600000,
    intervals: 60,
    coefficient: 60000,
    format: (e: number) =>
      new Date(e).toLocaleTimeString("en-us", {
        hour: "numeric",
        minute: "numeric",
      }),
  },
  "24h": {
    milliseconds: 86400000,
    intervals: 24,
    coefficient: 3600000,
    format: (e: number) =>
      new Date(e)
        .toLocaleDateString("en-us", {
          month: "short",
          day: "numeric",
          hour: "numeric",
        })
        .replace(",", " "),
  },
  "7d": {
    milliseconds: 604800000,
    intervals: 7,
    coefficient: 86400000,
    format: (e: number) =>
      new Date(e).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
      }),
  },
  "30d": {
    milliseconds: 2592000000,
    intervals: 30,
    coefficient: 86400000,
    format: (e: number) =>
      new Date(e).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
      }),
  },
} as const;

export const getTimeIntervals = (interval: keyof typeof intervalData) => {
  const { milliseconds, intervals, coefficient } = intervalData[interval];
  const endTimestamp = Math.ceil(Date.now() / coefficient) * coefficient;
  const startTimestamp = endTimestamp - milliseconds;
  const timeIntervals = Array.from({ length: intervals }, (_, i) => ({
    start: startTimestamp + i * coefficient,
    end: startTimestamp + (i + 1) * coefficient,
  }));
  return { startTimestamp, endTimestamp, timeIntervals };
};
