import { Modal } from 'antd'
import s from './ViewThemeModal.module.scss'
import { observer } from 'mobx-react-lite'
import { themeStore } from '@/stores/theme/theme-store'
import { createThemeStore } from '@/stores/theme/create-theme-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getThemePreview } from '@/shared/utils/globalJsxData'

export const ViewThemeModal = observer(({
   themeId
}: ViewThemeModalProps) => {
   const { currentTheme, changeTheme, currentBg } = themeStore
   const {
      isThemeViewing,
      setIsThemeViewing,
      getThemeByIdAction,
      themeForView
   } = createThemeStore
   const navigate = useNavigate()

   const goBack = () => {
      setIsThemeViewing(false)
      const lastRoute = localStorage.getItem('last-route')
      if (lastRoute) {
         navigate(lastRoute)
         return
      }
      navigate('/main/settings/customization')
   }

   useEffect(() => { getThemeByIdAction(themeId) }, [themeId])

   return (
      <Modal
         open={isThemeViewing}
         onCancel={goBack}
         footer={<></>}
         centered
         width={400}
      >
         <div className={s.main}>
            <div className={s.top}>
               <span className={s.title}>Тема: {themeForView?.name}</span>
            </div>

            <div className={s.mid}>
               <div
                  className={s.previewtheme}
                  style={{ backgroundImage: `url(${currentBg})` }}
                  onClick={() => { }}
               >
                  {themeForView?.theme && getThemePreview(themeForView?.theme)}
               </div>
            </div>

            <div className={s.bot}>
               <button
                  className={s.submit}
                  onClick={() => {
                     if (!themeForView?.theme) return
                     changeTheme(themeForView?.theme)
                     goBack()
                  }}
               >
                  Сохранить
               </button>
               <button
                  className={s.cancel}
                  style={currentTheme.btnsTheme}
                  onClick={goBack}
               >
                  <span style={currentTheme.textColor}>Отмена</span>
               </button>
            </div>
         </div>
      </Modal>
   )
})

interface ViewThemeModalProps {
   themeId: string
}