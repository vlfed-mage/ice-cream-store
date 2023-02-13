const { isDev } = require("../helpers/env");

module.exports.loader = {
    test: /\.jsx$/,
    exclude: /[\\/]node_modules[\\/]/,
    use: [
        {
            loader: 'babel-loader',
            options: isDev ? {} : { cacheDirectory: true }
        }
    ]
};