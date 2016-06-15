var webpack = require('webpack');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var production = JSON.parse(process.env.NODE_ENV || 'false');
var devTools = production ? 'source-map' : 'cheap-inline-module-source-map';

module.exports = {
    entry: {
        main: ['webpack-dev-server/client?http://0.0.0.0:8080/', 'webpack/hot/only-dev-server', './js/main'],
        react: ['react']
    },
    devtool: devTools,
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
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff" 
            },
            { 
                test: /\.(ttf|eot|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader")
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
            {
                test: /\.jsx$/,
                loaders: ['react-hot', 'babel-loader'],
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

    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hot: true
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            filename: 'js/react.js'
        }),
        new ExtractTextPlugin('style/style.min.css', { allChunks: true }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
        new webpack.HotModuleReplacementPlugin()
        /*new HtmlWebpackPlugin({
            title: 'Events',
            filename: '../backend/index.html',
            template: './backend/template.html'
        })*/
    ]
}

    