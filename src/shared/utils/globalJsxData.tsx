import { NotifyIcon } from '@/assets/icons/MainPage/NavBar/NotifyIcon'
import { ModerationSettingsIcon } from '@/assets/icons/MainPage/Settings/ModerationSettingsIcon'
import { NotificationSettingsIcon } from '@/assets/icons/MainPage/Settings/NotificationSettingsIcon'
import { PrivacySettingsIcon } from '@/assets/icons/MainPage/Settings/PrivacySettingsIcon'
import { ProfileSettingsIcon } from '@/assets/icons/MainPage/Settings/ProfileSettingsIcon'
import { SessionsSettingsIcon } from '@/assets/icons/MainPage/Settings/SessionsSettingsIcon'
import { SubscriptionSettingsIcon } from '@/assets/icons/MainPage/Settings/SubscriptionSettingsIcon'
import { AssemblerIcon } from '@/assets/icons/ProfileStatuses/Assembler'
import { CIcon } from '@/assets/icons/ProfileStatuses/C'
import { CPlusPlusIcon } from '@/assets/icons/ProfileStatuses/CPlusPlus'
import { CSharpIcon } from '@/assets/icons/ProfileStatuses/CSharp'
import { DartIcon } from '@/assets/icons/ProfileStatuses/Dart'
import { GolangIcon } from '@/assets/icons/ProfileStatuses/Golang'
import { JavaIcon } from '@/assets/icons/ProfileStatuses/Java'
import { JsIcon } from '@/assets/icons/ProfileStatuses/JsIcon'
import { KotlinIcon } from '@/assets/icons/ProfileStatuses/Kotlin'
import { LuaIcon } from '@/assets/icons/ProfileStatuses/Lua'
import { PascalIcon } from '@/assets/icons/ProfileStatuses/Pascal'
import { PerlIcon } from '@/assets/icons/ProfileStatuses/Perl'
import { PhpIcon } from '@/assets/icons/ProfileStatuses/Php'
import { PythonIcon } from '@/assets/icons/ProfileStatuses/Python'
import { RubyIcon } from '@/assets/icons/ProfileStatuses/Ruby'
import { RustIcon } from '@/assets/icons/ProfileStatuses/Rust'
import { SwiftIcon } from '@/assets/icons/ProfileStatuses/Swift'
import { TsIcon } from '@/assets/icons/ProfileStatuses/TsIcon'
import { profileStore } from '@/stores/profile-store/profile-store'
import { ThemeT } from '@/stores/theme/types'
import { toJS } from 'mobx'
import { Fragment, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AboutusIcon } from '../../assets/icons/MainPage/Sidebar/AboutusIcon'
import { ChatIcon } from '../../assets/icons/MainPage/Sidebar/ChatIcon'
import { CooperationIcon } from '../../assets/icons/MainPage/Sidebar/CooperationIcon'
import { LeaderboardIcon } from '../../assets/icons/MainPage/Sidebar/LeaderboardIcon'
import { NewsIcon } from '../../assets/icons/MainPage/Sidebar/NewsIcon'
import { UserIcon } from '../../assets/icons/MainPage/Sidebar/UserIcon'
import { VacancyIcon } from '../../assets/icons/MainPage/Sidebar/VacancyIcon'
import { getProfileByTag } from '../api/profile/api'
import { NavBtnType } from './globalTypes'

