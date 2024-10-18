import { GenderIcon } from '@/assets/icons/MainPage/MyProfile/GenderIcon'
import { NotFoundIcon } from '@/assets/icons/Ui/NotFoundIcon'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import { getProfileStatuses } from '@/shared/utils/globalJsxData'
import { genderValuesTranslationToRus } from '@/shared/utils/translations'
import { subscribersStore } from '@/stores/subscribers-store/subscribers-store'
import { themeStore } from '@/stores/theme/theme-store'
import { BdIcon } from '@assets/icons/MainPage/MyProfile/BdIcon'
import { CreatePostIcon } from '@assets/icons/MainPage/MyProfile/CreatePost'
import { EmailIcon } from '@assets/icons/SignPageIcons/EmailIcon'
import { EditIcon } from '@assets/icons/Ui/EditIcon'
import { getProfile } from '@shared/api/profile/api'
import { defaultLogo, NavBtnsMyProfile } from '@shared/utils/globalData'
import { phoneFormat, socialNumberFormat } from '@shared/utils/parsers'
import { profileStore } from '@stores/profile-store/profile-store'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import s from './MyProfile.module.scss'

export const MyProfile = observer(() => {
   const navigate = useNavigate()
   const url = useLocation().pathname

   // mobx
   const { profile } = profileStore
   const { setSubOpen } = subscribersStore

   // states
   const [ifSaved, setIfSaved] = useState(false)

   const getProfileHandler = useCallback(async () => {
      try {
         const profileApi = (await getProfile()).data.user
      }
      catch (err) { console.log }
   }, [])

   useEffect(() => { getProfileHandler() }, [getProfileHandler])
   useEffect(() => {
      localStorage.setItem('last-route', url)
      setTimeout(() => {
         const localTitle = localStorage.getItem('saved-draft-title')
         const localDraft = localStorage.getItem('saved-draft')
         if (localDraft) {
            try {
               const draft = JSON.parse(localDraft)
               if (draft?.blocks?.[0]?.text) setIfSaved(true)
            } catch (e) { console.log }
         }
         if (localTitle) setIfSaved(true)
      }, 200)
   }, [])

   return (
      <div className={s.main}>
         <div className={s.profilecontainer}>
            <div className={s.top}>
               <div className={s.left}>
                  <div className={s.leftcontainer} style={themeStore.currentTheme.bgTheme}>
                     <button className={s.editbtn} onClick={() => navigate('/main/settings')}><EditIcon color={themeStore.currentTheme.secondTextColor.color} /></button>
                     <div className={s.avatardiv}>
                        <img src={profile?.more?.logo ? profile?.more?.logo : defaultLogo} alt="Profile-logo" />
                     </div>
                     <span className={s.name} style={themeStore.currentTheme.textColor}>{profile?.name}</span>
                     <span className={s.tag} style={themeStore.currentTheme.secondTextColor}>@{profile?.tag}</span>
                     <div className={s.more}>
                        <div className={s.who}>{profile?.more?.who ? profile?.more?.who : 'Самурай'}</div>
                        <div className={s.icon}>
                           {getProfileStatuses(profile?.more?.p_lang[0], 23)}
                        </div>
                     </div>
                  </div>
               </div>

               <div className={s.right} style={themeStore.currentTheme.bgTheme}>
                  <div className={s.top}>
                     <span style={themeStore.currentTheme.textColor}>Описание:</span>
                     <button onClick={() => navigate('/main/settings')}><EditIcon color={themeStore.currentTheme.secondTextColor.color} /></button>
                  </div>
                  {profile?.more?.description ? (
                     <p className={s.description} style={themeStore.currentTheme.secondTextColor}>{profile?.more?.description}</p>
                  ) : (
                     <div className={s.nothave}>
                        <NotFoundIcon size={70} />
                        <p style={themeStore.currentTheme.secondTextColor}>Описание не указано</p>
                     </div>
                  )}
               </div>
            </div>

            <div className={s.bottom} style={themeStore.currentTheme.bgTheme}>
               <div className={s.top}>
                  <div className={s.nav}>
                     <span style={themeStore.currentTheme.textColor}>Информация:</span>
                     <button onClick={() => navigate('/main/settings')}><EditIcon color={themeStore.currentTheme.secondTextColor.color} size={13} /></button>
                  </div>
                  <div className={s.about}>
                     <div className={s.bd}>
                        <BdIcon color={themeStore.currentTheme.secondTextColor.color} />
                        <span style={themeStore.currentTheme.secondTextColor}>День рождение: {profile?.more?.hb ? dayjs(profile?.more?.hb).format('DD.MM.YYYY') : 'Не указано'}</span>
                     </div>
                     <div className={s.email}>
                        <EmailIcon width={15} height={15} color={themeStore.currentTheme.secondTextColor.color} />
                        <span style={themeStore.currentTheme.secondTextColor}>Номер телефона: {phoneFormat(profile?.phone)}</span>
                     </div>
                     <div className={s.gender}>
                        <GenderIcon size={15} color={themeStore.currentTheme.secondTextColor.color} />
                        <span style={themeStore.currentTheme.secondTextColor}>Пол: {genderValuesTranslationToRus(profile?.gender)}</span>
                     </div>
                     <div className={s.email}>
                        <span style={themeStore.currentTheme.secondTextColor}>Дата регистрации: {dateFormatter(profile?.createdAt, 'DD.MM.YYYY')}</span>
                     </div>
                  </div>
               </div>
               <div className={s.mid}>
                  <div className={s.midleft}>
                     <div className={s.infodiv}>
                        <span style={themeStore.currentTheme.textColor}>{socialNumberFormat(profile?.more?.posts_count)}</span>
                        <span style={themeStore.currentTheme.textColor}>постов</span>
                     </div>
                  </div>
                  <div className={s.midmid}>
                     <div className={s.infodiv}>
                        <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(profile?.more?.goals?.length)}</span>
                        <span style={themeStore.currentTheme.secondTextColor}>целей</span>
                     </div>
                     <div className={s.infodiv}>
                        <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(profile?.more?.plans?.length)}</span>
                        <span style={themeStore.currentTheme.secondTextColor}>планов</span>
                     </div>
                  </div>
                  <div className={s.midright}>
                     <div className={s.infodiv}>
                        <span className={s.rate}>{socialNumberFormat(profile?.more?.rating)}</span>
                        <span className={s.rate}>рейтинг</span>
                     </div>
                  </div>
               </div>
               <div className={s.bot}>
                  <div className={s.left}>
                     <div className={s.nav}>
                        <span style={themeStore.currentTheme.secondTextColor}>Любимые языки:</span>
                        <button onClick={() => navigate('/main/settings')}><EditIcon color={themeStore.currentTheme.secondTextColor.color} /></button>
                     </div>
                     <div className={s.plang}>
                        {profile?.more?.p_lang?.length == 0 ? (
                           <span style={themeStore.currentTheme.secondTextColor}>Не указано</span>
                        ) : profile?.more?.p_lang?.map((t, i) => (
                           <div className={s.icon} key={i}>
                              {getProfileStatuses(t, 37.5)}
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className={s.right}>
                     <div className={s.nav}>
                        <span style={themeStore.currentTheme.secondTextColor}>Профессия:</span>
                        <button onClick={() => navigate('/main/settings')}><EditIcon color={themeStore.currentTheme.secondTextColor.color} /></button>
                     </div>
                     <div className={s.whodiv}>
                        <div className={s.who}>{profile?.more?.who ? profile?.more?.who : 'Самурай'}</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* ВЫБОР ПОСТОВ ПЛАНОВ И ТД */}
            <div className={s.content}>
               <div className={s.bar} style={themeStore.currentTheme.bgTheme}>
                  <div className={s.scroll}>
                     {NavBtnsMyProfile.map((t, i) => (
                        <Link
                           to={t.to}
                           key={i}
                           style={url === t.to ? {
                              color: themeStore.currentTheme.textColor.color,
                              background: themeStore.currentTheme.btnsTheme.background
                           } : { color: themeStore.currentTheme.secondTextColor.color }}
                        >
                           {t.label}
                        </Link>
                     ))}
                  </div>
                  <div className={s.createpostbtndiv}>
                     <button
                        className={s.createpostbtn}
                        onClick={() => navigate('/main/create-post')}
                     >
                        <CreatePostIcon color={themeStore.currentTheme.textColor.color} />
                        <span style={themeStore.currentTheme.textColor}>Создать пост</span>
                     </button>
                     {ifSaved && <div className={s.youhave}>1 черновик</div>}
                  </div>
               </div>

               <Outlet />
            </div>
         </div>
      </div >
   )
})