const webpack = require('webpack');

module.exports = {
    entry: {
        app: './client/js/index.js',
    },
    output: {
        path: './dist',
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
        sourceMapFilename: '[file].map',
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        modulesDirectories: ['node_modules', 'client'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || ''),
            },
        }),
    ],
};
