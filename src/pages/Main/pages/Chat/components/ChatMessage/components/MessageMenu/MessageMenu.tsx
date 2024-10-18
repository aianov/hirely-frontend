import { CopyMsgIcon } from '@/assets/icons/MainPage/Chats/CopyMsgIcon'
import { DeleteMsgIcon } from '@/assets/icons/MainPage/Chats/DeleteMsgIcon'
import { PinMsgIcon } from '@/assets/icons/MainPage/Chats/PinMsgIcon'
import { ReplyMsgIcon } from '@/assets/icons/MainPage/Chats/ReplyMsgIcon'
import { ResendMsgIcon } from '@/assets/icons/MainPage/Chats/ResendMsgIcon'
import { SelectMsgIcon } from '@/assets/icons/MainPage/Chats/SelectMsgIcon'
import { EditIcon } from '@/assets/icons/Ui/EditIcon'
import { handleCopy } from '@/shared/utils/someFunctions'
import { messageStore } from '@/stores/chat-store/message-store/message-store'
import { pinStore } from '@/stores/chat-store/pin-store/pin-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { themeStore } from '@/stores/theme/theme-store'
import { motion, useAnimation } from 'framer-motion'
import React, { Dispatch, FC, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { MessageProps } from '../../ChatMessage'
import { ContextMenuT } from '../SwipeableMessage/SwipeableMessage'
import s from './MessageMenu.module.scss'

interface ContextMenuProps {
   id: string
   message: MessageProps
   inpRef: MutableRefObject<HTMLInputElement | null>
   contextMenu: ContextMenuT
   setContextMenu: Dispatch<React.SetStateAction<ContextMenuT>>
}

export const ContextMenu: FC<ContextMenuProps> = ({
   id,
   message,
   inpRef,
   contextMenu,
   setContextMenu
}) => {
   const { profile } = profileStore
   const {
      setIsReplying,
      setMessageToReply,
      setIsMsgDeleting,
      setSelectedMessage,
      setIsMsgEditing,
      setEditMessage,
      clearAll
   } = messageStore
   const { currentTheme } = themeStore
   const { setIsPin } = pinStore

   const menuRef = useRef<HTMLDivElement | null>(null)
   const controls = useAnimation()
   const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200)

   const handleResize = () => setIsMobile(window.innerWidth <= 1200)
   useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   const closeMenu = () => {
      controls.start({ opacity: 0, scale: 0.8 }).then(() => {
         setContextMenu({
            show: false,
            x: 0,
            y: 0,
            messageId: null
         })
      })
   }

   const handleClickOutside = useCallback((e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
         closeMenu()
      }
   }, [menuRef, closeMenu])

   useEffect(() => {
      if (contextMenu.show) {
         controls.start({ opacity: 1, scale: 1 })
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [contextMenu.show, controls, handleClickOutside])

   const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      e.preventDefault()
   }

   return (
      <>
         {/* OVERLAY  */}
         {isMobile && (
            <motion.div
               className={s.overlay}
               initial={{ opacity: 0, visibility: 'hidden' }}
               animate={{ opacity: 1, visibility: 'visible' }}
               exit={{ opacity: 0, visibility: 'hidden' }}
               transition={{ duration: 0.2 }}
               onClick={closeMenu}
            />
         )}

         <motion.div
            id={id}
            className={s.contextMenu}
            ref={menuRef}
            style={{
               ...currentTheme.btnsTheme,
               top: (window.scrollY + window.innerHeight) - 208 < contextMenu.y ? contextMenu.y - 208 : contextMenu.y,
               left: window.innerWidth - 125 < contextMenu.x ? contextMenu.x - 125 : contextMenu.x,
               zIndex: 1000,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls}
            transition={{
               duration: 0.2, // Длительность входной анимации
            }}
         >
            <div
               className={s.contextMenuBtn}
               onClick={e => {
                  handleMenuClick(e)
                  clearAll()
                  setIsReplying(true)
                  setMessageToReply(message)
                  setTimeout(() => {
                     closeMenu()
                  }, 0)
               }}
            >
               <ReplyMsgIcon color={currentTheme.textColor.color} />
               <span style={currentTheme.textColor}>Ответить</span>
            </div>

            {profile.id === message.sender.id && (
               <div
                  className={s.contextMenuBtn}
                  onClick={e => {
                     handleMenuClick(e)
                     clearAll()
                     setEditMessage(message.content)
                     setSelectedMessage(message)
                     setIsMsgEditing(true)
                     setTimeout(() => {
                        closeMenu()
                     }, 0)
                  }}
               >
                  <EditIcon size={12} color={currentTheme.textColor.color} />
                  <span style={currentTheme.textColor}>Изменить</span>
               </div>
            )}

            <div
               className={s.contextMenuBtn}
               onClick={e => {
                  handleMenuClick(e)
                  handleCopy(message.content)
                  inpRef?.current && inpRef.current.focus()
                  closeMenu()
               }}
            >
               <CopyMsgIcon color={currentTheme.textColor.color} />
               <span style={currentTheme.textColor}>Копировать</span>
            </div>

            <div
               className={s.contextMenuBtn}
               onClick={e => {
                  handleMenuClick(e)
                  setIsPin(true)
                  closeMenu()
               }}
            >
               <PinMsgIcon color={currentTheme.textColor.color} />
               <span style={currentTheme.textColor}>Закрепить</span>
            </div>

            <div
               className={s.contextMenuBtn}
               onClick={e => {
                  handleMenuClick(e)
                  // Handle resend action
                  closeMenu()
               }}
            >
               <ResendMsgIcon color={currentTheme.textColor.color} />
               <span style={currentTheme.textColor}>Переслать</span>
            </div>

            <div
               className={s.contextMenuBtn}
               onClick={e => {
                  handleMenuClick(e)
                  // Handle select action
                  closeMenu()
               }}
            >
               <SelectMsgIcon color={currentTheme.textColor.color} />
               <span style={currentTheme.textColor}>Выбрать</span>
            </div>

            <div
               className={`${s.contextMenuBtn} ${s.deletebtn}`}
               onClick={e => {
                  handleMenuClick(e)
                  setSelectedMessage(message)
                  setIsMsgDeleting(true)
                  closeMenu()
               }}
            >
               <DeleteMsgIcon size={12} />
               <span style={currentTheme.textColor}>Удалить</span>
            </div>
         </motion.div>
      </>
   )
}
