import { GetChatResponseMessages } from '@/shared/api/chat/types'
import { uploadFiles } from '@/shared/api/file/file'
import { createMessage, deleteMessage, editMessage, getMessage } from '@/shared/api/message/api'
import { CreateMessageBody } from '@/shared/api/message/types'
import { chatSocketStore } from '@/stores/chat-store/chat-socket-store/chat-socket-store'
import { ChatUpdatedWs } from '@/stores/chat-store/chat-socket-store/types'
import { chatStore } from '@/stores/chat-store/chat-store'
import { messageStore } from '@/stores/chat-store/message-store/message-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { makeAutoObservable, runInAction } from "mobx"
import { chatApitStore } from '../chat-store'
import { MessageListT, TypingStatusT } from './types'


class MessageApiStore {
   constructor() { makeAutoObservable(this) }

   messageList: MessageListT[] = []
   messageLoading: boolean = false
   messagePage = 1
   messageLimit = 30
   messageTotal = 0
   scrollCallback = false

   topMessageLoading = false
   botMessageLoading = false
   isHaveMoreTop = true
   isHaveMoreBot = true

   maxScrollTop = 0

   MAX_MESSAGES = 60;

   // ========= FETCHES ============
   getMessageAction = async () => {
      if (!chatStore?.selectedChatId) return
      this.setMessageLoading(true)
      try {
         const res = await getMessage(chatStore.selectedChatId, { page: this.messagePage, limit: this.messageLimit })
         if (res.data) {
            this.messageList = res.data.messages.reverse()
            this.messageTotal = res.data.total
            this.messagePage = res.data.page
         }
      } catch (err) { console.log(err) }
      finally { this.setMessageLoading(false) }
   }

   addMessageAction = async () => {
      if (!chatStore.selectedChatId) return
      console.log(messageStore.messageToReply.id)
      const parentId = messageStore?.messageToReply?.id || null
      const { messageFile } = messageStore
      try {
         const body: CreateMessageBody = {
            content: messageStore.message,
            senderId: profileStore.profile.id,
            chatId: chatStore.selectedChatId,
            parentId: parentId,
            image: []
         }
         if (messageFile?.length != 0) {
            const fileRes = await uploadFiles(messageFile)
            if (fileRes.data) body.image = fileRes.data.urls
         }
         const res = await createMessage(body)
         if (res.data) return res.data
      } catch (err) { console.log(err) }
      this.setScrollCallback()
      messageStore.clearReply()
   }

   deleteMessageAction = async (deleteForAll: boolean) => {
      const chatId = chatStore.selectedChat?.id
      const msg = messageStore.selectedMessage
      if (!chatId || !msg?.id) return
      try {
         const res = await deleteMessage(chatId, msg.id, { deleteForAll })
         console.log(res)
         if (res.data) {
            messageStore.setIsMsgDeleting(false)
            const list = this.messageList
            this.setMessageList(list.filter(m => m.id != msg.id))
            const body: any = {
               chatId,
               messageId: msg.id,
               deletedBy: profileStore.profile.id
            }
            deleteForAll && chatSocketStore.handleDeleteMessage(body)
         }
      } catch (_) { console.log }
   }

   editMessageAction = async () => {
      const chatId = chatStore.selectedChat?.id
      const msg = messageStore.selectedMessage
      if (!chatId || !msg?.id) return
      try {
         const body = { content: messageStore.editMessage }
         const res = await editMessage(chatId, msg.id, body)
         if (res.data) return res
      } catch (_) { console.log }
   }

   // ========= GETES ============

   getTopMessageAction = async () => {
      if (!chatStore.selectedChat?.id || !this.isHaveMoreTop) return
      this.setTopMessageLoading(true)

      try {
         const res = await getMessage(
            chatStore.selectedChat.id,
            { limit: this.messageLimit, relativeToMessageId: this.messageList[0].id, up: true }
         )
         if (res.data) {
            console.log(res.data)
            this.messageList.unshift(...res.data.messages.reverse())
            this.setIsHaveMoreTop(res.data.isHaveMoreTopOrBottom)
            this.setIsHaveMoreBot(true)
            res.data.messages.length == 0 && this.setIsHaveMoreTop(false)

            while (this.messageList.length > this.MAX_MESSAGES) {
               this.messageList.shift() // Удаляет первый элемент массива
            }

         }
         this.setBotMessageLoading(false)
         this.setTopMessageLoading(false)
      } catch (err) { console.log(err) }
   };

