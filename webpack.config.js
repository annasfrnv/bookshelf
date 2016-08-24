module.exports = {
    entry: "./blocks/app/app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                  test: /\.css$/,
                  loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            { test: /\.jade$/, loader: "jade" }
        ]
    }
};