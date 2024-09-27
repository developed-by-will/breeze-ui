module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'raw-loader',
        exclude: /node_modules/
      }
    ]
  }
};
