import { baseInstance } from '../base'
import { CreateMessageBody } from './types'

export const createMessage = async (body: CreateMessageBody) => {
   return await baseInstance.post(`/message`, body)
}

export const getMessage = async (
   chatId: string,
   params: {
      page?: number,
      limit: number,
      relativeToMessageId?: string,
      up?: boolean
   }
) => {
   return await baseInstance.get(`/message/chat/${chatId}`, {
      params: params
   })
}

export const deleteMessage = async (chatId: string, messageId: string, params: { deleteForAll: boolean }) => {
   return await baseInstance.delete(`/message/${chatId}/${messageId}`, {
      params: params
   })
}

export const editMessage = async (chatId: string, messageId: string, body: { content: string }) => {
   return await baseInstance.patch(`/message/${chatId}/${messageId}`, body)
}