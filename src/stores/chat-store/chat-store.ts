import { baseInstance } from '@/shared/api/base'
import { GetChatResponse, GetChatResponseMessages } from '@/shared/api/chat/types'
import { createMessage } from '@/shared/api/message/api'
import { CreateMessageBody } from '@/shared/api/message/types'
import { UserLineStatus } from '@/shared/utils/globalTypes'
import { makeAutoObservable } from "mobx"
import { io, Socket } from 'socket.io-client'
import { profileStore } from '../profile-store/profile-store'

class ChatStore {
	// @ts-ignore
	socket: Socket = io(import.meta.env.VITE_API_SOCKET_BASE_URL, {
		transports: ["websocket"],
		withCredentials: true,
	})

	constructor() {
		makeAutoObservable(this)

		this.socket.on('message', (message: GetChatResponseMessages) => {
			this.addMessage(message)
		})
	}

	messages: GetChatResponseMessages[] = [];
	chatSearch = ''
	selectedChat: GetChatResponse | null = localStorage.getItem('selectedChat') ? JSON.parse(localStorage.getItem('selectedChat')!) : null
	userLineStatus: UserLineStatus = 'offline'
	selectedChatId?: string | null = localStorage.getItem('selectedChatId') ? localStorage.getItem('selectedChatId')! : null

	setChatSearch = (text: string) => this.chatSearch = text
	setSelectedChatId = (chatId: string) => {
		localStorage.setItem('selectedChatId', chatId)
		this.selectedChatId = chatId
	}
	setSelectedChat = (chat: GetChatResponse) => {
		const stringify = JSON.stringify(chat)
		localStorage.setItem('selectedChat', stringify)
		this.selectedChat = chat
	}

	addMessage = (message: GetChatResponseMessages) => {
		this.messages.push(message)
	}

	sendMessage = (content: string, senderId: string) => {
		try {
			const messageData = { chatId: this.selectedChat?.id, senderId, content }
			this.socket.emit('message', messageData)
		} catch (err) { console.log(err) }
	}

	createMessageAction = async (message: string) => {
		if (!this.selectedChat?.id) return
		try {
			const body: CreateMessageBody = {
				content: 'faf',
				senderId: profileStore.profile.id,
				chatId: this.selectedChat?.id,
				parentId: null
			}
			const res = await createMessage(body)
			console.log(res)
			if (res.data) {
				const msg = { message, username: profileStore.profile.name }
				console.log(msg)
				this.socket.emit('new-message', msg)
			}
		} catch (err) { console.log(err) }
	}

	loadMessages = async () => {
		try {
			const chatId = this.selectedChat?.id
			console.log(chatId)
			const res = await baseInstance.get(`/message/chat/${chatId}`)
			console.log(res)
			if (res.data) {
				this.messages = res.data
			}
		} catch (err) { console.log(err) }
	}

	setUserLineStatus = (status: UserLineStatus) => this.userLineStatus = status

}

export const chatStore = new ChatStore()
