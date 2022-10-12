import * as React from "react";

type VoteStatus = "waiting" | "loading" | "completed";
interface UseVoteInterface {
  apiPath?: string;
}

const useVote = ({ apiPath = `/api/vote` }: UseVoteInterface) => {
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
    // FIXME: set correct type!
    const data = (await response.json()) as any; // TODO: what to do?
    return data;
  };
  return {
    status,
    vote,
  };
};

export default useVote;
