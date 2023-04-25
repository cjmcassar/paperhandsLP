const webpack = require("webpack");
const isProduction = process.env.NODE_ENV === "production";
const hideSourceMaps = process.env.NEXT_PUBLIC_HIDE_SOURCE_MAPS === "true";

module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  },
  target: "serverless",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { icon: true }
        }
      ]
    });

    if (isProduction && hideSourceMaps) {
      if (!isServer) {
        config.devtool = false; // Disable sourcemaps on client-side
      }

      config.plugins.push(
        new webpack.SourceMapDevToolPlugin({
          filename: "hidden-source-maps/[file].map",
          noSources: true,
          test: /\.(js|css|map)($|\?)/i
        })
      );
    }
    return config;
  }
};
