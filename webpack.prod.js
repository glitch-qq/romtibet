import { merge } from 'webpack-merge'
import config from './webpack.config.js'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import postcss from 'postcss-preset-env'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import ImageminWebpWebpackPlugin from 'imagemin-webp-webpack-plugin'

const output = {
	filename: 'js/[name].[contenthash].js',
}

const plugins = [
	new MiniCssExtractPlugin({
		filename: 'css/[name].[contenthash].css',
	}),
]

const module = {
	rules: [
		{
			test: /\.(jpe?g|png|webp|gif|svg)$/i,
			type: 'asset/resource',
		},
		{
			test: /\.(c|sa|sc)ss$/i,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [postcss],
						},
					},
				},
				'group-css-media-queries-loader',
				'resolve-url-loader',
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true,
					},
				},
			],
		},
	],
}
const optimization = {
	minimize: true,
	minimizer: [
		new ImageMinimizerPlugin({
			generator: [
				{
					preset: 'webp',
					implementation: ImageMinimizerPlugin.imageminGenerate,
					options: {
						plugins: ['imagemin-webp'],
					},
				},
			],
			minimizer: {
				implementation: ImageMinimizerPlugin.imageminMinify,
				options: {
					plugins: [
						['gifsicle', { interlaced: true }],
						['jpegtran', { quality: 75, progressive: true }],
						['optipng', { optimizationLevel: 5 }],
						// ['svgo', {}],
					],
				},
			},
		}),
		new ImageminWebpWebpackPlugin({
			config: [
				{
					test: /\.(jpe?g|png)/,
					options: {
						quality: 75,
					},
				},
			],
		}),
	],
}
const buildConfig = {
	mode: 'production',
	target: 'browserslist',
	output,
	module,
	plugins,
	optimization,
}

export default merge(config, buildConfig)