   getBotMessageAction = async () => {
      console.log('asd')
      console.log('asd')
      if (!chatStore.selectedChat?.id || !this.isHaveMoreBot) return
      this.setBotMessageLoading(true)

      console.log(this.messageList)
      console.log(chatStore.selectedChat.id)
      console.log({ limit: this.messageLimit, relativeToMessageId: this.messageList?.[this.messageList?.length - 1]?.id, up: false })

      try {
         const res = await getMessage(
            chatStore.selectedChat.id,
            { limit: this.messageLimit, relativeToMessageId: this.messageList[this.messageList?.length - 1].id, up: false }
         )
         console.log(this.messageList[this.messageList?.length - 1].id)
         console.log(this.messageList[0].id)
         console.log(res)
         if (res.data) {
            // this.messageList.push(...res.data.messages.reverse())
            this.setIsHaveMoreBot(res.data.isHaveMoreTopOrBottom)
            res.data.messages.length == 0 && this.setIsHaveMoreBot(false)
            this.messageList = this.messageList.slice(0, this.MAX_MESSAGES)
         }
         this.setBotMessageLoading(false)
         this.setTopMessageLoading(false)
      } catch (err) { console.log(err) }
   };

   // ========= OTHER MOVES ============
   addNewMessageToDom = (newMessage: MessageListT) => this.messageList.push(newMessage)
   setScrollCallback = () => this.scrollCallback = !this.scrollCallback
   setMessageLoading = (is: boolean) => this.messageLoading = is
   setMessageList = (msg: MessageListT[]) => this.messageList = msg

   setTopMessageLoading = (is: boolean) => this.topMessageLoading = is
   setBotMessageLoading = (is: boolean) => this.botMessageLoading = is
   setIsHaveMoreTop = (is: boolean) => this.isHaveMoreTop = is
   setIsHaveMoreBot = (is: boolean) => this.isHaveMoreBot = is

   setMaxScrollTop = (scrollTop: number) => this.maxScrollTop = scrollTop
   setNewScrollTop = () => {
      const scroll = document.getElementById('scrollable')
      if (!scroll) return
      const { scrollTop } = scroll
      console.log(scrollTop)
      this.setMaxScrollTop(scrollTop)
   }

   updateChatListWithTypingStatus = (data: TypingStatusT) => {
      const { chatList } = chatApitStore
      const { chatId, isTyping } = data

      // c?.message?.content

      const existingChat = chatList.find(chat => chat.id === chatId)

      if (!existingChat) return

      existingChat.isTyping = isTyping
   }

   updateChatListWithDeletedMessage = (data: any) => {
      console.log('логика обновления удаления сообщения в списке чатов')
      console.log(data)
   }

   updateChatListWithMessage = (data: GetChatResponseMessages | ChatUpdatedWs) => {
      const { chatList, getChatAction } = chatApitStore
      const { chatId, content, type } = data
      const { profile: { id } } = profileStore

      const existingChat = chatList.find(chat => chat.id === chatId)

      if (!existingChat) {
         getChatAction(chatId)
         return
      }

      if (type == 'edit') existingChat.isEdit = true
      else {
         runInAction(() => {
            existingChat.isEdit = false
            existingChat.unreadCount += 1
         })
      }

      existingChat.message = { content }

      const messageIndex = existingChat?.messages?.findIndex(message => message?.id === data?.id)
      if (messageIndex !== -1 && messageIndex) {
         existingChat.messages[messageIndex] = { ...existingChat.messages[messageIndex], ...data }
      }
   }

   updateChatListWithEditedMessage = (data: any) => {
      console.log('логика обновления редактирования сообщения в списке чатов')
      console.log(data)
   }

}

export const messageApiStore = new MessageApiStore()