import React from "react";
import { ProcessData, ProcessDataType } from "src/utils/stats";
import { Page, RequestReturnType } from "../utils/types";

// TODO: validate returned data with zod

type Data = Page & { data: ProcessData };

const apiPath = `/api/vote`;

const useStats = () => {
  // FIXME: change to [stats, setStats]
  const [data, setData] = React.useState<RequestReturnType[]>();
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
      const data = (await response.json()) as RequestReturnType[];
      setData(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return [data];
};

export default useStats;
