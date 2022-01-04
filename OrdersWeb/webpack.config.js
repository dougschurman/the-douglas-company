const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Package = require("./package.json");
const path = require("path");

module.exports = (env, argv) => {
  

  return {
    output: {
      hashFunction: "xxhash64",
      pathinfo: false,
      path: `${__dirname}/../OrdersAPI/wwwroot`,
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
            {
              loader: "ts-loader",
              options: { transpileOnly: true },
            },
          ],
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: "pre",
          include: path.resolve(__dirname, "src"),
          test: /\.js$/,
          loader: "source-map-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        baseUrl: argv.mode === "development" ? "/" : "/orders/",
        environment: argv.mode === "development" ? "development" : "production",
        template: "index.ejs",
        version: "1.0.0",
      }),
      // new CopyPlugin({
      //   patterns: [{ from: "assets" }],
      // }),
    ],
    entry: {
      main: "./src/index.tsx",
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
  };
};
