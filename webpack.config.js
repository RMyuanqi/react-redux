
module.exports = {

    mode: 'development',

    entry: {
        'redux-single': './src/redux/redux-single.js',
        'middle-ware': './src/redux/middle-ware.js',
        'react-redux-simple': './src/react-redux/react-redux-simple.js',
        'react-redux-custom': './src/react-redux/react-redux-custom.js',
        'useState': './src/react-redux/useState.js',
        'compose': './src/redux/compose.js'
    },

    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/react'],
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
};
