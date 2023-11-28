import { Datepicker } from 'vanillajs-datepicker'
import ru from 'vanillajs-datepicker/locales/ru'
import 'vanillajs-datepicker/css/datepicker-bulma.css'

Object.assign(Datepicker.locales, ru)
new Datepicker(document.querySelector('.hero-datepicker .datepicker-input'), {
	autohide: true,
	language: 'ru',
})