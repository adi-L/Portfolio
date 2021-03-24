const path = require("path");
const pkg = require('./package.json');


module.exports = (env, argv) => {

  
  return {
    entry: `${__dirname}/index.js`,
    output: {
      filename: `${pkg.name}.js`,
      library: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),//TODO use function
      globalObject: '(typeof self !== \'undefined\' ? self : this)', // TODO Hack (for Webpack 4+) to enable create UMD build which can be required by Node without throwing error for window being undefined (https://github.com/webpack/webpack/issues/6522)
      umdNamedDefine: true,
      libraryTarget:  'umd',
    },
    plugins: [
    ],
  
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: [
                ["@babel/plugin-proposal-class-properties", { loose: true }],
              ],
            },
          },
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                limit: 8192,
                publicPath: (path) =>
                  env.DEBUG && env.DEBUG !== "false"
                    ? "static/assets/images/" + path
                    : `static/assets/images/` + path,
                    outputPath: "static/assets/images",
              },
            },
          ],
        },
        {
          test: /\.(css|scss)$/i,
          use: [ {
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' },
          },
          'css-loader'],
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
          options:{
            minimize:true
          }
        },
      ],
    },
  };
};
