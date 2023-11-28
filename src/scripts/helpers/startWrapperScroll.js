export function startWrapperScroll() {
	const wrapper = document.querySelector('.wrapper')
	const body = document.body

	body.style.paddingRight = `0px`
	wrapper.style.overflowY = 'auto'
}
