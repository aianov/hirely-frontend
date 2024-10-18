import { AnimatePresence, motion } from 'framer-motion'
import s from './ThemeSelect.module.scss'
import { observer } from 'mobx-react-lite'
import { SettingsList } from '@/assets/icons/Ui/SettingsList'
import { themeStore } from '@/stores/theme/theme-store'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetThemeListResponse } from '@/shared/api/theme/types'
import { DeleteThemeModal } from '@/features/Modals/DeleteThemeModal/DeleteThemeModal'
import { createThemeStore } from '@/stores/theme/create-theme-store'
import { EditThemeModal } from '@/features/Modals/EditThemeModal/EditThemeModal'
import { ShareThemeModal } from '@/features/Modals/ShareThemeModal/ShareThemeModal'

export const ThemeSelect = observer(({
   theme
}: ThemeSelectProps) => {
   const { setCurrentThemeObj } = themeStore
   const {
      setIsDeletingTheme,
      setCurrentThemeName,
      setIsEditingTheme,
      updateEditThemeObj,
      setIsSharingTheme,
      setSelectedThemeObj
   } = createThemeStore
   const navigate = useNavigate()

   const [isOpened, setIsOpened] = useState(false)
   const postSelectListRef = useRef<HTMLDivElement | null>(null)
   const postButtonRef = useRef<HTMLButtonElement | null>(null)

   // Логика если ты нажал outside comment select'a
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            postSelectListRef.current &&
            !postSelectListRef.current.contains(event.target as Node) &&
            postButtonRef.current &&
            !postButtonRef.current.contains(event.target as Node)
         ) setIsOpened(false)
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [])

   return (
      <div className='df jcc aic' style={{ position: 'relative', height: '20px' }}>
         <DeleteThemeModal />
         <EditThemeModal />
         <ShareThemeModal />
         <button
            ref={postButtonRef}
            onClick={() => setIsOpened(prev => !prev)}
            className='df jcc aic h100'
         >
            <SettingsList />
         </button>
         <AnimatePresence>
            {isOpened && (
               <motion.div
                  ref={postSelectListRef}
                  className={s.commentSelectList}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  style={themeStore.currentTheme.btnsTheme}
               >
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        setIsOpened(false)
                        setCurrentThemeName(theme)
                        setIsSharingTheme(true)
                     }}
                  >
                     <span style={themeStore.currentTheme.textColor}>Поделиться</span>
                  </button>
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        setIsOpened(false)
                        setCurrentThemeObj(theme.theme)
                        setSelectedThemeObj(theme.theme)
                        setCurrentThemeName(theme)
                        updateEditThemeObj('name', theme.name)
                        setIsEditingTheme(true)
                     }}
                  >
                     <span style={themeStore.currentTheme.textColor}>Редактировать</span>
                  </button>
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        setIsOpened(false)
                        setCurrentThemeName(theme)
                        setIsDeletingTheme(true)
                     }}
                  >
                     <span style={themeStore.currentTheme.textColor}>Удалить</span>
                  </button>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
})

interface ThemeSelectProps {
   theme: GetThemeListResponse
}