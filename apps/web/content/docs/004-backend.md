---
title: "<Backend />"
date: "2022-10-10"
---

## Lorem Ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in ornare leo. Nulla blandit convallis felis vel gravida. Proin non nunc ut turpis molestie malesuada sit amet et odio. Praesent nec consectetur nisl, at tempor dolor. Donec quis lorem sed purus rhoncus pulvinar at id lectus. Sed bibendum aliquet semper. Duis consequat ornare ex, eget feugiat arcu. Quisque consectetur massa quis nunc vestibulum, ut facilisis magna bibendum. Morbi in lobortis velit. Aliquam ac suscipit enim. Sed quis sodales tellus, ac fringilla lorem. Nulla eros lectus, consequat vitae nisi vitae, pretium faucibus quam. Sed commodo mi at turpis mollis, at posuere lectus vulputate. Nunc dictum massa in dui elementum cursus.

```ts
// pages/vote/analytics
import { Backend } from "@mxkaske/use-vote";

const config = {
  colors: { "👍": "green", "👎": "red" },
};

export default <Backend {...config} />;
```

If `colors` is not defined, the `color-hash` package will generate a random color for a vote.
