import { GenderIcon } from '@/assets/icons/MainPage/MyProfile/GenderIcon'
import { NotFoundIcon } from '@/assets/icons/Ui/NotFoundIcon'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import { getProfileStatuses } from '@/shared/utils/globalJsxData'
import { getUserDataByPrivacy } from '@/shared/utils/someFunctions'
import { genderValuesTranslationToRus } from '@/shared/utils/translations'
import { chatApitStore } from '@/stores/api/chat-store/chat-store'
import { chatStore } from '@/stores/chat-store/chat-store'
import { subscribersStore } from '@/stores/subscribers-store/subscribers-store'
import { themeStore } from '@/stores/theme/theme-store'
import { BdIcon } from '@assets/icons/MainPage/MyProfile/BdIcon'
import { EmailIcon } from '@assets/icons/SignPageIcons/EmailIcon'
import { getProfileByTag } from '@shared/api/profile/api'
import { defaultLogo } from '@shared/utils/globalData'
import { socialNumberFormat } from '@shared/utils/parsers'
import { profileStore } from '@stores/profile-store/profile-store'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import s from '../MyProfile/MyProfile.module.scss'

export const Profile = observer(() => {
   const { currentTheme } = themeStore
   const { profile, user, setUser } = profileStore
   const { createChatAction } = chatApitStore
   const { setSelectedChatId } = chatStore

   const [status, setStatus] = useState(user?.friendStatus)
   const url = useLocation().pathname
   const navigate = useNavigate()
   const { tag } = useParams()

   const { setSubOpen } = subscribersStore

   const NavBtnsProfile = [
      { to: `/main/profile/${tag}`, label: 'Посты' },
      { to: `/main/profile/${tag}/goals`, label: 'Цели' },
      { to: `/main/profile/${tag}/plans`, label: 'Планы' }
   ]

   const getProfileByUserIdHandler = useCallback(async () => {
      if (!tag) return
      try {
         const user = (await getProfileByTag(tag)).data
         localStorage.setItem('selected-user', JSON.stringify(user))
         setUser(user)
         setStatus(user.friendStatus)
      }
      catch (err) { console.log }
   }, [tag])

   useEffect(() => {
      localStorage.setItem('last-route', url)
      if (tag === profile.tag) navigate('/main/my-profile')
      getProfileByUserIdHandler()
   }, [])

   const sendMessageHandler = useCallback(async () => {
      const chatId = await createChatAction()
      if (!chatId) return
      setSelectedChatId(chatId)
      navigate(`/main/chat/${chatId}`)
   }, [createChatAction])

   if (!user?.id) return (
      <div className={s.notfounduser}>
         <NotFoundIcon />
         <p>Такого пользователя не существует</p>
      </div>
   )

   return (
      <div className={s.main}>
         {tag && user ? (
            <div className={s.profilecontainer}>
               <div className={s.top}>
                  <div className={s.left}>

                     {/* profile */}
                     <div className={s.leftcontainer}>
                        <div className={s.avatardiv}>
                           <img src={user?.more?.logo ? user?.more?.logo : defaultLogo} alt="Profile-logo" />
                        </div>
                        <span className={s.name}>{user?.name}</span>
                        <span className={s.tag}>@{user?.tag}</span>
                        <div className={s.more}>
                           <div className={s.who}>{user?.more?.who ? user?.more?.who : 'Самурай'}</div>
                           {getProfileStatuses(user?.more?.p_lang[0], 23)}
                        </div>
                     </div>
                  </div>

                  {/* description */}
                  <div className={s.right}>
                     <div className={s.top}>
                        <span>Описание:</span>
                     </div>
                     {user?.isDescriptionView == 'all' ? (user?.more?.description ? (<p className={s.description}>{user?.more?.description}</p>) : (
                        <div className={s.nothave}>
                           <NotFoundIcon />
                           <p>{user.name} не указал описание</p>
                        </div>
                     ))
                        : user?.isDescriptionView == 'none' ? (
                           <div className={s.nothave}>
                              <NotFoundIcon />
                              <p>{user.name} скрыл описание</p>
                           </div>
                        )
                           : (user?.isDescriptionView == 'friends' && (user?.friendStatus != 'friend')) ? (
                              <div className={s.nothave}>
                                 <NotFoundIcon />
                                 <p>{user.name} показывает описание только друзьям</p>
                              </div>
                           )
                              : (user?.isDescriptionView == 'friends' && user?.friendStatus == 'friend') && (user?.more?.description ? (<p className={s.description}>{user?.more?.description}</p>) : (
                                 <div className={s.nothave}>
                                    <NotFoundIcon />
                                    <p>{user.name} не указал описание</p>
                                 </div>
                              ))}
                  </div>
               </div>

               {/* info */}
               <div className={s.bottom}>
                  <div className={s.top}>
                     <div className={s.nav}>
                        <span>Информация:</span>
                     </div>
                     <div className={s.about}>
                        <div className={s.bd}>
                           <BdIcon />
                           <span>День рождения: {getUserDataByPrivacy(user?.isHbView, user?.friendStatus, dateFormatter(user?.more?.hb, 'DD.MM.YYYY'))}</span>
                        </div>
                        <div className={s.email}>
                           <EmailIcon width={15} height={15} />
                           <span>Номер телефона: {getUserDataByPrivacy(user?.isPhoneView, user?.friendStatus, user?.phone)}</span>
                        </div>
                        <div className={s.gender}>
                           <GenderIcon size={15} />
                           <span>Пол: {genderValuesTranslationToRus(user?.gender)}</span>
                        </div>
                        <div className={s.email}>
                           <span>Дата регистрации: {dateFormatter(user?.createdAt, 'DD.MM.YYYY')}</span>
                        </div>
                     </div>
                  </div>
                  <div className={s.mid}>
                     <div className={s.midleft}>
                        <button
                           className={s.infodiv}
                        >
                           <span>{socialNumberFormat(user?.more?.friends)}</span>
                           <span>друзей</span>
                        </button>

                        <button
                           className={s.infodiv}
                           onClick={() => setSubOpen(true)}
                        >
                           <span>{socialNumberFormat(user?.more?.friendRequestsCount)}</span>
                           <span>подписчиков</span>
                        </button>

                        <div className={s.infodiv}>
                           <span>{socialNumberFormat(user?.more?.posts_count)}</span>
                           <span>постов</span>
                        </div>
                     </div>
                     <div className={s.midmid}>
                        <div className={s.infodiv}>
                           <span>{socialNumberFormat(user?.more?.goals?.length)}</span>
                           <span>целей</span>
                        </div>
                        <div className={s.infodiv}>
                           <span>{socialNumberFormat(user?.more?.plans?.length)}</span>
                           <span>планов</span>
                        </div>
                     </div>
                     <div className={s.midright}>
                        <div className={s.infodiv}>
                           <span className={s.rate}>{socialNumberFormat(user?.more?.rating)}</span>
                           <span className={s.rate}>рейтинг</span>
                        </div>
                     </div>
                  </div>
                  <div className={s.bot}>
                     <div className={s.left}>
                        <div className={s.nav}>
                           <span>Любимые языки:</span>
                        </div>
                        <div className={s.plang}>
                           {user?.more?.p_lang?.length == 0 ? (
                              <span>Не указано</span>
                           ) : user?.more?.p_lang?.map((t, i) => (
                              <div className={s.icon} key={i}>
                                 {getProfileStatuses(t, 37.5)}
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className={s.right}>
                        <div className={s.nav}>
                           <span>Профессия:</span>
                        </div>
                        <div className={s.whodiv}>
                           <div className={s.who}>{user?.more?.who ? user?.more?.who : 'Самурай'}</div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* ВЫБОР ПОСТОВ ПЛАНОВ И ТД */}
               <div className={s.content}>
                  <div className={s.bar}>
                     <div className={s.scroll}>
                        {NavBtnsProfile.map((t, i) => (
                           <Link
                              to={t.to}
                              key={i}
                              style={url === t.to ? { color: 'white', background: '#111111' } : {}}
                           >
                              {t.label}
                           </Link>
                        ))}
                     </div>
                  </div>

                  <Outlet />
               </div>
            </div>
         ) : (
            <div>Профиль не найден</div>
         )}
      </div>
   )
})