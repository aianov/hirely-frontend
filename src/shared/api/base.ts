import axios, { AxiosInstance } from "axios"
import WarningUi from '../ui/WarningUi'

function createInstance(): AxiosInstance {
	const instance = axios.create({
		// @ts-ignore
		baseURL: import.meta.env.VITE_API_BASE_URL,
		headers: {}
	})

	instance.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("accessToken")
			if (token && config.url !== '/auth/register') config.headers.Authorization = `Bearer ${token}`
			return config
		},
		(error) => { return Promise.reject(error) }
	)

	instance.interceptors.response.use(
		(res) => {
			return res
		},
		async (err) => {
			const s = err.response.status
			if (s === 500) {
				WarningUi({
					type: 'error',
					text: 'Не предвиденная ошибка',
					position: 'top-right',
					time: 5000
				})
			}
			return err
		}
	)

	return instance
}

function createBotInstance(): AxiosInstance {
	const instance = axios.create({
		// @ts-ignore
		baseURL: 'https://c343-2-78-57-10.ngrok-free.app',
		headers: {}
	})

	instance.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("accessToken")
			if (token && config.url !== '/auth/register') config.headers.Authorization = `Bearer ${token}`
			return config
		},
		(error) => { return Promise.reject(error) }
	)

	instance.interceptors.response.use(
		(res) => {
			return res
		},
		async (err) => {
			const s = err.response.status
			if (s === 500) {
				WarningUi({
					type: 'error',
					text: 'Не предвиденная ошибка',
					position: 'top-right',
					time: 5000
				})
			}
			return err
		}
	)

	return instance
}

export const baseInstance = createInstance()

export const botInstance = createBotInstance()