import type { ToastOptions, ToastPosition } from 'react-toastify'
import { Bounce, toast } from 'react-toastify'

type ToastType = 'info' | 'warn' | 'error' | 'success'
function WarningUi(options?: {
	type?: ToastType
	position?: ToastPosition
	text?: string
	backgroundColor?: string
	color?: string
	borderRadius?: string
	width?: string
	time?: number
}): void {
	const defaultOptions: ToastOptions = {
		position: 'bottom-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'colored',
		style: {
			borderRadius: '3px',
			width: '300px',
			fontSize: '14px',
		},
		transition: Bounce,
	}

	if (options) {
		if (options.position) defaultOptions.position = options.position
		if (options.backgroundColor) defaultOptions.style!.backgroundColor = options.backgroundColor
		if (options.color) defaultOptions.style!.color = options.color
		if (options.borderRadius) defaultOptions.style!.borderRadius = options.borderRadius
		if (options.width) defaultOptions.style!.width = options.width
		if (options.time) defaultOptions.autoClose = options.time
	}

	if (options && options.type === 'info') {
		toast.info(options.text || 'Write text', defaultOptions)
		return
	}
	if (options && options.type === 'warn') {
		toast.warn(options.text || 'Write text', defaultOptions)
		return
	}
	if (options && options.type === 'error') {
		toast.error(options.text || 'Write text', defaultOptions)
		return
	}
	if (options && options.type === 'success') {
		toast.success(options.text || 'Write text', defaultOptions)
		return
	}
}

export default WarningUi
