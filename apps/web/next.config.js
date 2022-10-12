const withTM = require("next-transpile-modules")(["@use-vote/next"]);
const cl = require("next-contentlayer");

const nextConfig = { reactStrictMode: true };

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [cl.withContentlayer, withTM];
  return plugins.reduce((acc, plugin) => plugin(acc), {
    ...defaultConfig,
    ...nextConfig,
  });
};
