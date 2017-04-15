module.exports = {
    entry: './index.js',
    output: {
        filename: 'ireactivity.js',
        path: `${__dirname}/dist`,
        libraryTarget: 'umd'
    },
    externals: {
        'react': 'React',
        'prop-types': 'PropTypes'
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};