import { messageApiStore } from '@/stores/api/chat-store/message-store/message-store'
import { messageStore } from '@/stores/chat-store/message-store/message-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { themeStore } from '@/stores/theme/theme-store'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import s from './ChatMessage.module.scss'
import { SwipeableMessage } from './components/SwipeableMessage/SwipeableMessage'

export const ChatMessage = observer(({ inpRef }: ChatMessageProps) => {
   const { currentBg } = themeStore

   const { profile } = profileStore
   const {
      getMessageAction,
      messageList,
      messageLoading,
      getTopMessageAction,
      topMessageLoading,
      isHaveMoreBot,
      botMessageLoading,
      getBotMessageAction,
      maxScrollTop,
      setMaxScrollTop
   } = messageApiStore
   const { clearReply, isReplying, isMsgEditing } = messageStore

   const [highlightedMessageId, setHighlightedMessageId] = useState(null)

   const messagesEndRef = useRef<HTMLDivElement | null>(null)
   const scrollRef = useRef<HTMLDivElement | null>(null)

   const scrollToBottom = () => messagesEndRef.current && messagesEndRef.current.scrollIntoView()

   const handleScroll = async () => {
      const scrollElement = scrollRef.current
      if (scrollElement) {
         const { scrollTop, scrollHeight, clientHeight } = scrollElement
         console.log(scrollElement)

         console.log(maxScrollTop != 0)

         console.log(scrollTop)

         console.log(maxScrollTop)

         const isNearBottom = (scrollHeight - scrollTop - clientHeight) <= 400 // 100px от конца для активации

         if (isNearBottom && !botMessageLoading) {
            console.log('Near bottom')
            await getBotMessageAction()
         }

         console.log(scrollTop)
         console.log(!topMessageLoading)
         if (scrollTop <= 400 && !topMessageLoading) {
            console.log('asd')
            await getTopMessageAction()
         }
      }
   }

   useEffect(() => { setTimeout(() => setHighlightedMessageId(null), 1000) }, [highlightedMessageId])
   useEffect(() => { scrollToBottom() }, [messageList])
   useEffect(() => {
      getMessageAction()
      return () => { clearReply() }
   }, [getMessageAction])
   useEffect(() => {
      const scrollElement = scrollRef.current
      if (scrollElement) {
         console.log(scrollElement.scrollHeight)
         console.log(scrollElement.scrollTop)
         setMaxScrollTop(scrollElement.scrollTop)
      }
   }, [messageList?.length])

   if (messageLoading) {
      return (
         <div className={s.middle} style={{ backgroundImage: `url(${currentBg})` }}>
            <span>Загрузка</span>
         </div>
      )
   }

   return (
      <div
         className={s.middle}
         style={{
            backgroundImage: `url(${currentBg})`,
            height: '78%',
            position: messageList?.length == 0 ? 'relative' : "initial"
         }}
      >
         <div
            className={`${s.middlescroll} scrollable`}
            id="scrollable"
            ref={scrollRef}
            onScroll={handleScroll}
         >
            {messageLoading ? (
               <span>Загрузка...</span>
            ) : messageList?.length == 0 ? (
               <div className={s.nomsg}>
                  <span className={s.title}>Сообщений пока нет...</span>
                  <span className={s.subtitle}>Отправьте сообщение первым, или нажмите на приветствие ниже.</span>
                  <div>

                  </div>
               </div>
            ) : messageList?.map((message) => {
               const isFromCurrentUser = profile.id === message.senderId
               return (
                  <motion.div
                     key={message.id}
                     style={{
                        background: highlightedMessageId === message.id ? 'rgba(255, 255, 255, 0.123)' : 'transparent',
                        transition: 'background 0.5s ease'
                     }}
                     className={s.motionmsg}
                     data-id={message.id}
                  >
                     <SwipeableMessage
                        message={message}
                        isFromCurrentUser={isFromCurrentUser}
                        onReplyButtonClick={() => {
                           setHighlightedMessageId(message.parentId)
                        }}
                        inpRef={inpRef}
                     />
                  </motion.div>
               )
            })}

            <div ref={messagesEndRef} style={{ paddingTop: '10px', userSelect: 'none' }} />
         </div>
      </div>
   )
})

interface ChatMessageProps {
   inpRef: MutableRefObject<HTMLInputElement | null>
}

export interface MessageProps {
   id: string
   senderId: string
   createdAt: string
   updatedAt: string
   name?: string
   MessageImage: MessagePropsImages[]
   parent?: {
      name: string
      chatId: string
      content: string
      senderId: string
      sender: {
         id: string
         name: string
         tag: string
      }
   },
   sender: {
      name: string
      id: string
      more: {
         logo: string
         who: string
         p_lang: string[]
      }
   }
   content: string
   parentId: null | any
}

export interface MessagePropsImages {
   createdAt: string
   messageId: string
   url: string
   id: string
}[]