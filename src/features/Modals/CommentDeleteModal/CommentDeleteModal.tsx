import { deleteComment } from '@/shared/api/posts/comments/api'
import { commentStore } from '@/stores/post/components/comment/comment-store'
import { themeStore } from '@/stores/theme/theme-store'
import { Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { Dispatch, SetStateAction } from 'react'
import s from './CommentDeleteModal.module.scss'

export const CommentDeleteModal = observer(({
   setComments,
   isCommentDeleting,
   setIsCommentDeleting,
   deleteCallback
}: CommentDeleteModalProps) => {
   const { currentTheme } = themeStore
   const { selectedCommentIdForDelete } = commentStore

   const deletePostAction = async () => {
      if (!selectedCommentIdForDelete) return
      setIsCommentDeleting(true)
      try {
         const res = await deleteComment(selectedCommentIdForDelete)
         if (res.data) {
            const deletedComId = res.data.id
            setComments(prev => {
               console.log(prev)
               console.log(prev.length)
               return prev.filter(c => c.id != deletedComId)
            })
            deleteCallback && deleteCallback()
         }
      } catch (err) { console.log(err) }
      finally { setIsCommentDeleting(false) }
   }

   return (
      <Modal
         open={isCommentDeleting}
         onCancel={() => setIsCommentDeleting(false)}
         footer={<></>}
         centered
         width={400}
      >
         <div className={s.main}>
            <div className={s.top}>
               <span>Вы действительно хотите удалить этот комментарий?</span>
            </div>
            <div className={s.bot}>
               <button
                  className={s.submit}
                  onClick={deletePostAction}
               >
                  Удалить
               </button>
               <button
                  className={s.cancel}
                  style={currentTheme.btnsTheme}
                  onClick={() => setIsCommentDeleting(false)}
               >
                  <span style={currentTheme.textColor}>Отменить</span>
               </button>
            </div>
         </div>
      </Modal>
   )
})

interface CommentDeleteModalProps {
   setComments: Dispatch<React.SetStateAction<any[]>>
   isCommentDeleting: boolean
   setIsCommentDeleting: Dispatch<SetStateAction<boolean>>
   deleteCallback?: () => void
}