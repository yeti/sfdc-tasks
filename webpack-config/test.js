const PATHS = require('./paths');

module.exports = (conf) => ({
  externals: {
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /.(js|jsx)$/,
        include: [ PATHS.src ],
        loader: 'istanbul-instrumenter-loader',
        exclude: /(node_modules|\.spec\.(js|jsx)$)/,
        enforce: 'post'
      }
    ]
  }
})
