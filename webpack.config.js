import path from 'path'
import { fileURLToPath } from 'url';
import glob from 'glob'

import HtmlWebpackPlugin from 'html-webpack-plugin'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'docs'),
  assets: path.join(__dirname, 'src', 'assets'),
}

const output = {
  path: PATHS.dist,
  clean: true,
  assetModuleFilename: 'assets/[name][ext]',
}

const plugins = [
  ...glob.sync('./src/*.html').map((htmlFile) => {
    return new HtmlWebpackPlugin({
      template: path.join(PATHS.src, path.basename(htmlFile)),
      inject: 'body',
      filename: path.basename(htmlFile),
      favicon: path.join(PATHS.src, 'assets', 'favicon.svg')
    })
  }),
]

const module = {
  rules: [
    {
      test: /\.html$/i,
      loader: 'html-loader',
    },
    {
      test: /\.woff2?$/i,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[name][ext]',
      },
    },
    {
      test: /\.m?js$/i,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
  ],
}

const config = {
  entry: {
    index: path.join(PATHS.src, 'scripts', 'index.js'),
  },
  output,
  plugins,
  module,
}

export default config