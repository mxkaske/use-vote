const withTM = require("next-transpile-modules")(["@evalu8/next"]);
const withPlugins = require("next-compose-plugins");
const cl = require("next-contentlayer");

const nextConfig = { reactStrictMode: true };

module.exports = withPlugins([withTM, cl.withContentlayer({})], nextConfig);
