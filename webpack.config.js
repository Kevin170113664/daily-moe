const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/app.js',
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
