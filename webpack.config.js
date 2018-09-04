const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/app.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/
      }
    ]
  }
};
