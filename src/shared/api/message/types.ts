export interface CreateMessageBody {
	content: string
	senderId: string
	chatId: string
	parentId: string | null
	image?: any[]
}