import { baseInstance } from '../base'
import { CreateChatBody, GetChatParams } from './types'

export const createChat = async (body: CreateChatBody) => {
	return await baseInstance.post('/chat', body)
}

export const getChat = async (params: GetChatParams) => {
	return await baseInstance.get('/chat', {
		params: params
	})
}