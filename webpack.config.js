const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/index.js',
    about: './src/about/about.js',
    analytics: './src/analyticks/analyticks.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'

  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      },
      
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./fonts/[name].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: [
            (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
            'css-loader',
            'postcss-loader'
        ]
      }
    ],
  },
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
        }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/main.html',
      filename: 'main.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/about.html',
      filename: 'about.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/analyticks.html',
      filename: 'analytics.html',
    }),

    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
