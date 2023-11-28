import Swiper from 'swiper'
import 'swiper/css'


const resizableSwiper = (
	breakpoint,
	swiperClass,
	swiperSettings,
	callback = undefined
) => {
	let swiper

	breakpoint = window.matchMedia(breakpoint)

	const enableSwiper = function (className, settings) {
		swiper = new Swiper(className, settings)

		if (callback) {
			callback(swiper)
		}
	}

	const checker = function () {
		if (breakpoint.matches) {
			return enableSwiper(swiperClass, swiperSettings)
		} else {
			if (swiper !== undefined) swiper.destroy(true, true)
			return
		}
	}

	breakpoint.addEventListener('change', checker)
	checker()
}

resizableSwiper('(max-width: 576px)', '.popular-slider', {
	slidesPerView: 1.2,
	spaceBetween: 10,
})
resizableSwiper('(max-width: 576px)', '.blog-slider', {
	slidesPerView: 1.2,
	spaceBetween: 24,
})
resizableSwiper('(max-width: 576px)', '.gallery-slider', {
	slidesPerView: 1.2,
	spaceBetween: 20,
})