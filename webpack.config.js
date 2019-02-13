const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/FE/index.jsx',
    resolve: {
        modules: [
            'src/FE/components',
            'node_modules',
        ],
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            minimize: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:7]',
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/FE/index.html',
            filename: './index.html',
        }),
    ],
};
