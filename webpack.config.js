const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:"production",
  entry: {
    main: './src/js/indexPage.js',
    login: './src/js/login.js',
    signup:'./src/js/signup.js',
    swRegister:'./swRegister.js',
    sw:'./sw.bundle.js'
  }, 
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      chunks: ['main','swRegister']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './login.html',
      chunks: ['login','swRegister']
    }),
    new HtmlWebpackPlugin({
      filename: 'signup.html',
      template: './signup.html',
      chunks: ['signup','swRegister']
    }),
  ],

};