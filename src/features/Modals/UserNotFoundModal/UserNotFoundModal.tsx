import { MainText } from '@/shared/ui/Theme/MainText'
import { profileStore } from '@/stores/profile-store/profile-store'
import { themeStore } from '@/stores/theme/theme-store'
import { Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

export const UserNotFoundModal = observer(() => {
   const { currentTheme } = themeStore
   const { isUserNotFound, setIsUserNotFound, selectedNotFoundTag } = profileStore

   return (
      <Modal
         open={isUserNotFound}
         onCancel={() => setIsUserNotFound(false)}
         footer={<></>}
         centered
         width={330}
         className={'modal-without-close'}
      >
         <div className={s.main}>
            <div className={`${s.top} df jcc`}>
               <MainText className='tac'>Похоже, пользователя с тэгом {selectedNotFoundTag} не существует.</MainText>
            </div>

            <div className={s.bot}>
               <button
                  className={s.cancel}
                  style={currentTheme.btnsTheme}
                  onClick={() => setIsUserNotFound(false)}
               >
                  <span style={currentTheme.textColor}>Ок</span>
               </button>
            </div>
         </div>
      </Modal>
   )
})