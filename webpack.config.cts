import {resolve as _resolve} from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import Dotenv from 'dotenv-webpack';

export default (env: { mode: any; }) => {
    const isDev = env.mode === 'development';

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                auto: true,
                localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
            }
        }
    }

    return {
        mode: env.mode ?? "development",
        entry: './src/index.tsx',
        module: {
            rules: [
                {
                    test: /\.css?$/i,
                    use: [MiniCssExtractPlugin.loader, cssLoaderWithModules],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new Dotenv(),
            new HtmlWebpackPlugin({
                template: _resolve(__dirname, 'public', './index.html'),
            }),
            new MiniCssExtractPlugin(),
        ],
        output: {
            filename: '[name].[contenthash].js',
            path: _resolve(__dirname, 'dist'),
            clean: true,
        },
        devtool: isDev ? 'inline-source-map' : false,
        devServer: {
            port: 8080,
            historyApiFallback: true,
            hot: true,
            open: true
        },
    }
};
