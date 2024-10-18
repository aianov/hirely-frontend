import { BackArrowLeftIcon } from '@/assets/icons/Ui/BackArrowLeftIcon'
import { MainText } from '@/shared/ui/Theme/MainText'
import { isMobile } from '@/shared/utils/someFunctions'
import { settingsStore } from '@/stores/settings-store/settings-store'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import s from './SubscriptionSettings.module.scss'

export const SubscriptionSettings = observer(() => {
   const { setIsMobileAside } = settingsStore
   const { currentTheme } = themeStore

   return (
      <div className={s.main}>
         <div className='privacy-settings-top'>
            {isMobile() && (
               <button
                  onClick={() => setIsMobileAside(false)}
                  className={'backbtn'}
               >
                  <BackArrowLeftIcon width={20} color={currentTheme.textColor.color} />
                  <MainText>Назад</MainText>
               </button>
            )}
            <span>Подписка</span>
         </div>
      </div>
   )
})