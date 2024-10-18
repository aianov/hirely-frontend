import { baseInstance } from '../base'
import { GetFriendListParams, SendFriendRequestApiBody } from './types'

export const getFriendList = async (userId: string, params?: GetFriendListParams) => {
   return (await baseInstance.get(`/friend/${userId}/friends`, {params: params})).data
}

export const sendFriendRequestApi = async (body: SendFriendRequestApiBody) => await baseInstance.post('/friend', body)

export const cancelFriendRequestApi = async (senderId: string) => await baseInstance.delete(`/friend/request/${senderId}`)

export const removeFriendApi = async (userId: string, friendId: string) => await baseInstance.delete(`/friend/remove/${userId}/${friendId}`)

// REQUESTS LIST
export const getRequestList = async (userId: string, params?: GetFriendListParams) => {
   return (await baseInstance.get(`/friend/${userId}/requests`, {params: params})).data
}

// ACCEPT OR REJECT FRIEND REQUEST
export const acceptFriendRequest = async (requestId: string) => {
   return (await baseInstance.patch(`/friend/requests/${requestId}/accept`))
}

export const rejectFriendRequest = async (senderId: string, receiverId: string) => {
   return (await baseInstance.delete(`/friend/requests/${senderId}/${receiverId}`))
}

