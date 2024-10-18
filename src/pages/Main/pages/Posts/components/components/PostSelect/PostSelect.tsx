import { SettingsList } from '@/assets/icons/Ui/SettingsList'
import { DeletePostModal } from '@/features/Modals/Posts/DeletePostModal/DeletePostModal'
import { GetPostsPostResponse } from '@/shared/api/posts/types'
import { postStore } from '@/stores/post/post-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { reportStore } from '@/stores/report-store/report-store'
import { themeStore } from '@/stores/theme/theme-store'
import { AnimatePresence, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './PostSelect.module.scss'

export const PostSelect = observer(({
   post
}: PostSelectProps) => {
   const { setSelectedPost, setIsDeletingPost, setSelectedPostForDelete } = postStore
   const { profile: { id } } = profileStore
   const {
      isReportingModal: { setIsReportingModal },
      reportType: { setReportType }
   } = reportStore

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
      <div style={{ position: 'relative' }}>
         <DeletePostModal />
         <button ref={postButtonRef} onClick={() => setIsOpened(prev => !prev)}>
            <SettingsList />
         </button>
         <AnimatePresence>
            {isOpened && post?.authorId == id && (
               <motion.div
                  ref={postSelectListRef}
                  className={s.commentSelectList}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={themeStore.currentTheme.btnsTheme}
               >
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        setSelectedPost(post)
                        localStorage.setItem('selected-post', JSON.stringify(post))
                        navigate('/main/edit-post')
                     }}
                  >
                     <span style={themeStore.currentTheme.textColor}>Редактировать</span>
                  </button>
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        setSelectedPostForDelete(post)
                        setIsDeletingPost(true)
                     }}
                  >
                     <span style={themeStore.currentTheme.textColor}>Удалить</span>
                  </button>
               </motion.div>
            )}
            {isOpened && post?.authorId != id && (
               <motion.div
                  ref={postSelectListRef}
                  className={s.commentSelectList}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={themeStore.currentTheme.btnsTheme}
               >
                  <button
                     className={s.commentSelect}
                     onClick={() => {
                        setSelectedPost(post)
                        localStorage.setItem('selected-post', JSON.stringify(post))
                        // navigate('/main/edit-post')
                        setReportType('post')
                        setIsReportingModal(true)
                        setIsOpened(false)
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
   post: GetPostsPostResponse
}