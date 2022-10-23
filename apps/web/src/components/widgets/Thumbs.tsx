import React from "react";
import { useVote } from "@use-vote/next";
import ThumbsDownIcon from "../../icons/ThumbsDownIcon";
import ThumbsUpIcon from "../../icons/ThumbsUpIcon";
import ThumbsUpSolidIcon from "src/icons/ThumbsUpSolidIcon";
import ThumbsDownSolidIcon from "src/icons/ThumbsDownSolidIcon";

// FIMXE: hovering fast over thumbs sometimes misses the leave event
// and stays SolidIcon after it left the Icon (and is then gray)

const Thumbs = () => {
  const [index, setIndex] = React.useState(-1);
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
            onMouseEnter={() => setIndex(0)}
            onMouseLeave={() => setIndex(-1)}
            // REMINDER: `transition-transform` vs `transition` (including color transition)
            className="transition-transform active:rotate-[-12deg] p-2 rounded-full text-gray-600 hover:text-green-500"
          >
            {index === 0 ? <ThumbsUpSolidIcon /> : <ThumbsUpIcon />}
          </button>
          <button
            onClick={() => vote("👎")}
            onMouseEnter={() => setIndex(1)}
            onMouseLeave={() => setIndex(-1)}
            className="transition transform active:rotate-[-12deg] p-2 rounded-full text-gray-600 hover:text-red-500"
          >
            {index === 1 ? <ThumbsDownSolidIcon /> : <ThumbsDownIcon />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Thumbs;
