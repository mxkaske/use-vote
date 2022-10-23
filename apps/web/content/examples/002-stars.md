---
title: "Stars"
date: "2022-10-10"
---

> Component can be seen on the [homepage]("/").

```ts
// /components/Stars.tsx
import React from "react";
import { useVote } from "@use-vote/next";
import StarIcon from "src/icons/StarIcon";
import StarSolidIcon from "src/icons/StarSolidIcon";
import cn from "classnames";

const starsArray = [...new Array(5).fill("⭐️")];

const Stars = () => {
  const [index, setIndex] = React.useState(-1);
  const { status, vote } = useVote({});
  const isCompleted = status === "completed";

  const text = isCompleted
    ? "Thank you for the feedback!"
    : "Rate the package.";

  return (
    <div className="flex flex-wrap justify-between items-center gap-2 lg:gap-3">
      <p className="md:text-lg font-semibold">{text}</p>
      {!isCompleted && (
        <div className="flex">
          {starsArray.map((star, idx) => {
            const solid = idx <= index;
            const rate = starsArray.slice(0, idx + 1).join("");
            return (
              <button
                key={idx}
                onClick={() => vote(rate)}
                onMouseEnter={() => setIndex(idx)}
                onMouseLeave={() => setIndex(-1)}
                className={cn(
                  "transition active:rotate-[72deg] p-2 rounded-full text-gray-600",
                  solid && "text-yellow-500"
                )}
              >
                {solid ? <StarSolidIcon /> : <StarIcon />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Stars;
```
