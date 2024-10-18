import { MessageReadedIcon } from '@/assets/icons/MainPage/Chats/MessageReadedIcon'
import { parseCommentText } from '@/shared/utils/globalJsxData'
import { formatDefaultDate } from '@/shared/utils/someFunctions'
import { messageStore } from '@/stores/chat-store/message-store/message-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { themeStore } from '@/stores/theme/theme-store'
import { AnimatePresence } from 'framer-motion'
import { forwardRef, MutableRefObject, useEffect, useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { MessageProps } from '../../ChatMessage'
import s from '../../ChatMessage.module.scss'
import { ContextMenu } from '../MessageMenu/MessageMenu'
import { MessageImages } from './components/MessageImages/MessageImages'

interface SwipeableMessageProps {
   message: MessageProps
   isFromCurrentUser: boolean
   onReplyButtonClick: () => void
   inpRef: MutableRefObject<HTMLInputElement | null>
}

const SWIPE_THRESHOLD = 50

export interface ContextMenuT {
   show: boolean
   x: number
   y: number
   messageId: null | string
}
const initialContextMenu = {
   show: false,
   x: 0,
   y: 0,
   messageId: null
}

export const SwipeableMessage = forwardRef<HTMLDivElement, SwipeableMessageProps>(({
   message,
   isFromCurrentUser,
   onReplyButtonClick,
   inpRef
}) => {
   const [swipeTranslate, setSwipeTranslate] = useState(0)
   const [isSwiping, setIsSwiping] = useState(false)
   const [isSwipeHandled, setIsSwipeHandled] = useState(false)
   const [animationState, setAnimationState] = useState('')
   const [contextMenu, setContextMenu] = useState<ContextMenuT>(initialContextMenu)

   const { setIsReplying, setMessageToReply } = messageStore
   const { profile } = profileStore
   const { currentTheme } = themeStore


   const messageRef = useRef<HTMLDivElement | null>(null)

   const handlers = useSwipeable({
      onSwiping: (eventData) => {
         if (eventData.dir === 'Left') {
            setSwipeTranslate(Math.min(eventData.deltaX, 0))
            setIsSwiping(true)
            setIsSwipeHandled(false)
         }
      },
      onSwipedLeft: () => {
         if (Math.abs(swipeTranslate) > SWIPE_THRESHOLD) {
            if (navigator.vibrate) navigator.vibrate(100)
            setIsReplying(true)
            setMessageToReply(message)
            setIsSwipeHandled(true)
            setAnimationState('shrink')
         }
         setSwipeTranslate(0)
         setIsSwiping(false)
      },
      onSwipedRight: () => {
         setSwipeTranslate(0)
         setIsSwiping(false)
      },
      onSwiped: () => {
         if (!isSwipeHandled) {
            setSwipeTranslate(0)
         }
         setIsSwiping(false)
      },
      preventScrollOnSwipe: true,
      trackMouse: true,
   })

   useEffect(() => {
      if (animationState === 'shrink') {
         setTimeout(() => {
            setSwipeTranslate(0)
            setAnimationState('')
         }, 300)
      }
   }, [animationState])

   const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.preventDefault()
      const { pageX, pageY } = e
      setContextMenu({ show: true, x: pageX, y: pageY, messageId: message?.id })
   }

   const [longPressTimer, setLongPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

   const startLongPress = (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0]
      const timer = setTimeout(() => {
         const { pageX, pageY } = touch
         setContextMenu({ show: true, x: pageX, y: pageY, messageId: message?.id })
      }, 500)

      setLongPressTimer(timer)
   }

   const cancelLongPress = () => {
      if (longPressTimer) {
         clearTimeout(longPressTimer)
         setLongPressTimer(null)
      }
   }

   return (
      <>
         <div
            {...handlers}
            key={message.id}
            ref={messageRef}
            className={`${isFromCurrentUser ? s.mymsg : s.hismsg}`}
            style={{
               transform: `translateX(${swipeTranslate}px)`,
               transition: isSwiping ? 'none' : 'transform 0.3s ease-out',
               padding: '0 15px',
            }}
            id={`message-${message.id}`}
            data-id={message.id}
            onContextMenu={handleContextMenu}
            onTouchStart={startLongPress}
            onTouchEnd={cancelLongPress}
         >
            <div
               className={`${s.usermsg} ${swipeTranslate !== 0 ? s.swiping : ''}`}
               style={{ background: currentTheme.bgTheme.background, border: currentTheme.bgTheme.border }}
            >
               {message?.parentId && (
                  <button className={s.replymain} onClick={onReplyButtonClick}>
                     <span className={s.toptext} style={currentTheme.secondTextColor}>Ответ на {message?.sender?.id === profile.id ? message?.parent?.sender?.name : profile.name}</span>
                     <span className={s.bottext} style={currentTheme.textColor}>{message?.parent!.content}</span>
                  </button>
               )}
               {message?.MessageImage?.length !== 0 && message?.MessageImage && (
                  <div className={s.album}>
                     {message?.MessageImage?.map((img) => (
                        <MessageImages img={img} />
                     ))}
                  </div>
               )}
               <div
                  className={s.msgbot}
                  style={{
                     display: 'flex',
                     flexDirection: message.content.length > 38 ? 'column' : 'row',
                     alignItems: 'flex-end',
                     justifyContent: "space-between",
                     gap: message.content.length > 38 ? '0' : '5px'
                  }}
               >
                  <div className={s.content}>
                     {parseCommentText(message.content!, message.id, currentTheme.textColor.color)}
                  </div>
                  <div className={s.msgbotbot}>
                     {message.createdAt !== message.updatedAt && (
                        <div className={s.edited}>
                           <span style={isFromCurrentUser ? currentTheme.textColor : currentTheme.secondTextColor}>
                              изменено
                           </span>
                        </div>
                     )}
                     <div className={s.date}>
                        <span style={isFromCurrentUser ? currentTheme.textColor : currentTheme.secondTextColor}>
                           {formatDefaultDate(message.createdAt, 'HH:mm')}
                        </span>
                     </div>
                     <div className={s.readstatus}>
                        <MessageReadedIcon color={currentTheme.textColor.color} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <AnimatePresence>
            {contextMenu.show && (
               <ContextMenu
                  id={`contextmenu-${message.id}`}
                  message={message}
                  inpRef={inpRef}
                  contextMenu={contextMenu}
                  setContextMenu={setContextMenu}
               />
            )}
         </AnimatePresence>
      </>
   )
})

export default SwipeableMessage
