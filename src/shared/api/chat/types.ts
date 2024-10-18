import { MessageActionsType } from '@/stores/chat-store/chat-socket-store/types'
import { User } from '@/stores/profile-store/types'

export interface CreateChatBody {
	title: string
	logo: string
	isPersonal: boolean
	moreDataId: string
}

export interface GetChatParams {
	page: number
	limit: number
}

// =========================== RESPONSES ==============================

export interface GetChatResponse {
	id: string
	title: string
	logo: string
	createdAt: string
	updatedAt: string
	isPersonal: boolean
	moreDataId: string
	message: { content: string }
	messages: GetChatResponseMessages[]
	moreData: GetChatResponseMoreData
	unreadCount: number
	user: User | null
	isEdit: boolean
	isTyping: boolean
}

export interface GetChatResponseMoreData {
	p_lang: string[]
	streak: number
	stack: string[]
	who: string
}

export interface GetChatResponseMessages {
	id: string
	content: string
	user: User
	sender: {
		id: string
		name: string
	}
	type: MessageActionsType
	senderId: string
	chatId: string
	parentId: string | null
	reactions: any[]
	replies: string[]
	parent: any
	createdAt: string
	updatedAt: string
}