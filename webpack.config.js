const path = require('path');

module.exports = {
    entry: './src/game.js',
    mode: 'development',
    devServer: {
        contentBase: './bundle'
    },
    output: {
        fileName: "bundle.js",
        path: path.resolve(__dirname,'bundle')
    },
    resolve: {
        alias: {
            image: path.resolve(__dirname,'src/image')
        }
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '/images'
                    }
                }
            }
        ]
    }
}