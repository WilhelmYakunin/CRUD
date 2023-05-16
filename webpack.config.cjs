// @ts-nocheck

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const entry = (mode === 'none') ? './src/multi.ts' : './src/index.ts';

module.exports = {
  mode,
  target: "node",
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  entry: entry,
  output: {
    path: path.resolve('./dist'),
    filename: 'server.cjs',
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 4040,
    host: '0.0.0.0',
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CRUD API Generator',
      template: './src/view/index.html',
    }), 
    new NodemonPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
};
