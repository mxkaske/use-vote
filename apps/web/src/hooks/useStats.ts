import React from "react";
import { ProcessData, ProcessDataType } from "src/utils/stats";
import { Interval, Page, RequestReturnType } from "../utils/types";

// TODO: validate returned data with zod

type Data = Page & { data: ProcessData };

const apiPath = `/api/vote`;

const useStats = ({ interval = "7d" }: { interval?: Interval }) => {
  // FIXME: change to [stats, setStats]
  const [state, setState] = React.useState<
    undefined | "loading" | "success" | "error"
  >();
  const [data, setData] = React.useState<RequestReturnType[]>();
  React.useEffect(() => {
    getData();
    // FIXME: how often will it be triggered?
  }, [interval]);

  const getData = async () => {
    setState("loading");
    try {
      const { hostname } = window.location;
      const response = await fetch(
        `${apiPath}?hostname=${hostname}&interval=${interval}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) return;
      const data = (await response.json()) as RequestReturnType[];
      setData(data);
      console.log(data);
      // setState("success");
    } catch (err) {
      console.error(err);
      // setState("error");
    } finally {
      // FIXME: setTimeout with unsubscribe
      setTimeout(() => {
        setState(undefined);
      }, 500);
    }
  };

  return { data, state };
};

export default useStats;
