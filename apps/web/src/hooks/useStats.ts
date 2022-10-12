import React from "react";
import { ProcessData } from "src/utils/stats";
import { Page } from "../utils/types";

type Data = Page & { data: ProcessData };

const apiPath = `/api/vote`;

const useStats = () => {
  // FIXME: change to [stats, setStats]
  const [data, setData] = React.useState<Record<string, Data>>();
  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { hostname } = window.location;
      const response = await fetch(`${apiPath}?hostname=${hostname}`, {
        method: "GET",
      });
      if (!response.ok) return;
      const data = (await response.json()) as Record<string, Data>;
      setData(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  return [data];
};

export default useStats;
