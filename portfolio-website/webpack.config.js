const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: './', // Use relative paths (important for GitHub Pages)
    assetModuleFilename: 'assets/[name].[hash:8][ext]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // Images smaller than 10KB will be inlined as data URLs
            maxSize: 10 * 1024 
          }
        },
        generator: {
          filename: 'images/[name].[hash:8][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      scriptLoading: 'defer'
    })
  ],
  // Add performance hints configuration to avoid warnings
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    maxAssetSize: 1024 * 1024, // Increase to 1MB
    maxEntrypointSize: 1024 * 1024 // Increase to 1MB
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true
  }
};