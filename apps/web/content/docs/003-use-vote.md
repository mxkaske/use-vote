---
title: "useVote()"
date: "2022-10-10"
---

> It is a headless way to include a Component. Check out the [/examples](/examples/thumbs) for concrete implementations.

We do not provide any predefined UI within the package. Instead, use `useVote` to access the properties and trigger a button event according to the users vote.

```tsx
useVote({
  apiPath: "/api/vote",
});
```

### Props

`apiPath`: Path where your API have configured the vote api. By default, it is `"/api/vote"`.

<!-- TODO: check out https://react-hook-form.com/api/useform for inspiration -->

### Return

`vote(rating: string)`: Function that requires a string. It will automatically use the `window.location` to pass the `hostname`, `pathname` and the `rating` to the API handler as query parameters.
