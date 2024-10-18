import { Modal } from 'antd'
import s from './DeleteThemeModal.module.scss'
import { observer } from 'mobx-react-lite'
import { themeStore } from '@/stores/theme/theme-store'
import { useLocation } from 'react-router-dom'
import { createThemeStore } from '@/stores/theme/create-theme-store'

export const DeleteThemeModal = observer(() => {
   const { currentTheme } = themeStore
   const { isDeletingTheme, setIsDeletingTheme, deleteThemeAction, currentThemeName } = createThemeStore
   const path = useLocation().pathname

   return (
      <Modal
         open={isDeletingTheme}
         onCancel={() => setIsDeletingTheme(false)}
         footer={<></>}
         centered
         width={400}
      >
         <div className={s.main}>
            <div className={s.top}>
               <span className={s.title}>Вы действительно хотите удалить тему с названием {currentThemeName}?</span>
            </div>
            <div className={s.bot}>
               <button
                  className={s.submit}
                  onClick={deleteThemeAction}
               >
                  Удалить
               </button>
               <button
                  className={s.cancel}
                  style={currentTheme.btnsTheme}
                  onClick={() => setIsDeletingTheme(false)}
               >
                  <span style={currentTheme.textColor}>Отмена</span>
               </button>
            </div>
         </div>
      </Modal>
   )
})