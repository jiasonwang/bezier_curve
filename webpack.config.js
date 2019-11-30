const path = require('path');

module.exports = {
    stats: "verbose",
    mode:"development",
    entry: {
        quadratic: './src/quadratic.ts',
        beziercurve:'./src/beziercurve.ts'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename前面我们可以使用一个变量[name],这个就表示获取entry里面的key作为文件名加在前面
        filename: '[name].js'
    }
};