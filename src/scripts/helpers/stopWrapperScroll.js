export function stopWrapperScroll() {
	const wrapper = document.querySelector('.wrapper')
	const body = document.body
	
	const paddingRight =
		wrapper.offsetWidth - wrapper.firstElementChild.offsetWidth
	body.style.paddingRight = `${paddingRight}px`
	wrapper.style.overflowY = 'hidden'
}
