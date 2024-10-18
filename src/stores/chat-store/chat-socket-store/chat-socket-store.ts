// src/stores/chat-store/socket-store.ts
import { spawnNotifySound } from '@/shared/utils/someFunctions'
import { messageApiStore } from "@/stores/api/chat-store/message-store/message-store"
import { TypingStatusT } from '@/stores/api/chat-store/message-store/types'
import { chatStore } from "@/stores/chat-store/chat-store"
import { profileStore } from "@/stores/profile-store/profile-store"
import { makeAutoObservable } from "mobx"
import { io, Socket } from "socket.io-client"
import { messageStore } from '../message-store/message-store'
import { ChatUpdatedWs } from './types'
// import { MessageDeleteWsBody } from './types'

class ChatSocketStore {
   socket: Socket
   constructor() {
      makeAutoObservable(this)
      // @ts-ignore
      this.socket = io(import.meta.env.VITE_API_SOCKET_BASE_URL, {
         transports: ["websocket"],
         withCredentials: true,
      })
   }

   typingTimeout: ReturnType<typeof setTimeout> | null = null;
   typing = false;

   connectChatSocket() {
      const { selectedChatId, setUserLineStatus } = chatStore
      const { profile: { id } } = profileStore
      const {
         addNewMessageToDom,
         setScrollCallback,
      } = messageApiStore

      console.log(this.socket)

      if (!selectedChatId) return
      const chatId = selectedChatId

      this.socket.emit('join-chat', { chatId, userId: id })

      this.socket.on('connect', () => console.log("You are joined the chat"))
      this.socket.on('user-join', (message) => message.userId !== id && setUserLineStatus('inchat'))
      this.socket.on('user-left', (message) => message.userId !== id && setUserLineStatus('online'))

      this.socket.on('message', (data) => {
         setScrollCallback()
         if (data?.senderId != id) spawnNotifySound()
         if (id !== data?.id) addNewMessageToDom(data)
      })

      this.socket.on('current-users', (users: string[]) => {
         const inChat = users.filter(t => t != id)
         console.log("Users currently in chat:", inChat)
         // this.usersInChat = users;
         setUserLineStatus(inChat?.length != 0 ? 'inchat' : 'online')
      })

      this.socket.on('status-response', (msg) => {
         console.log(msg)
      })

      this.socket.on('message-deleted', (data) => {
         console.log(data)
         const list = messageApiStore.messageList
         messageApiStore.setMessageList(list.filter(m => m.id != data.messageId))
      })

      this.socket.on('message-edited', (data: ChatUpdatedWs) => {
         console.log(data)
         let list = messageApiStore.messageList
         list = list.map(msg => msg.id === data.id ? { ...msg, id: data.id, content: data.content, updatedAt: data.updatedAt } : msg)
         messageApiStore.setMessageList(list)
      })

      this.socket.on('typing', (message) => {
         if (message.userId != id && message.isTyping) setUserLineStatus('typing')
         else if (message.userId != id) setUserLineStatus('inchat')
      })

      return () => {
         this.socket.emit('leave-chat', selectedChatId, { userId: id })
         this.socket.off('message')
         this.socket.off('message-deleted')
         this.socket.off('message-edited')
         this.socket.off('user-join')
         this.socket.off('user-left')
         this.socket.off('connect')
         this.socket.off('typing')
      }
   }

   connectChatListSocket() {
      const {
         updateChatListWithMessage,
         updateChatListWithTypingStatus
      } = messageApiStore
      const { profile: { id } } = profileStore

      this.socket.emit('join-global', { userId: id })

      this.socket.on('global-message', (data) => {
         updateChatListWithMessage(data)
      })

      this.socket.on('typing-status', (data: TypingStatusT) => {
         updateChatListWithTypingStatus(data)
      })

      this.socket.on('chat-updated', (data: ChatUpdatedWs) => {
         console.log(data)
         updateChatListWithMessage(data)
      })

      return () => {
         this.socket.off('global-message')
         this.socket.off('chat-updated')
         this.socket.off('typing-status')

         this.socket.emit('leave-global', { userId: id })
      }
   }


   setTypingStatus(isTyping: boolean) {
      const { selectedChatId, selectedChat } = chatStore
      const { profile: { id, name } } = profileStore

      if (!selectedChatId) return

      this.socket.emit("typing-chat", {
         chatId: selectedChatId,
         userId: id,
         name: name,
         isTyping: isTyping,
         userIdInChat: selectedChat?.user?.id
      })
   }

   handleInput(e: React.ChangeEvent<HTMLInputElement>, updateMessage: (message: string) => void) {
      if (!this.typing) {
         this.typing = true
         this.setTypingStatus(true)
      }
      if (this.typingTimeout) clearTimeout(this.typingTimeout)
      this.typingTimeout = setTimeout(() => {
         this.typing = false
         this.setTypingStatus(false)
      }, 1000)
      updateMessage(e.target.value)
   }

   async handleSendMessage(updateMessage: (message: string) => void, chatId: string) {
      if (!chatId) return
      const res = await messageApiStore.addMessageAction()
      console.log(res)
      this.socket.emit("new-message", res)
      updateMessage("")
      messageStore.clearReply()
   }

   async handleEditMessage(updateMessage: (message: string) => void) {
      const { selectedChat } = chatStore
      if (!selectedChat?.id) return
      const res = await messageApiStore.editMessageAction()
      console.log(res)
      if (res?.data) {
         const message = res.data
         const messageToWs: ChatUpdatedWs = {
            id: message.id,
            chatId: message.chatId,
            content: message.content,
            updatedAt: message.updatedAt,
            type: 'edit',
         }
         if (message?.userIdInChat) messageToWs.userIdInChat = message.userIdInChat
         this.socket.emit("edit-message", messageToWs)
         updateMessage("")
         messageStore.clearEdit()
      }
   }

   async handleDeleteMessage(body: any) {
      this.socket.emit("delete-message", body)
      messageStore.clearDelete()
   }
}

export const chatSocketStore = new ChatSocketStore()
