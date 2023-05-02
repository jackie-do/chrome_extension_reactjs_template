const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: './.env.production' });
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const env = dotenv.parsed;

module.exports = merge(
  {
    ...common,
    plugins: [
      ...common.plugins,
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
  },
  {
    mode: 'production',
  },
);
