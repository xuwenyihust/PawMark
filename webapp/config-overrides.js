module.exports = function override(config, env) {
  config.resolve.fallback = {
      ...config.resolve.fallback,
      "path": require.resolve("path-browserify"), // Or false if you choose not to polyfill
      "crypto": false, // Or false if you choose not to polyfill
      "querystring": require.resolve("querystring-es3"),
      "stream": false,
      "buffer": require.resolve("buffer/"),
  };
  return config;
};
