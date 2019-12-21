const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ( {
  entry: {
    home: './src/js/home/index.js',
    hakaton: './src/js/hakaton/index.js',
    tech: './src/js/tech/index.js',
    prijava: './src/js/prijava/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  module:{
      rules: [
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader'             
          }
        },
        { 
            test: /\.js$/,
            exclude: /node_modules/, 
            loader: "babel-loader" 
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
              // fallback to style-loader in development
              argv.mode !== 'production' ? 'style-loader': MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
                   {
                     loader: "file-loader",
      
                     options: {
                       outputPath: 'images',
                       esModule: false
                     }
                   }
                 ]
          },
          {
            test: /\.(woff|woff2|ttf|otf|eot)$/,
            use: [
                   {
                     loader: "file-loader",
                     options: {
                       outputPath: 'fonts'
                     }
                   }
                 ]
          }
          
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'FON HAKATON',
          filename: 'index.html',
          template: 'src/pages/index.html',
          chunks: ['home']
        }), 
        new HtmlWebpackPlugin({
          title: 'FON HAKATON',
          filename: 'hakaton.html',
          template: 'src/pages/hakaton.html',
          chunks: ['hakaton']
        }),
        new HtmlWebpackPlugin({
          title: 'TECH CHALLANGE',
          filename: 'tech.html',
          template: 'src/pages/tech.html',
          chunks: ['tech']
        }),new HtmlWebpackPlugin({
          title: 'Prijava',
          filename: 'prijava.html',
          template: 'src/pages/prijava.html',
          chunks: ['tech']
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        })
    ] 
});