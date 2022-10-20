import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  // TODO: create different entries, like below
  // entry: {
  //   claps: "./components/claps/claps.tsx",
  //   api: "./components/claps/api.ts",
  //   style: "./components/claps/style.tsx",
  // },
  format: ["cjs", "esm"],
  clean: true,
  bundle: true,
  dts: true,
  external: ["next", "react"],
  tsconfig: "tsconfig.base.json",
  // TODO: add watch: with env
});
