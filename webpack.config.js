var webpack = require('webpack');
var here = require('path-here');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var _ = require('lodash');

var context = process.env.NODE_ENV || 'development';

function getDevConfig() {
    var devConfig = 
    {
        context: here('app'),
        entry: './index.js',
        output: {
            path: here('app'),
            filename: 'bundle.js',
            devtoolModuleFilenameTemplate        : '[absolute-resource-path]',
            devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
        },
        devtool: 'source-map',
        module: {
            loaders: _.union(
                getJavaScriptLoaders(),
                [
                    {
                        test: /\.html$/,
                        loader: 'raw',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.css$/,
                        loader: 'style!css',
                        exclude: /node_modules/
                    }
                ]
            )
        },
        devServer: {
            contentBase: here('app'),
            colors: true,
            progress: true,
            inline: true
        }
    }

    return devConfig;
};

function getJavaScriptLoaders() {
   // if (context.indexOf('test') === -1) {
        return [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ];
    /*} else {
        return [
            {
                test: /\.test\.js$|\.mock\.js$/, // include only mock and test files
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.js$/,
                loader: 'isparta',
                exclude: /node_modules|\.test.js$|\.mock\.js$/ // exclude node_modules and test files
            }
        ];
    }*/
}

function getTestConfig() {
    var testConfig =  _.merge({}, getDevConfig(), {
        entry: './index.test.js'
    });

    return testConfig;
};

function getProdConfig() {
    var prodConfig = _.merge({}, getDevConfig(), {
    output: {
      path: here('dist'),
      filename: 'bundle.js'
    }
  });

  prodConfig.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([
        {
            context: here('app'),
            from: './index.html',
            to:   here('dist')
        }
    ])
  ];

  return prodConfig;
};

var configs = {
    development: getDevConfig,
    production: getProdConfig,
    test: getTestConfig,
}

module.exports = configs[context]();