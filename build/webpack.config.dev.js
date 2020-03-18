const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");

const getEntryDir = () => {
  const dir = fs.readdirSync(path.resolve(__dirname, "../client/"));

  let entry = {};
  let webpackPlugins = [];

  dir.forEach(item => {
    entry = {
      ...entry,
      [item]: path.resolve(__dirname, `../client/${item}/index.jsx`)
    };
    webpackPlugins.push(
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "../views/template.html"),
        filename: path.resolve(__dirname, `../views/${item}.html`),
        chunks: [item, 'vendor']
      })
    );
  });

  return { entry, webpackPlugins };
};

const config = getEntryDir();

module.exports = {
  mode: "development",
  entry: config.entry,
  output: {
    path: path.resolve(__dirname, "../public/javascripts/"),
    filename: "[name].[hash:8].bundle.js",
    chunkFilename: "[name].[chunkhash:8].js",
    publicPath: "/javascripts/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            [
              "@babel/plugin-transform-runtime",
              {
                corejs: 3
              }
            ]
          ]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        loader: ["style-loader", "css-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240, //
              esModule: false
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {},
  devtool: "cheap-source-map",
  plugins: [new CleanWebpackPlugin(), ...config.webpackPlugins],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
};
