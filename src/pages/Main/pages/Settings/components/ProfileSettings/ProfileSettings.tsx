import { BackArrowLeftIcon } from '@/assets/icons/Ui/BackArrowLeftIcon'
import { GetAvatar } from '@/shared/ui/GetAvatar'
import { InputUi } from '@/shared/ui/InputUi'
import { SelectUi } from '@/shared/ui/SelectUi'
import { MainText } from '@/shared/ui/Theme/MainText'
import { defaultLogo, selectPersonality, selectPlangs } from '@/shared/utils/globalData'
import { getPLangFromText, isMobile } from '@/shared/utils/someFunctions'
import { profileStore } from '@/stores/profile-store/profile-store'
import { settingsStore } from '@/stores/settings-store/settings-store'
import { ProfileSettingsT } from '@/stores/settings-store/types'
import { themeStore } from '@/stores/theme/theme-store'
import { DatePicker, Select, Space } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './ProfileSettings.module.scss'

export const ProfileSettings = observer(() => {
   const { profile } = profileStore
   const { currentTheme } = themeStore
   const {
      profileSettings,
      setProfileSettings,
      profileSettingsErr,
      updateProfileSettingsData,
      clearAll,
      submitEdit,
      searchTag,
      tagLoading,
      setTagLoading,
      callback,
      setCallback,
      setIsMobileAside
   } = settingsStore

   const navigate = useNavigate()
   const [lastUrl] = useState(localStorage.getItem('last-route') ? localStorage.getItem('last-route') : '/main/posts')
   const [profileSet, setProfileSet] = useState<ProfileSettingsT>()

   useEffect(() => () => clearAll(), [clearAll])
   useEffect(() => {
      if (callback) {
         setCallback(false)
         navigate('/main/my-profile')
      }
   }, [callback])

   console.log(profileSettings.hb)

   useEffect(() => {
      console.log(profile?.more?.hb)
      setProfileSettings({
         logo: profile?.more?.logo ? profile?.more?.logo : defaultLogo,
         description: profile?.more?.description,
         name: profile?.name,
         tag: "@" + profile?.tag,
         hb: profile?.more?.hb,
         p_lang: profile?.more?.p_lang,
         who: profile?.more?.who
      })
      setProfileSet({
         logo: profile?.more?.logo ? profile?.more?.logo : defaultLogo,
         description: profile?.more?.description,
         name: profile?.name,
         tag: "@" + profile?.tag,
         hb: profile?.more?.hb,
         p_lang: getPLangFromText(profile?.more?.p_lang),
         who: profile?.more?.who
      })
   }, [profile])

   return (
      <div className={s.main}>
         {/* top */}
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
            <span>Мой профиль</span>
         </div>

         {/* your profile */}
         <div className={s.mid}>
            <div className={s.profile}>
               <GetAvatar size={100} url={profile.more.logo} />
               <div className={s.names}>
                  <span className={s.name}>{profile.name}</span>
                  <span className={s.tag}>@{profile.tag}</span>
               </div>
            </div>

            <div className={s.description}>
               <span className={s.title}>Описание:</span>
               <div className={s.inpdiv}>
                  <textarea
                     className={s.descriptioninput}
                     placeholder='Введите описание'
                     value={profileSettings.description}
                     onChange={e => updateProfileSettingsData('description', e.target.value)}
                     maxLength={600}
                  />
                  <span
                     className={s.howmuch}
                     style={{ color: 600 - (+profileSettings?.description?.length) <= 10 ? 'red' : 600 - (+profileSettings.description.length) <= 50 ? '#ff7700' : 'white' }}
                  >{600 - (+profileSettings.description.length)}</span>
                  {profileSettingsErr.descriptionErr && <span className={s.errtext}>{profileSettingsErr.descriptionErr}</span>}
               </div>
            </div>
         </div>

         {/* settings */}
         <div className={s.bot}>
            <div className={s.inps}>
               {/* ИМЯ */}
               <InputUi
                  name='name'
                  title='Имя:'
                  placeholder='Укажите имя'
                  maxLength={16}

                  error={profileSettingsErr.nameErr}
                  mainStyle={{ background: '#393939' }}
                  value={profileSettings.name}
                  setValue={updateProfileSettingsData}
               />

               {/* ТЕГ */}
               <InputUi
                  name='tag'
                  title='Тег:'
                  placeholder='Укажите тег'
                  maxLength={16 + 1} // because tag have "@"

                  debounce={true}
                  isLoading={tagLoading}
                  debounceCallback={searchTag}
                  stopDebounce={profile.tag == profileSettings.tag.slice(1)}
                  stopCallback={() => setTagLoading(false)}
                  error={profileSettingsErr.tagErr}
                  mainStyle={{ background: '#393939' }}
                  value={profileSettings.tag}
                  setValue={updateProfileSettingsData}
               />

               {/* ДАТА РОЖДЕНИЯ */}
               <div className={s.datepicker}>
                  <span className={s.datepickertitle}>Дата рождения:</span>
                  <DatePicker
                     style={{ width: '100%', height: '45px' }}
                     format={'DD.MM.YYYY'}
                     value={profileSettings.hb ? dayjs(profileSettings.hb) : null}
                     onChange={(date) => {
                        // @ts-ignore
                        if (date && date.isValid()) updateProfileSettingsData("hb", date)
                        // @ts-ignore
                        else updateProfileSettingsData("hb", date)
                     }}
                  />
               </div>
            </div>
         </div>

         <div className={s.footer}>
            {/* ЛЮБИМЫЕ ЯЗЫКИ */}
            <div className={s.btncontainer}>
               <span className={s.btntitle}>Любимые языки:</span>
               <Space style={{ display: 'inline-block', width: '100%' }} direction="horizontal">
                  <Select
                     mode="multiple"
                     className='settings-selector'
                     allowClear
                     style={{ width: '100%' }}
                     placeholder="Выберите любимые языки"
                     value={profileSet?.p_lang?.map(lang => selectPlangs?.find(item => item.label === lang)?.key)}
                     onChange={(selectedKeys) => {
                        const selectedLanguages: string[] = selectedKeys.map(key => selectPlangs.find(item => item.key === key)!.label).filter(Boolean)
                        updateProfileSettingsData('p_lang', selectedLanguages)
                        // @ts-ignore
                        setProfileSet((prev: ProfileSettingsT) => {
                           const obj: ProfileSettingsT = {
                              ...prev,
                              p_lang: selectedLanguages
                           }
                           return obj
                        })
                     }}
                     options={selectPlangs.map(plang => ({ label: plang.label, value: plang.key }))}
                  />
               </Space>

            </div>

            {/* ЛИЧНОСТЬ */}
            <div className={s.btncontainer}>
               <span className={s.btntitle}>Личность/Профессия:</span>
               <SelectUi
                  style={{ width: "100%", height: '45px' }}
                  items={selectPersonality}
                  placeholder='Выберите личность/профессию'
                  state={profileSettings.who == '' ? null : profileSettings.who}
                  setState={(who: string) => updateProfileSettingsData('who', who)}
                  className='settings-person-select'
               />
            </div>

            <div className={s.btns}>
               {/* CANCEL BTN */}
               <button
                  onClick={() => {
                     clearAll()
                     if (isMobile()) {
                        setIsMobileAside(false)
                        return
                     }
                     navigate(lastUrl!)
                  }}
                  className={s.cancelbtn}
               >
                  Отмена
               </button>

               {/* SUBMIT BTN */}
               <button
                  onClick={submitEdit}
                  className={s.submitbtn}
                  disabled={Object.values(profileSettingsErr).some(t => t !== '')}
                  style={Object.values(profileSettingsErr).some(t => t !== '') ? { opacity: '0.7', cursor: 'not-allowed' } : {}}
               >
                  Сохранить
               </button>
            </div>
         </div>
      </div>
   )
})