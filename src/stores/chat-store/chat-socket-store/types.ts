
export interface ChatUpdatedWs {
	id: string
	chatId: string
	content: string
	updatedAt: string
	userIdInChat?: string
	type: MessageActionsType
}

export type MessageActionsType = 'edit' | 'delete'