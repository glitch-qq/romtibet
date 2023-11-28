import gulp from 'gulp'
const { src, dest, task, series, parallel } = gulp
import fs from 'fs'
import { deleteSync } from 'del'
import ttf2woff from 'gulp-ttf2woff'
import ttf2woff2 from 'gulp-ttf2woff2'
import webphtml from 'gulp-webp-html-nosvg'

const ttfWoff = () => {
	return src('./src/fonts/*.ttf').pipe(ttf2woff()).pipe(dest('./src/fonts'))
}
const ttfWoff2 = () => {
	return src('./src/fonts/*.ttf').pipe(ttf2woff2()).pipe(dest('./src/fonts'))
}
const ttfClear = (cb) => {
	deleteSync('./src/fonts/**/*.ttf')
	cb()
}
const webpHtmlBuild = () => {
	return src('./docs/*.html').pipe(webphtml()).pipe(gulp.dest('./docs/'))
}
function cb() {}
const fontsStyle = () => {
	const weights = {
		thin: 100,
		extralight: 200,
		light: 300,
		regular: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		heavy: 800,
		black: 900,
	}
	let fontsFile = `./src/scss/core/_fonts.scss`
	const fontFace = (name, weight, style, fileName) => `@font-face {
\tfont-family: '${name}';
\tfont-display: swap;
\tfont-weight: ${weight ?? 400};
\tfont-style: ${style};
\tsrc: url('../../fonts/${fileName}.woff') format('woff'),
\t\turl('../../fonts/${fileName}.woff2') format('woff2')
}\n`

	fs.readdir('./src/fonts', (err, fontList) => {
		if (fs.existsSync(fontsFile)) {
			fs.writeFile(fontsFile, '', cb)

			for (let i = 0, len = fontList.length; i < len; i++) {
				let fontFileName = fontList[i].split('.')[0]
				const string = /(.+)-(.+?)(italic)?$/gim.exec(fontFileName)
				const fontName = string[1]
				const fontWeight = weights[string[2].toLowerCase()]
				const fontStyle = string[3] ? string[3].toLowerCase() : 'normal'

				fs.appendFile(
					fontsFile,
					fontFace(fontName, fontWeight, fontStyle, fontFileName),
					cb
				)
			}
		}
	})

	return src('./src')
}

task('fonts', parallel(series(ttfWoff, ttfWoff2, ttfClear), fontsStyle))
task('webp', parallel(webpHtmlBuild))
