module.exports = {
  entry: './index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/dist/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js','.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts|.tsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}

