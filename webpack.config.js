const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: 'ts-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            // {
            //     test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
            //     loader: 'file-loader',
            //     options: {
            //         outputPath: 'assets/img',
            //         name: '[name].[ext]',
            //     },
            // },
            {
                test: /\.(png|jpg|svg|gif|webp)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/img',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts' }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets',
                },
            ],
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
