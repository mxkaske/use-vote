---
title: "Thumbs"
date: "2022-10-10"
---

## Thumbs

> How to recreate the `<Thumbs />` Component that is used on that site. Copy and paste.

```tsx
import React from "react";
import { useVote } from "@evalu8/next";

const Thumbs = () => {
  const { status, vote } = useVote({});
  const isCompleted = status === "completed";

  const text = isCompleted
    ? "Thank you for the feedback!"
    : "Is this page useful?";

  return (
    <div className="flex flex-wrap justify-between items-center space-x-3">
      <p className="text-lg font-semibold">{text}</p>
      {!isCompleted && (
        <div className="flex space-x-1">
          <button
            onClick={() => vote("👍")}
            className="p-2 rounded-full text-gray-800 hover:bg-gray-50 hover:text-gray-900"
          >
            👍
          </button>
          <button
            onClick={() => vote("👎")}
            className="p-2 rounded-full text-gray-800 hover:bg-gray-50 hover:text-gray-900"
          >
            👎
          </button>
        </div>
      )}
    </div>
  );
};

export default Thumbs;
```
