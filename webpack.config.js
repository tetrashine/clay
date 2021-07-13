const path = require('path');

common = {
  mode: 'development',
  devtool: 'source-map',
};

modulesByRules = {
  rules: [
    {
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: "babel-loader"
    }
  ]
};

module.exports = [{
  target: 'web',
  entry: './index.js',
  resolve: {
    modules:[
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, "src")
    ]
  },
  output: {
    filename: 'clay.js',
    library: 'clay',
  },
  module: modulesByRules,
}];