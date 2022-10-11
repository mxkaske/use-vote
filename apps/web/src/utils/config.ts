export const systems = {
  thumbs: {
    rating: {
      "-1": "👎",
      1: "👍",
    },
  },
  stars: {
    rating: {
      1: "⭐️",
      2: "⭐️⭐️",
      3: "⭐️⭐️⭐️",
      4: "⭐️⭐️⭐️⭐️",
      5: "⭐️⭐️⭐️⭐️⭐️",
    },
  },
  emojis: {
    rating: {
      "-1": "🙁",
      0: "😐",
      1: "🙂",
    },
  },
} as const;

// FIXME: add `satisfies Type` instead of `as const`
