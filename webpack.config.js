'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');

const ENV = process.env.NODE_ENV;
const IS_PRODUCTION = ENV === 'production';

const baseConfig = {
  entry: {
    main: path.resolve('frontend/js/main.js'),
  },
  output: {
    path: path.resolve('public'),
    filename: 'js/[name].js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PRODUCTION: JSON.stringify(IS_PRODUCTION),
      },
    }),
    new UglifyJSPlugin(),
    new CopyWebpackPlugin([
      {from: './frontend/index.html', to: './index.html'},
      {from: './frontend/fonts', to: './fonts'},
      {from: './frontend/js/jquery.jplayer.min.js', to: './js/jquery.jplayer.min.js'},
      {from: './frontend/js/jquery-3.2.1.min.js', to: './js/jquery-3.2.1.min.js'},
      {from: './frontend/js/bootstrap.min.js', to: './js/bootstrap.min.js'},
      {from: './frontend/images', to: './images'},
      {from: './frontend/video', to: './video'},
      {from: './frontend/css', to: './css'},
      {from: './frontend/sass', to: './sass'},
    ]),
  ],
};

const devConfig = _.extend({}, baseConfig, {});

const prodConfig = _.extend({}, baseConfig, {});
module.exports = IS_PRODUCTION ? prodConfig : devConfig;
