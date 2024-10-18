import { FriendStatus, PrivacyValues } from '@/stores/profile-store/types'
// @ts-ignore
import notifySound from '@assets/sounds/notify.mp3'
import dayjs, { Dayjs } from 'dayjs'
import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js'
import WarningUi from '../ui/WarningUi'

export const unauthErrNotify = (message: string) => {
   return WarningUi({
      time: 5000,
      type: "error",
      text: message,
      position: "top-right"
   })
}

export const createEditorStateFromRaw = (rawData: RawDraftContentState) => {
   const contentState = convertFromRaw(rawData)
   return EditorState.createWithContent(contentState)
}

export const formatDefaultDate = (dateString: string | Dayjs, format: string): string => {
   let date: Dayjs
   if (typeof dateString === 'string') date = dayjs(dateString)
   else date = dateString
   return date.format(format)
}

export const formatDate = (dateString: string, type: 'default' | 'time' | 'date' = 'default', isEdited = false) => {
   const date = dayjs(dateString)
   const now = dayjs()

   if (date.isSame(now, 'day')) return `Сегодня в ${date.format('HH:mm')}`
   if (date.isSame(now.subtract(1, 'day'), 'day')) return `Вчера в ${date.format('HH:mm')}`
   if (type == 'default') return date.format('HH:mm DD MMMM YYYY')
   if (type == 'time') return date.format('HH:mm')
   if (type == 'date') return date.format('DD MMMM YYYY')
}

const languageCodes: Record<string, string> = {
   "TypeScript": "ts",
   "JavaScript": "js",
   "Python": "py",
   "Golang": "go",
   "Ruby": "rb",
   "C++": "cpp",
   "C": "c",
   "C#": "csharp",
   "Java": "java",
   "Swift": "swift",
   "Php": "php",
   "Rust": "rust",
   "Lua": "lua",
   "Perl": "perl",
   "Assembler": "assembler",
   "Pascal": "pascal",
   "Dart": "dart",
   "Kotlin": "kotlin",

   "ts": "TypeScript",
   "js": "JavaScript",
   "py": "Python",
   "go": "Golang",
   "rb": "Ruby",
   "cpp": "C++",
   "c": "C",
   "csharp": "C#",
   "java": "Java",
   "swift": "Swift",
   "php": "Php",
   "rust": "Rust",
   "lua": "Lua",
   "perl": "Perl",
   "assembler": "Assembler",
   "pascal": "Pascal",
   "dart": "Dart",
   "kotlin": "Kotlin"
}

export const getPLangFromText = (languages: string[]) => {
   return languages.map((language: string) => languageCodes[language] || "")
}

const languageBackCodes: Record<string, string> = {
   "TypeScript": "ts",
   "JavaScript": "js",
   "Python": "py",
   "Golang": "go",
   "Ruby": "rb",
   "C++": "cpp",
   "C": "c",
   "C#": "csharp",
   "Java": "java",
   "Swift": "swift",
   "Php": "php",
   "Rust": "rust",
   "Lua": "lua",
   "Perl": "perl",
   "Assembler": "assembler",
   "Pascal": "pascal",
   "Dart": "dart",
   "Kotlin": "kotlin"
}

export const convertToBackendLanguages = (languages: string[]): string[] => {
   return languages.map(lang => languageBackCodes[lang] || lang)
}

export const getSubtitleOfPrivacy = (privacy: PrivacyValues, title: string) => {
   console.log(privacy)
   if (privacy == 'all' || privacy == 'Все') return `Все - ${title} видят все`
   if (privacy == 'friends' || privacy == 'Только друзья') return `Только друзья - ${title} видят только друзья`
   if (privacy == 'none' || privacy == 'Никто') return `Никто - ${title} никто не видит`
}

export const handleCopy = (text: string) => navigator.clipboard.writeText(text).catch(err => console.error('Failed to copy text: ', err))

export const isMobile = () => {
   return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.innerWidth <= 1200 ||
      'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const spawnNotifySound = () => {
   const audio = new Audio(notifySound)
   audio.play()
}

export const getUserDataByPrivacy = (view: PrivacyValues, friendStatus: FriendStatus, dataForView: string) => {
   const res = dataForView ? dataForView : 'Не указано'
   if (view == 'all') return res
   if (view == 'none' || (view == 'friends' && friendStatus == 'pending')) return 'Скрыто'

   if (friendStatus == 'friend') return res
   if (friendStatus == 'notfriend') return 'Скрыто для друзей'
}

export const handleDownload = (url: string, fileName: string) => {
   const link = document.createElement('a')
   // link.href = post.images[0]
   link.href = url
   link.download = fileName
   // link.download = `${post?.author?.name}-post`
   document.body.appendChild(link)
   link.click()
   document.body.removeChild(link)
}