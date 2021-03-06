var path = require("path");
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    main:  "./app/frontend/application.jsx",
  },
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "application_bundle.js",
    publicPath: "/js/",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  resolve: {
    extensions: ["", ".jsx", ".cjsx", ".coffee", ".js"]
  },
  module: {
    loaders: [
      { test: /\.cjsx$/, loaders: ["coffee", "cjsx"]},
      { test: /\.jsx$/, loaders: ["jsx-loader"]},
      { test: /\.coffee$/,   loader: "coffee-loader"}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react/addons',
      'Marty': 'marty',
    })
  ]
}
