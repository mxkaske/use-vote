import React from "react";

const apiPath = `/api/vote`;

type VoteStatus = "waiting" | "loading" | "completed";

const useVote = () => {
  const [status, setStatus] = React.useState<VoteStatus>("waiting");
  const vote = async (rating: string) => {
    setStatus("loading");
    const { hostname, pathname } = window.location;
    const response = await fetch(
      `${apiPath}?pathname=${pathname}&hostname=${hostname}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      }
    );
    setStatus("completed");
    if (!response.ok) return;
    const data = await response.json(); // TODO: what to do?
    return data;
  };
  return {
    status,
    vote,
  };
};

export default useVote;
