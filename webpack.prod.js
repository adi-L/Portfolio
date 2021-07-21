const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
    return merge(common(env, argv), {
        output: {
            path: `${__dirname}/dist/prod`,
        },
        mode: 'production',
        cache: true,
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                cache: true,
            })],
        },
        devtool: false,
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
              }),
            new MiniCssExtractPlugin(),
            new webpack.SourceMapDevToolPlugin({
                filename: '[name].js.map',
                exclude: ['vendor.js']
            }),
            new WorkboxPlugin.GenerateSW({
                // these options encourage the ServiceWorkers to get in there fast
                // and not allow any straggling "old" SWs to hang around
                clientsClaim: true,
                skipWaiting: true,
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-react",
                                    {
                                        "pragma": "dom"
                                    }
                                ],
                                [
                                    "@babel/preset-env",
                                    {
                                        "useBuiltIns": "entry",
                                        "corejs": "3.6.5"
                                    }
                                ]

                            ],
                            plugins: [
                                "@babel/plugin-transform-runtime",
                                [
                                    "babel-plugin-jsx-pragmatic",
                                    {
                                        "import": "dom",
                                        "module": __dirname + "/jsx-render/client/dom.js"
                                    }
                                ],
                                "transform-minify-booleans",
                                "babel-plugin-transform-remove-undefined",
                                "transform-remove-debugger",
                                "minify-mangle-names",
                                "transform-undefined-to-void",
                                "minify-constant-folding",
                                "transform-remove-console",
                                "@babel/plugin-proposal-class-properties",
                                ["minify-dead-code-elimination", {
                                    "optimizeRawSize": true
                                }]
                            ]
                        },
                    },
                },
            ]
        }
    });
}