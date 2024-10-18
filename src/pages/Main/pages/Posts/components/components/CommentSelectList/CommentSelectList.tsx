import { SettingsList } from '@/assets/icons/Ui/SettingsList'
import { GetPostsCommentResponse } from '@/shared/api/posts/types'
import { commentStore } from '@/stores/post/components/comment/comment-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { reportStore } from '@/stores/report-store/report-store'
import { themeStore } from '@/stores/theme/theme-store'
import { AnimatePresence, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import s from './CommentSelectList.module.scss'

export const CommentSelectList = observer(({
   com,
   setIsCommentEditing,
   setIsCommentDeleting,
   deleteCallback
}: CommentSelectListProps) => {
   const {
      setSelectedCommentIdForDelete,
      setTypeOfDelete
   } = commentStore
   const { profile: { id } } = profileStore
   const {
      reportType: { setReportType },
      isReportingModal: { setIsReportingModal }
   } = reportStore

   const [commentSelectList, setCommentSelectList] = useState(false)
   const commentSelectListRef = useRef<HTMLDivElement | null>(null)
   const commentButtonRef = useRef<HTMLButtonElement | null>(null)

   // Логика если ты нажал outside comment select'a
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            commentSelectListRef.current &&
            !commentSelectListRef.current.contains(event.target as Node) &&
            commentButtonRef.current &&
            !commentButtonRef.current.contains(event.target as Node)
         ) {
            setCommentSelectList(false)
            console.log('ad')
         }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [])

   return (
      <div style={{ position: 'relative' }}>
         <button ref={commentButtonRef} onClick={() => setCommentSelectList(prev => !prev)}>
            <SettingsList />
         </button>
         <AnimatePresence>
            {commentSelectList && (
               <motion.div
                  ref={commentSelectListRef}
                  className={s.commentSelectList}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={themeStore.currentTheme.btnsTheme}
               >
                  {com.authorId == id ? (
                     <>
                        <div
                           className={s.commentSelect}
                           onClick={() => {
                              setCommentSelectList(false)
                              setIsCommentEditing(true)
                           }}
                        >
                           <span style={themeStore.currentTheme.textColor}>Редактировать</span>
                        </div>
                        <div
                           className={s.commentSelect}
                           onClick={() => {
                              setSelectedCommentIdForDelete(com?.id)
                              setCommentSelectList(false)
                              setIsCommentDeleting(true)
                           }}
                        >
                           <span style={themeStore.currentTheme.textColor}>Удалить</span>
                        </div>
                     </>
                  ) : (
                     <>
                        <div
                           className={s.commentSelect}
                           onClick={() => {
                              setCommentSelectList(false)
                              setReportType('chat')
                              setIsReportingModal(true)
                           }}
                        >
                           <span style={themeStore.currentTheme.textColor}>Пожаловаться</span>
                        </div>
                     </>
                  )}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
})

interface CommentSelectListProps {
   com: GetPostsCommentResponse
   setIsCommentEditing: Dispatch<SetStateAction<boolean>>
   setIsCommentDeleting: Dispatch<SetStateAction<boolean>>
   deleteCallback?: () => void
}