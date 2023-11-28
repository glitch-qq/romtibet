import { startWrapperScroll, stopWrapperScroll } from './index.js'

export function toggleClass(
	containerSelector = '.showHide',
	triggerSelector = '.showHide-trigger',
	contentSelector = '.showHide-content',
	overflowHidden = false
) {
	const containers = document.querySelectorAll(containerSelector)

	const activeClassName = 'active'

	containers.forEach((container) => {
		const trigger = container.querySelector(triggerSelector)
		const content = container.querySelector(contentSelector)
		const close = container.querySelector('.menu-close')

		let isOpen = false

		trigger.addEventListener('click', (event) => {
			isOpen = !isOpen

			event.stopPropagation()

			trigger.ariaExpanded = isOpen

			content.classList.toggle(activeClassName)
			trigger.classList.toggle(activeClassName)
			container.classList.toggle(activeClassName)

			if (isOpen) {
				if (overflowHidden) stopWrapperScroll()
			} else {
				if (overflowHidden) startWrapperScroll()
			}
		})
		close.addEventListener('click', (event) => {
			content.classList.remove(activeClassName)
			trigger.classList.remove(activeClassName)
			container.classList.remove(activeClassName)
		})

		document.addEventListener('click', (event) => {
			if (!content.contains(event.target) && !trigger.contains(event.target)) {
				isOpen = false

				content.classList.remove(activeClassName)
				trigger.classList.remove(activeClassName)
				container.classList.remove(activeClassName)

				if (overflowHidden) startWrapperScroll()
			}
		})
	})
}
