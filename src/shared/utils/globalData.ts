import { ThemeListT } from '@/stores/theme/types'
import { Item } from './globalTypes'
// @ts-ignore
import defaultlogo from '@images/userlogo.jpg'

export const selectPostTags: Item[] = [
   { key: '2', label: "IT" },
   { key: '3', label: "Саморазвитие" },
   { key: '4', label: "Образование" },
   { key: '5', label: "История" },
   { key: '6', label: "Новости" },
   { key: '7', label: "Бизнес" },
   { key: '8', label: "Комедия" },
   { key: '9', label: "Блог" },
   { key: '10', label: "Аниме" },
   { key: '11', label: "Игры" },
   { key: '12', label: "Спорт" },
]

export const selectPlangs: Item[] = [
   { key: '1', label: "Python" },
   { key: '2', label: "JavaScript" },
   { key: '3', label: "TypeScript" },
   { key: '4', label: "Golang" },
   { key: '5', label: "Ruby" },
   { key: '6', label: "C#" },
   { key: '7', label: "C++" },
   { key: '8', label: "C" },
   { key: '9', label: "Java" },
   { key: '10', label: "Php" },
   { key: '11', label: "Swift" },
   { key: '12', label: "Rust" },
   { key: '13', label: "Lua" },
   { key: '14', label: "Perl" },
   { key: '15', label: "Assembler" },
   { key: '16', label: "Pascal" },
   { key: '17', label: "Dart" },
   { key: '18', label: "Kotlin" },
]

export const selectPostFrom: Item[] = [
   { key: '1', label: "В рекомендациях" },
   { key: '2', label: "От друзей" },
   { key: '3', label: "Старые публикации" },
   { key: '4', label: "Новые публикации" },
   { key: '5', label: "В подписках" }
]

export const selectPersonality: Item[] = [
   { key: '1', label: "Самурай" },
   { key: '2', label: "Бизнесмэн" },
   { key: '3', label: "Инвестор" },
   { key: '4', label: "Ноу-нейм" },
   { key: '5', label: "Новичок" },
   { key: '6', label: "Аниме" },
   { key: '7', label: "Сигма" },
   { key: '8', label: "Спортсмен" },
   { key: '10', label: "Соло" },
   { key: '11', label: "Programmer" },
   { key: '12', label: "Founder" },
   { key: '13', label: "Frontend" },
   { key: '14', label: "Backend" },
   { key: '15', label: "Fullstack" },
   { key: '16', label: "DevOps" },
   { key: '17', label: "GameDev" },
   { key: '18', label: "DataScientist" },
   { key: '19', label: "Hacker" },
   { key: '20', label: "CyberSecurity" },
   { key: '21', label: "Ux/Ui" },
   { key: '22', label: "Designer" },
   { key: '23', label: "QA" },
   { key: '24', label: "PM" },
   { key: '25', label: "SEO" },
]


export const defaultLogo = defaultlogo

export const toolOptions = {
   options: ['inline', 'list', 'textAlign', 'emoji', 'link', 'colorPicker'],
   inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough'],
   },
   list: {
      options: ['unordered'],
   },
   textAlign: {
      options: ['left', 'center'],
   },
}

export const allTags = ["IT", "Саморазвитие", "Образование", "История", "Новости", "Бизнес", "Комедия", "Блог", "Аниме", "Игры", "Спорт"]

export const privacySettingsSelector: Item[] = [
   { key: '1', label: 'Все' },
   { key: '2', label: 'Только друзья' },
   { key: '3', label: 'Никто' }
]

export const NavBtnsMyProfile = [
   { to: '/main/my-profile', label: 'Мои посты' },
   { to: '/main/my-profile/goals', label: 'Мои цели' },
   { to: '/main/my-profile/plans', label: 'Мои планы' }
]

export const genderSelectData: Item[] = [
   { key: '1', label: 'Мужчина' },
   { key: '2', label: 'Женщина' },
]

export const globalThemesList: ThemeListT[] = [
   {
      colors: {
         bgTheme: {
            background: 'rgba(0, 0, 0, 0.56)',
            border: '1px solid rgb(83, 83, 83)',
            borderRadius: '20px'
         },
         btnsTheme: { background: 'rgba(50, 50, 50, 0.66)' },
         textColor: { color: 'rgba(255, 255, 255, 1)' },
         secondTextColor: { color: 'rgba(186, 186, 186, 1)' },
         myCommentBgTheme: { background: 'rgba(38, 38, 38, 0.66)' },
      },
      title: 'Тёмная',
      isPremium: false
   },
   {
      colors: {
         bgTheme: {
            background: "rgba(39, 39, 39, 1)",
            border: '1px solid rgb(83, 83, 83)',
            borderRadius: '20px'
         },
         btnsTheme: {
            background: "rgba(24, 24, 24, 1)",
         },
         textColor: {
            color: 'rgba(255, 255, 255, 1)',
         },
         secondTextColor: {
            color: 'rgba(186, 186, 186, 1)',
         },
         myCommentBgTheme: {
            background: 'rgb(53, 53, 53)'
         }
      },
      title: 'Сакура',
      isPremium: false
   },
]

export const orangeBtnBgColor = '#ff4d00'

export const settings = {
   dots: true,
   infinite: false,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1
}