import path from 'path';
import { fileURLToPath } from 'url';
import Dotenv from 'dotenv-webpack';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { BundleAnalyzerPlugin: WebpackBundleAnalyzerPlugin } = BundleAnalyzerPlugin;

export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  const plugins = [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    isProduction && new WebpackBundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  ].filter(Boolean);

  return {
    entry: { main: './src/index.js' },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/",
      filename: "[name].[contenthash].js",
      chunkFilename: "[name].[contenthash].chunk.js",
      clean: true,
    },
    devServer: {
      static: path.join(__dirname, "public/"),
      port: 3000,
      historyApiFallback: true,
    },
    plugins: plugins,
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\/]node_modules[\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
};
