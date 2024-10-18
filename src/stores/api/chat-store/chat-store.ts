import { createChat, getChat } from '@/shared/api/chat/api'
import { CreateChatBody, GetChatParams, GetChatResponse } from '@/shared/api/chat/types'
import { profileStore } from '@/stores/profile-store/profile-store'
import { makeAutoObservable } from "mobx"
import { GetType, SelectedChatType } from './types'

class ChatApiStore {
   constructor() { makeAutoObservable(this) }

   // =============== STATES ==================

   selectedType: null | SelectedChatType = null
   chatPage = 1
   chatLimit = 10
   chatList: GetChatResponse[] = []

   // =============== FETCHES ==================

   createChatAction = async () => {
      try {
         const user = profileStore.user
         const body: CreateChatBody = {
            title: user.name,
            logo: user.more.logo,
            isPersonal: true,
            moreDataId: user.moreId
         }
         const res = await createChat(body)
         if (res?.data) {
            return res.data.id
         }
      } catch (err) { console.log(err) }
   }

   getChatAction = async (type: GetType = 'default') => {
      try {
         const params: GetChatParams = {
            page: this.chatPage,
            limit: this.chatLimit
         }
         const res = await getChat(params)
         if (res.data) this.chatList = type == 'default' ? res.data.chats : [...this.chatList, ...res.data.chats]
      } catch (err) { console.log(err) }
   }

   // ============ OTHER MOVES ===============

   setSelectedType = (type: SelectedChatType) => this.selectedType = type

}

export const chatApitStore = new ChatApiStore()