export const getNavBtns = (type: 'mobile' | 'pc' = 'pc'): NavBtnType[] => {
   const url = useLocation().pathname
   if (type == 'pc') return [
      { text: "Вакансии", to: '/main/vacancy', allowUrls: [], icon: <VacancyIcon color={url === '/main/vacancy' ? 'white' : '#BABABA'} /> },
      { text: "Моя страница", to: '/main/my-profile', allowUrls: ['/main/my-profile/plans', '/main/my-profile/goals', '/main/create-post'], icon: <UserIcon color={['/main/my-profile/plans', '/main/my-profile', '/main/my-profile/goals', '/main/create-post'].includes(url) ? 'white' : '#BABABA'} /> },
      { text: "Чаты", to: '/main/chats', allowUrls: [], icon: <ChatIcon color={(url === '/main/chats' || url.includes('/main/chat')) ? 'white' : '#BABABA'} /> },
      { text: "О нас", to: '/main/about-us', allowUrls: [], icon: <AboutusIcon color={url === '/main/about-us' ? 'white' : '#BABABA'} /> },
      { text: "Сотрудничество", to: '/main/cooperation', allowUrls: [], icon: <CooperationIcon color={url === '/main/cooperation' ? 'white' : '#BABABA'} /> },
   ]

   return [
      { text: "Чаты", to: '/main/chats', allowUrls: [], icon: <ChatIcon color={(url === '/main/chats' || url.includes('/main/chat')) ? 'white' : '#BABABA'} /> },
      { text: "Уведомления", to: '/main/notifications', allowUrls: [], icon: <NotifyIcon size={25} color={url == '/main/notification' ? 'white' : '#BABABA'} /> },
      { text: "Моя страница", to: '/main/my-profile', allowUrls: ['/main/my-profile/plans', '/main/my-profile/goals', '/main/create-post'], icon: <UserIcon color={['/main/my-profile/plans', '/main/my-profile', '/main/my-profile/goals', '/main/create-post'].includes(url) ? 'white' : '#BABABA'} /> },
      { text: "Новости", to: '/main/news', allowUrls: [], icon: <NewsIcon color={url === '/main/vacancy' ? 'white' : '#BABABA'} /> },
      { text: "Вакансии", to: '/main/vacancy', allowUrls: [], icon: <VacancyIcon color={url === '/main/leaderboard' ? 'white' : '#BABABA'} /> },
      { text: "Таблица лидеров", to: '/main/leaderboard', allowUrls: [], icon: <LeaderboardIcon color={url === '/my-profile' ? 'white' : '#BABABA'} /> },
      { text: "О нас", to: '/main/about-us', allowUrls: [], icon: <AboutusIcon color={url === '/main/about-u' ? 'white' : '#BABABA'} /> },
      { text: "Сотрудничество", to: '/main/cooperation', allowUrls: [], icon: <CooperationIcon color={url === '/main/cooperation' ? 'white' : '#BABABA'} /> },
   ]
}

export const getProfileStatuses = (icon: string, size: number = 30) => {
   const iconData: Record<string, ReactNode> = {
      "TypeScript": <TsIcon size={size} />,
      "JavaScript": <JsIcon size={size} />,
      "Ruby": <RubyIcon size={size} />,
      "Python": <PythonIcon size={size} />,
      "Golang": <GolangIcon size={size} />,
      "C++": <CPlusPlusIcon size={size} />,
      "C": <CIcon size={size} />,
      "C#": <CSharpIcon size={size} />,
      "Java": <JavaIcon size={size} />,
      "Swift": <SwiftIcon size={size} />,
      "Php": <PhpIcon size={size} />,
      "Rust": <RustIcon size={size} />,
      "Lua": <LuaIcon size={size} />,
      "Perl": <PerlIcon size={size} />,
      "Assembler": <AssemblerIcon size={size} />,
      "Pascal": <PascalIcon size={size} />,
      "Dart": <DartIcon size={size} />,
      "Kotlin": <KotlinIcon size={size} />,

      "ts": <TsIcon size={size} />,
      "js": <JsIcon size={size} />,
      "rb": <RubyIcon size={size} />,
      "py": <PythonIcon size={size} />,
      "go": <GolangIcon size={size} />,
      "cpp": <CPlusPlusIcon size={size} />,
      "c": <CIcon size={size} />,
      "csharp": <CSharpIcon size={size} />,
      "java": <JavaIcon size={size} />,
      "swift": <SwiftIcon size={size} />,
      "php": <PhpIcon size={size} />,
      "rust": <RustIcon size={size} />,
      "lua": <LuaIcon size={size} />,
      "perl": <PerlIcon size={size} />,
      "assembler": <AssemblerIcon size={size} />,
      "pascal": <PascalIcon size={size} />,
      "dart": <DartIcon size={size} />,
      "kotlin": <KotlinIcon size={size} />
   }
   return iconData[icon]
}

