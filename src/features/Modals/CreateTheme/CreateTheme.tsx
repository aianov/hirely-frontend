import { Modal } from 'antd'
import s from './CreateTheme.module.scss'
import { observer } from 'mobx-react-lite'
import { themeStore } from '@/stores/theme/theme-store'
import { useLocation } from 'react-router-dom'
import { InputUi } from '@/shared/ui/InputUi'
import { useEffect } from 'react'
import { createThemeStore } from '@/stores/theme/create-theme-store'

export const CreateTheme = observer(() => {
   const { currentTheme } = themeStore
   const {
      isCreatingTheme,
      setIsCreatingTheme,
      createThemeAction,
      createThemeObj,
      createThemeObjErr,
      updateInput
   } = createThemeStore
   const path = useLocation().pathname

   return (
      <Modal
         open={isCreatingTheme}
         onCancel={() => setIsCreatingTheme(false)}
         footer={<></>}
         centered
         width={400}
      >
         <div className={s.main}>
            <div className={s.top}>
               <span className={s.title}>Добавить свою тему</span>
            </div>

            <div className={s.mid}>
               <InputUi
                  name='name'
                  title='Введите название'
                  placeholder='Великий самурай'
                  inpStyle={{padding: '10px 0'}}

                  value={createThemeObj.name}
                  setValue={updateInput}
                  error={createThemeObjErr.nameErr}
               />
            </div>

            <div className={s.bot}>
               <button
                  className={s.submit}
                  onClick={createThemeAction}
               >
                  Сохранить
               </button>
               <button
                  className={s.cancel}
                  style={currentTheme.btnsTheme}
                  onClick={() => setIsCreatingTheme(false)}
               >
                  <span style={currentTheme.textColor}>Отмена</span>
               </button>
            </div>
         </div>
      </Modal>
   )
})