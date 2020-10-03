const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'bundle.js': './src/index.js',
    'games/bingo37/js/bundle.js': './src/bingo37.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]'
  },
  module: {
   rules: [
   {
     test: /\.m?js$/,
     exclude: /(node_modules|bower_components)/,
     use: {
       loader: 'babel-loader'
    }
  }
  ]
}
};