interface UserLinkButtonProps {
   username: string
}

export const UserLinkButton = ({ username }: UserLinkButtonProps) => {
   const navigate = useNavigate()


   const handleUserCheck = async () => {
      try {
         const res = await getProfileByTag(username)
         if (!res.data.id) {
            profileStore.setSelectedNotFoundTag(`@${username}`)
            profileStore.setIsUserNotFound(true)
            return
         }
         navigate(`/main/profile/${username}`)
      } catch (err) { console.log }
   }

   return (
      <span
         onClick={handleUserCheck}
         className='text-link-to-user'
      >
         @{username}
      </span>
   )
}

export const parseCommentText = (text: string, id?: string, textColor = 'white') => {
   const words = text?.split(' ')
   const parsedElements: React.ReactNode[] = []

   words?.forEach((word, index) => {
      if (word?.startsWith('@')) {
         const username = word?.substring(1)?.replace(',', '')
         parsedElements?.push(
            <Fragment key={`user-${index}`}>
               <UserLinkButton username={username} />
            </Fragment>
         )
      } else parsedElements?.push(word)
      if (index < words?.length - 1) parsedElements?.push(' ')
   })

   return (
      <div
         className='df fww parsed-texts'
         style={{ color: textColor }}
         key={id ? id : text}
      >
         <span>{parsedElements}</span>
      </div>
   )
}

export const getThemePreview = (colors: ThemeT) => {
   colors = toJS(colors)
   colors = {
      ...colors,
      bgTheme: {
         ...colors.bgTheme,
         borderRadius: '5px'
      }
   }
   return (
      <div className='theme-preview'>
         <div className='theme-preview-top' style={colors?.bgTheme}>
            <div className='theme-preview-icon' style={colors?.btnsTheme}></div>
         </div>

         <div className='theme-preview-bot'>
            <div className='theme-preview-bot-left' style={colors?.bgTheme}>
               <div className='theme-preview-bot-left-bot'>
                  <div className='theme-preview-leave' style={colors?.btnsTheme}></div>
                  <div className='theme-preview-settings' style={colors?.btnsTheme}></div>
               </div>
            </div>

            <div className='theme-preview-bot-mid'>
               <div className='theme-preview-bot-mid-top' style={colors?.bgTheme}></div>
               <div className='theme-preview-bot-mid-bot' style={colors?.bgTheme}>
                  <p style={colors?.textColor}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora rerum itaque voluptatum id.</p>
                  <p style={colors?.secondTextColor}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, pariatur accusamus. Iure dignissimos sint eum, nihil enim voluptates delectus, iste, a sit vel in rerum eius officiis accusamus placeat. Fugit?</p>
               </div>
            </div>

            <div className='theme-preview-bot-right'>
               <div className='theme-preview-bot-right-top' style={colors?.bgTheme}></div>
               <div className='theme-preview-bot-right-bot' style={colors?.bgTheme}></div>
            </div>
         </div>
      </div>
   )
}

export const settingsButtons = [
   { text: 'Профиль', url: '/main/settings', icon: <ProfileSettingsIcon /> },
   { text: 'Конфиденциальность', url: '/main/settings/privacy', icon: <PrivacySettingsIcon /> },
   { text: 'Уведомления', url: '/main/settings/notifications', icon: <NotificationSettingsIcon /> },
   { text: 'Цели | Планы', url: '/main/settings/goals-plans', icon: <NotificationSettingsIcon /> },
   { text: 'Подписка', url: '/main/settings/subscription', icon: <SubscriptionSettingsIcon /> },
   { text: 'Кастомизация', url: '/main/settings/customization', icon: <NotificationSettingsIcon /> },
   { text: 'Активные сеансы', url: '/main/settings/sessions', icon: <SessionsSettingsIcon /> },
   { text: 'Модерация', url: '/main/settings/moderation', icon: <ModerationSettingsIcon /> },
]