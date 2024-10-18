import { BackArrowLeftIcon } from '@/assets/icons/Ui/BackArrowLeftIcon'
import { getProfile } from '@/shared/api/profile/api'
import { SelectUi } from '@/shared/ui/SelectUi'
import { MainText } from '@/shared/ui/Theme/MainText'
import { privacySettingsSelector } from '@/shared/utils/globalData'
import { getSubtitleOfPrivacy, isMobile } from '@/shared/utils/someFunctions'
import { privacyValuesTranslationToRus } from '@/shared/utils/translations'
import { profileStore } from '@/stores/profile-store/profile-store'
import { PrivacyKeys, PrivacyValues } from '@/stores/profile-store/types'
import { settingsStore } from '@/stores/settings-store/settings-store'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import s from './PrivacySettings.module.scss'

export const PrivacySettings = observer(() => {
   const {
      profile: { isDescriptionView, isPhoneView, isFriendView, isGoalView, isHbView, isPlanView },
      setPrivacyAction
   } = profileStore
   const { setIsMobileAside } = settingsStore
   const { currentTheme } = themeStore

   const privacySettings = [
      { title: 'описание моей страницы?', subtitle: getSubtitleOfPrivacy(isDescriptionView, 'описание моей страницы'), value: isDescriptionView, key: 'isDescriptionView' },
      { title: 'список моих друзей?', subtitle: getSubtitleOfPrivacy(isFriendView, 'список моих друзей'), value: isFriendView, key: 'isFriendView' },
      { title: 'мой номер телефона?', subtitle: getSubtitleOfPrivacy(isPhoneView, 'мой номер телефона'), value: isPhoneView, key: 'isPhoneView' },
      { title: 'моё день рождение?', subtitle: getSubtitleOfPrivacy(isHbView, 'моё день рождение'), value: isHbView, key: 'isHbView' },
      { title: 'мои цели?', subtitle: getSubtitleOfPrivacy(isGoalView, 'мои цели'), value: isGoalView, key: 'isGoalView' },
      { title: 'мои планы?', subtitle: getSubtitleOfPrivacy(isPlanView, 'мои планы'), value: isPlanView, key: 'isPlanView' },
   ]

   useEffect(() => { getProfile() }, [])

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
            <span>Моя страница</span>
         </div>

         {/* PRIVACY SETTINGS */}
         {privacySettings.map(t => {
            console.log(t.subtitle)
            return (
               <div key={t.key} className={s.privacy}>
                  <div className={s.top}>
                     {/* title */}
                     <div className={s.left}>
                        <p className={s.title}>Кто видит {t.title}</p>
                        <p className={s.subtitle}>{t.subtitle}</p>
                     </div>
                     <div className={s.right}>
                        {/* Selector */}
                        <SelectUi
                           style={{ width: "100%", height: '35px' }}
                           items={privacySettingsSelector}
                           containerStyle={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                           state={privacyValuesTranslationToRus(t.value)}
                           className='privacy-settings'
                           setState={(value) => setPrivacyAction(t.key as PrivacyKeys, value as PrivacyValues)}
                        />
                     </div>
                  </div>
               </div>
            )
         })}
      </div>
   )
})