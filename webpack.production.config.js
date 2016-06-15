var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        main: './js/main',
        react: ['react']
    },
    devtool: 'source-map',
    output: {
        path: '\\\\10.1.21.16\\c$\\WebSoft\\WebTutorServer\\wt\\web\\react\\homecredit\\build',
        publicPath: '/build/',
        filename: 'js/bundle.js',
        library: '[name]'   
    },
    resolve: {
        root: [
            path.resolve(__dirname, 'js'),
        ],
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        preLoaders: [
            {
                test: /(\.js$)|(\.jsx$)/,
                loaders: ['eslint'],
                include: [
                  path.resolve(__dirname, "js"),
                ],
            }
        ],
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'js/components')
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: path.join(__dirname, 'js'),
                exclude: path.join(__dirname, 'js/components')
            }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            filename: 'js/react.js'
        }),
        new webpack.optimize.UglifyJsPlugin({ mangle: false })
    ]
}

    