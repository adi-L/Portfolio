const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  return merge(common(env, argv), {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true,
    devServer: {
      contentBase: __dirname + "./dist",
      hot: true,
      host: "localhost",
      inline: true,
      liveReload: true,
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      })
    ],
    module: {
      rules: [

        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", {
                  "targets": "> 0.25%, not dead"
                }],
                [
                "@babel/preset-react",
                {
                  "pragma": "dom"
                }
                ]
              ],
              plugins: [
                "@babel/plugin-transform-runtime",
                [
                  "babel-plugin-jsx-pragmatic",
                  {
                    "import": "dom",
                    // "module": "jsx-render"
                    "module": __dirname + "/jsx-render/client/dom.js"
                  }
                ],
                ["@babel/plugin-proposal-class-properties", { loose: false }],

              ],
            },
          },
        },
      ]
    }
  })
};

