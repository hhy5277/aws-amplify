var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        'aws-amplify': './src/index.ts',
        'aws-amplify.min': './src/index.ts'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        library: 'aws-amplify',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    plugins: [
        new UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            include: /\.min\.js$/,
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'report.html'
        })
    ],
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
                query: {
                    declaration: false
                }
             },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            //{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                presets: ['react', 'es2015', 'stage-2'],
                }
            }
        ]
    }
};
