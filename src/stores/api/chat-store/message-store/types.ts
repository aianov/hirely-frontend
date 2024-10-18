import { UserStatus } from '@/shared/utils/globalTypes'
import { MessageActionsType } from '@/stores/chat-store/chat-socket-store/types'
import { Dayjs } from 'dayjs'

export interface MessageListT {
   id: string
   content: string
   createdAt: string
   updatedAt: string
   senderId: string
   chatId: string
   parentId: null | any
   sender: MessageListTSender
   chat: MessageListTChat
   MessageImage: {
      createdAt: string
      id: string
      messageId: string
      url: string
   }[]
   parent: null | any
   replies: []
   reactions: []
   readStatuses: []
   type?: MessageActionsType
   userIdInChat?: string
}

export interface MessageListTSender {
   name: string
   id: string
   tag: string
   more: {
      p_lang: string[]
      who: string
      status: UserStatus
      logo: string
   }
}

export interface MessageListTChat {
   id: string
   title: string
   logo: string
   createdAt: string
   updatedAt: string
   isPersonal: boolean
   moreDataId: string
}

export interface MessageFromWs {
   name: string
   p_lang: string[]
   who: string
   id: string
   tag: string
   logo: string
   message: string
   fromWs: boolean
   chatId: string
   createdAt: Dayjs
}

export interface TypingStatusT {
   chatId: string
   isTyping: boolean
   name: string
   userId: string
   useIdInChat: string
}