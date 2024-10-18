import { NotFoundSearchIcon } from '@/assets/icons/Ui/NotFoundSearchIcon'
import { SecondaryText } from '@/shared/ui/Theme/SecondaryText'
import { chatApitStore } from '@/stores/api/chat-store/chat-store'
import { chatSocketStore } from '@/stores/chat-store/chat-socket-store/chat-socket-store'
import { chatStore } from '@/stores/chat-store/chat-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { Fragment, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import s from './ChatList.module.scss'
import { ChatItem } from './components/ChatItem/ChatItem'

export const ChatList = observer(() => {
   const { profile: { id } } = profileStore
   const { chatList, getChatAction } = chatApitStore
   const { currentTheme } = themeStore
   const { setSelectedChat } = chatStore

   useEffect(() => { chatSocketStore.connectChatListSocket() }, [])

   return (
      <div className={s.main}>
         <InfiniteScroll
            dataLength={chatList?.length}
            next={() => {
               getChatAction('pagination')
            }}
            className={s.mainscroll}
            hasMore={false}
            loader={<></>}
            scrollableTarget="friendlist-scrolldiv"
            style={{
               display: 'flex',
               flexDirection: 'column',
               gap: '5px',
            }}
         >
            <div className={s.chats}>
               {chatList?.length == 0 && (
                  <div className={s.nothing}>
                     <NotFoundSearchIcon size={150} />
                     <SecondaryText>У вас нет ниодного чата :(</SecondaryText>
                  </div>
               )}
               {chatList?.map(c => (
                  <Fragment key={c.id}>
                     <ChatItem c={c} />
                  </Fragment>
               ))}
            </div>
         </InfiniteScroll>
      </div>
   )
})