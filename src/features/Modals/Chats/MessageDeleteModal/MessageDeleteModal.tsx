import { Checkbox, Modal } from 'antd'
import s from './MessageDeleteModal.module.scss'
import { observer } from 'mobx-react-lite'
import { themeStore } from '@/stores/theme/theme-store'
import { Dispatch, SetStateAction, useState } from 'react'
import { messageStore } from '@/stores/chat-store/message-store/message-store'
import { messageApiStore } from '@/stores/api/chat-store/message-store/message-store'
import { chatStore } from '@/stores/chat-store/chat-store'

export const MessageDeleteModal = observer(() => {
   const { currentTheme } = themeStore
   const {isMsgDeleting, setIsMsgDeleting} = messageStore
   const {deleteMessageAction} = messageApiStore
   const [checked, setChecked] = useState(true)
   const {selectedChat} = chatStore

   return (
      <Modal
         open={isMsgDeleting}
         onCancel={() => setIsMsgDeleting(false)}
         footer={<></>}
         centered
         width={300}
         className={'mydeletemodal modal-without-close'}
      >
         <div className={s.main}>
            <div className={s.top}>
               <span>Удалить выбранное сообщение?</span>
            </div>

            <div className={s.mid}>
               <Checkbox checked={checked} onChange={() => setChecked(p => !p)} style={{borderRadius: '50% !important'}} />
               <span style={currentTheme.textColor}>Удалить и у меня и у {selectedChat?.user?.name}</span>
            </div>

            <div className={s.bot}>
               <button
                  className={s.submit}
                  onClick={() => deleteMessageAction(checked)}
               >
                  Удалить
               </button>
               <button
                  className={s.cancel}
                  style={currentTheme.btnsTheme}
                  onClick={() => setIsMsgDeleting(false)}
               >
                  <span style={currentTheme.textColor}>Отмена</span>
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
}