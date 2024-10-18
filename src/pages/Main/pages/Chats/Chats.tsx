import { SearchIcon } from '@/assets/icons/MainPage/Posts/SearchIcon'
import { ThemeDiv } from '@/shared/ui/Theme/ThemeDiv'
import { getProfileStatuses } from '@/shared/utils/globalJsxData'
import { isMobile } from '@/shared/utils/someFunctions'
import { chatApitStore } from '@/stores/api/chat-store/chat-store'
import { chatSocketStore } from '@/stores/chat-store/chat-socket-store/chat-socket-store'
import { chatStore } from '@/stores/chat-store/chat-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import s from './Chats.module.scss'
import { ChatList } from './components/ChatList/ChatList'

export const Chats = observer(() => {
   const { currentTheme } = themeStore
   const { chatSearch, setChatSearch } = chatStore
   const { getChatAction } = chatApitStore
   const { profile: { id, more: { p_lang } } } = profileStore

   useEffect(() => { getChatAction() }, [])
   useEffect(() => {
      if (!chatSocketStore.socket) return
      return () => { chatSocketStore.socket && chatSocketStore.socket.emit('leave-global', { userId: id }) }
   }, [id, chatSocketStore.socket])

   // useEffect(() => {
   //    if (!selectedChatId) return
   //    inpRef.current?.focus()
   //    chatSocketStore.connectChatSocket()
   //    return () => { chatSocketStore.socket && chatSocketStore.socket.emit('leave-chat', { chatId: selectedChatId, userId: id }) }
   // }, [selectedChatId])

   return (
      <div className={s.main}>
         <ThemeDiv
            className={s.maincontainer}
         >
            <div className={s.top}>
               <div className={s.topleft}>
                  <span className={s.title} style={currentTheme.textColor}>Чаты</span>
                  {isMobile() && getProfileStatuses(p_lang?.[0], 25)}
               </div>
               <div className={s.topright}>
                  <div
                     className={s.inpdiv}
                     style={currentTheme.btnsTheme}
                  >
                     <input
                        placeholder='Поиск'
                        type="text"
                        value={chatSearch}
                        onChange={e => setChatSearch(e.target.value)}
                        maxLength={200}
                        style={currentTheme.textColor}
                     />
                     <SearchIcon color={currentTheme.secondTextColor.color} />
                  </div>
               </div>
            </div>

            <ChatList />
         </ThemeDiv>
      </div>
   )
})