module.exports = {
    entry: './index.js',
    output: {
        filename: 'es5.js',
        path: `${__dirname}`,
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