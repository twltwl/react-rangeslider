'use strict'

var path = require('path')
var webpack = require('webpack')
var ExtractPlugin = require('extract-text-webpack-plugin')
var HtmlPlugin = require('html-webpack-plugin')
var __DEV__ = process.env.NODE_ENV === 'development'
var config = {
  devtool: '#cheap-eval-source-map',

  entry: __DEV__ ? [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'index')
  ] : path.resolve(__dirname, 'index'),

  output: {
    path: __DEV__ ? __dirname : 'deploy',
    publicPath: __DEV__ ? '/static/' : '',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.less'],
    alias: {
      'react-rangeslider$': path.join(__dirname, '..', 'src')
    }
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname),
          path.resolve(__dirname, '../src')
        ],
        loader: 'babel'
      }
    ]
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}

if (__DEV__) {
  config.module.loaders.push({
    test: /\.less$/,
    exclude: /node_modules/,
    loader: 'style!css!less'
  })
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else {
  config.module.loaders.push([
    {
      test: /\.less$/,
      exclude: /node_modules/,
      loader: ExtractPlugin.extract('style-loader', 'css-loader!less-loader')
    }
  ])
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractPlugin('bundle.css'),
    new HtmlPlugin({
      appMountId: 'mount',
      title: 'React RangeSlider',
      template: 'example/template/app.ejs'
    })
  )
}

module.exports = config
