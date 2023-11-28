import { merge } from "webpack-merge"
import config from './webpack.config.js'

const output = {
  filename: 'js/[name].js',
}

const module = {
  rules: [
    {
      test: /\.(c|sa|sc)ss$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'resolve-url-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|webp|gif|svg)$/i,
      type: 'asset/resource',
    },
  ],
}

const devConfig = {
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  output,
  module,
  devServer: {
    port: 3000,
    hot: true,
  },
}

export default merge(config, devConfig)