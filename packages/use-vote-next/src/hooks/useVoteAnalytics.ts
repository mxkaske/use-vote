import React from "react";
import { ProcessData, ProcessDataType } from "../utils/stats";
import { Interval, Page, RequestReturnType } from "../types";

// TODO: validate returned data with zod

const apiPath = `/api/vote`;

const useVoteAnalytics = ({ interval = "7d" }: { interval?: Interval }) => {
  const [state, setState] = React.useState<undefined | "loading" | "empty">(); // TODO: refactor with swr?
  const [data, setData] = React.useState<RequestReturnType[] | undefined>();

  const getData = React.useCallback(async () => {
    setState("loading");
    try {
      const { hostname } = window.location;
      const response = await fetch(
        `${apiPath}?hostname=${hostname}&interval=${interval}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        setData(undefined); // not sure if needed
        // FIXME: BAD PATTERN!
        setTimeout(() => {
          setState("empty");
        }, 1000);
        return;
      }
      const data = (await response.json()) as RequestReturnType[];
      setData(data);
      setState(undefined);
    } catch (err) {
      console.error(err);
      setState(undefined);
    }
  }, [interval]);

  React.useEffect(() => {
    getData();
  }, [interval, getData]);

  return { data, state };
};

export default useVoteAnalytics;
