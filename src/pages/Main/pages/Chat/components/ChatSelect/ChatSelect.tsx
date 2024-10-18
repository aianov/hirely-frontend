import { SettingsList } from '@/assets/icons/Ui/SettingsList'
import { GetChatResponse } from '@/shared/api/chat/types'
import { reportStore } from '@/stores/report-store/report-store'
import { themeStore } from '@/stores/theme/theme-store'
import { AnimatePresence, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import s from './ChatSelect.module.scss'

export const ChatSelect = observer(({
   chat
}: PostSelectProps) => {
   const {
      isReportingModal: { setIsReportingModal },
      reportType: { setReportType }
   } = reportStore

   const [isOpened, setIsOpened] = useState(false)
   const chatSelectListRef = useRef<HTMLDivElement | null>(null)
   const chatButtonRef = useRef<HTMLButtonElement | null>(null)

   const chatSelectHandler = () => {
      setIsOpened(false)
   }

   // Логика если ты нажал outside comment select'a
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            chatSelectListRef.current &&
            !chatSelectListRef.current.contains(event.target as Node) &&
            chatButtonRef.current &&
            !chatButtonRef.current.contains(event.target as Node)
         ) setIsOpened(false)
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [])

   return (
      <div style={{ position: 'relative' }}>
         <button ref={chatButtonRef} onClick={() => setIsOpened(prev => !prev)}>
            <SettingsList height={20} />
         </button>
         <AnimatePresence>
            {isOpened && (
               <motion.div
                  ref={chatSelectListRef}
                  className={s.commentSelectList}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ ...themeStore.currentTheme.btnsTheme, zIndex: '1000', border: '1px solid rgb(83, 83, 83)' }}
               >

                  {/* НАСТРОЙКИ */}
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        chatSelectHandler()
                     }}
                  >
                     <span style={themeStore.currentTheme.textColor}>Настройки</span>
                  </button>

                  {/* УВЕДОМЛЕНИЯ */}
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        chatSelectHandler()
                     }}
                  >
                     <span style={themeStore.currentTheme.textColor}>Уведомления</span>
                  </button>

                  {/* ТЕМЫ */}
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        chatSelectHandler()
                     }}
                  >
                     <span style={themeStore.currentTheme.textColor}>Темы</span>
                  </button>

                  {/* ЗАБЛОКИРОВАТЬ */}
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        chatSelectHandler()
                     }}
                  >
                     <span style={themeStore.currentTheme.textColor}>Заблокировать</span>
                  </button>

                  {/* ОЧИСТИТЬ ЧАТ */}
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        chatSelectHandler()
                     }}
                  >
                     <span style={themeStore.currentTheme.textColor}>Очистить чат</span>
                  </button>

                  {/* ПОЖАЛОВАТЬСЯ */}
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        chatSelectHandler()
                        setReportType('chat')
                        setIsReportingModal(true)
                     }}
                  >
                     <span style={themeStore.currentTheme.textColor}>Пожаловаться</span>
                  </button>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
})

interface PostSelectProps {
   chat: GetChatResponse
}