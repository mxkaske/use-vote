const withTM = require("next-transpile-modules")(["@use-vote/next"]);
const withPlugins = require("next-compose-plugins");
const cl = require("next-contentlayer");

const nextConfig = { reactStrictMode: true };

module.exports = withPlugins([withTM, cl.withContentlayer({})], nextConfig);
