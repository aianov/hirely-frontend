import { orangeBtnBgColor } from '@/shared/utils/globalData'
import { chatStore } from '@/stores/chat-store/chat-store'
import { pinStore } from '@/stores/chat-store/pin-store/pin-store'
import { themeStore } from '@/stores/theme/theme-store'
import { Checkbox, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import s from '../MessageDeleteModal/MessageDeleteModal.module.scss'

export const PinMsgModal = observer(() => {
   const { currentTheme } = themeStore
   const [checked, setChecked] = useState(true)
   const { selectedChat } = chatStore
   const { isPin, setIsPin } = pinStore

   return (
      <Modal
         open={isPin}
         onCancel={() => setIsPin(false)}
         footer={<></>}
         centered
         width={300}
         className={'modal-without-close'}
      >
         <div className={s.main}>
            <div className={s.top}>
               <span>Закрепить выбранное сообщение?</span>
            </div>

            <div className={s.mid}>
               <Checkbox checked={checked} onChange={() => setChecked(p => !p)} style={{ borderRadius: '50% !important' }} />
               <span style={currentTheme.textColor}>Закрепить и у меня и у {selectedChat?.user?.name}</span>
            </div>

            <div className={s.bot}>
               <button
                  className={s.cancel}
                  style={currentTheme.btnsTheme}
                  onClick={() => setIsPin(false)}
               >
                  <span style={currentTheme.textColor}>Отмена</span>
               </button>
               <button
                  style={{ background: orangeBtnBgColor }}
                  onClick={() => console.log('pin func')}
               >
                  Закрепить
               </button>
            </div>
         </div>
      </Modal>
   )
})