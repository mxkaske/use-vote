---
title: "Getting Started a bit longer than expected"
date: "2022-10-10"
---

> This npm packages supports `next` and **is not** a pure `react` package.

We have an npm package that allows you to add your own voting system on your website.

To use it, first install the package:

```bash
$ npm install @mxkaske/use-vote
```

Once installed, there are 4 steps to follow:

1. Create a new upstash project
2. Add `.env` variables
3. Create an `api` route to retrieve the data
4. Use the headless `useVote` hook.

## 1. Create a new upstash project

If you don’t already have an [upstash](https://upstash.com) account, create one first. They have a generous free plan to start with. Create a new Redis database and fill out the asked inputs.

![upstash-create-project.png](/assets/upstash-create-project.png)

## 2. Add `.env` variables

You can easily copy and paste the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` into your `.env.local` file to start with.

![upstash-api-keys.png](/assets/upstash-api-keys.png)

```bash
// .env.local
UPSTASH_REDIS_REST_URL=<YOUR_URL>
UPSTASH_REDIS_REST_TOKEN=<YOUR_TOKEN>
```

> Do not expose your environment variables on GitHub.

## 3. Create an `api` route to retrieve the data

By default, `useVote` will use the `/api/vote` pathname to send new votings. We encourage you to keep the folder path to not have to pass manually the new path:

```tsx
// pages/api/vote.ts
import { createVoteAPI } from "@mxkaske/use-vote";

const createVoteAPI()

export default createVoteAPI()
```

## 4. Use the headless `useVote` hook.

You can now transmit your vote to the `/api/vote` on click via the `vote()` function. Read more at [/docs/use-vote](/docs/use-vote).

```tsx
import { useVote } from "@mxkaske/use-vote";
import React from "react";

const VoteButton = ({ label, icon }: { label: string; icon: string }) => {
  const { vote } = useVote({});
  return <Button onClick={() => vote(icon)}>{label}</Button>;
};
```

You are already collecting data.

---

Check our examples [thumbs](/examples/thumbs) or [stars](/examples/stars).
