import React, { useEffect } from "react";
import { useVote } from "@use-vote/next";
import ThumbsDownIcon from "../../icons/ThumbsDownIcon";
import ThumbsUpIcon from "../../icons/ThumbsUpIcon";

const Thumbs = () => {
  const { status, vote } = useVote({});
  const isCompleted = status === "completed";

  const text = isCompleted
    ? "Thank you for the feedback!"
    : "Is this page useful?";

  return (
    <div className="not-prose flex flex-wrap justify-between items-center gap-2 lg:gap-3">
      <p className="md:text-lg font-semibold">{text}</p>
      {!isCompleted && (
        <div className="flex gap-1">
          <button
            onClick={() => vote("👍")}
            className="transition active:rotate-[-12deg] p-2 border border-transparent hover:border-gray-400 rounded-full text-gray-600 hover:text-gray-800"
          >
            <ThumbsUpIcon />
          </button>
          <button
            onClick={() => vote("👎")}
            className="transition active:rotate-[-12deg] p-2 border border-transparent hover:border-gray-400 rounded-full text-gray-600 hover:text-gray-800"
          >
            <ThumbsDownIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Thumbs;
