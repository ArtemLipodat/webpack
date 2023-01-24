const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackSimpleIncludePlugin = require('html-webpack-simple-include-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');


module.exports = {

  mode: 'development',

  devServer: {
    port: 9000,
  },

  entry : {
    main : './src/index.js'
  },

  output : {
    filename : 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'src/index.html')
    }),
    new HtmlWebpackSimpleIncludePlugin([
      {
        tag: '<include-header />',
        content: fs.readFileSync(path.resolve(__dirname, "src/header.html"))
      },
      {
        tag: '<include-footer />',
        content: fs.readFileSync(path.resolve(__dirname, "src/footer.html"))
      }
    ]),
    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
              loader: 'style-loader'
          },
          {
              loader: 'css-loader',
              options: {
                  sourceMap: true
              }
          },
          {
              loader: 'postcss-loader',
              options: {
                  sourceMap: true
              }
          },
          {
              loader: 'sass-loader',
              options: {
                  sourceMap: true
              }
          }
        ],
      },
    ],
  },

}