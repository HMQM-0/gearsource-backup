const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WebappWebpackPlugin = require("webapp-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

if (!process.env.API_URI) {
  throw new Error("Environment variable API_URI not set");
}

const STATIC_URL = process.env.STATIC_URL || "/";

// For production our main Sentry DSN is used
// Otherwise developer should explicitly set SENTRY_DSN env var.
const SENTRY_DSN =
  process.env.NODE_ENV === "production"
    ? "https://10b29f35b26b4911a3fa5ff7f6703faf@o647492.ingest.sentry.io/5759703"
    : (process.env.SENTRY_DSN || "");
const SENTRY_ENV = process.env.SENTRY_ENV || "local";

// Social Links
const FACEBOOK_LINK = process.env.FACEBOOK_LINK
const INSTAGRAM_LINK = process.env.INSTAGRAM_LINK
const YOUTUBE_LINK = process.env.YOUTUBE_LINK
const TIKTOK_LINK = process.env.TIKTOK_LINK
const TWITTER_LINK = process.env.TWITTER_LINK

module.exports = ({ sourceDir, distDir }) => ({
  // devtool: "source-map",
  entry: {
    app: `${sourceDir}/index.tsx`,
  },
  module: {
    rules: [
      {
        exclude: [ /node_modules/, /test.tsx/ ],
        loader: "ts-loader",
        options: {
          experimentalWatchApi: true,
          transpileOnly: true,
        },
        test: /\.tsx?$/,
      },
      {
        exclude: [ /node_modules/, /test.tsx/ ],
        loader: "babel-loader",
        options: {
          configFile: "./babel.config.js",
        },
        test: /\.(jsx?|tsx?)$/,
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
              publicPath: "/fonts/",
            },
          },
        ],
      },
      {
        test: /\.txt/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "/images/",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              gifsicle: {
                enabled: false,
              },
              mozjpeg: {
                progressive: true,
                quality: 85,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
  // node: {
  //   fs: "empty",
  //   module: "empty",
  // },
  node: false,
  output: {
    path: distDir,
    publicPath: STATIC_URL,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: distDir,
    }),
    new HtmlWebpackPlugin({
      API_URI: process.env.API_URI,
      filename: `${distDir}/index.html`,
      template: `${sourceDir}/index.html`,
    }),
    new ForkTsCheckerWebpackPlugin(),
    // new ForkTsCheckerWebpackPlugin({
    //   eslint: {
    //     files: 'src/**/*.@(tsx|ts|jsx|js)'
    //   },
    //   // exclude: "node_modules",
    // }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    // PWA plugins
    new FaviconsWebpackPlugin({
        logo: `${sourceDir}/images/favicon.png`,
        prefix: "images/favicons/",
        favicons: {
          appName: "Nautical",
          appDescription: "Storefront for the Nautical Marketplace platform",
          display: "standalone",
          developerURL: null, // prevent retrieving from the nearest package.json
          background: "#ddd",
          theme_color: "#333",
        },
    }),
    new webpack.EnvironmentPlugin({
      API_URI: "http://localhost:8000/graphql/",
      APP_VERSION: "development",
      DEMO_MODE: false,
      GTM_ID: "",
      SENTRY_APM: "0",
      SENTRY_DSN: SENTRY_DSN,
      SENTRY_ENV: SENTRY_ENV,
      SOCIAL_LINKS: {
        FACEBOOK: FACEBOOK_LINK,
        INSTAGRAM: INSTAGRAM_LINK,
        YOUTUBE: YOUTUBE_LINK,
        TIKTOK: TIKTOK_LINK,
        TWITTER: TWITTER_LINK,
      },
    }),
  ],
  resolve: {
    alias: {
      // Explicitely set react's path here because npm-link doesn't do well
      // when it comes to peer dependencies, and we need to somehow develop
      // @nautical/sdk package
      react: path.resolve("./node_modules/react"),
      "react-dom": "@hot-loader/react-dom",
    },
    extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
  },
});
