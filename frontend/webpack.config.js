const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        https: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    plugins: [
        new webpack.DefinePlugin({
          __VUE_OPTIONS_API__: JSON.stringify(true), // or false
          __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true) // Add this line
        }),
      ],
};