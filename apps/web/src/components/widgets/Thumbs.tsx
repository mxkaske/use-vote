import React from "react";
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
    <div className="not-prose flex flex-wrap justify-between items-center space-x-3">
      <p className="text-lg font-semibold">{text}</p>
      {!isCompleted && (
        <div className="flex space-x-1">
          <button
            onClick={() => vote("👍")}
            className="p-2 rounded-full text-gray-800 hover:bg-gray-50 hover:text-gray-900"
          >
            <ThumbsUpIcon />
          </button>
          <button
            onClick={() => vote("👎")}
            className="p-2 rounded-full text-gray-800 hover:bg-gray-50 hover:text-gray-900"
          >
            <ThumbsDownIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Thumbs;
