import { PostsFrom, PostsFromRu, PostsTags, PostsTagsRu } from '../../stores/api/posts/types'

export const PostTagTranslation: Record<PostsTags | PostsTagsRu, PostsTags | PostsTagsRu> = {
   all: "Всё",
   it: "IT",
   self_improve: "Саморазвитие",
   learning: "Образование",
   history: "История",
   news: "Новости",
   business: "Бизнес",
   other: "Прочее",

   "Всё": "all",
   "IT": "it",
   "Саморазвитие": "self_improve",
   "Образование": "learning",
   "История": "history",
   "Новости": "news",
   "Бизнес": "business",
   "Прочее": "other"
}

export const PostFromTranslation: Record<PostsFrom | PostsFromRu, PostsFrom | PostsFromRu> = {
   trend: "В рекомендациях",
   friends: "От друзей",
   old: "Старые публикации",
   new: "Новые публикации",
   sub: "В подписках",

   "В рекомендациях": "trend",
   "От друзей": "friends",
   "Старые публикации": "old",
   "Новые публикации": "new",
   "В подписках": "sub"
}

export const postTagTranslation: Record<string, string> = {
   "all": "Всё",
   "it": "IT",
   "self_improve": "Саморазвитие",
   "learning": "Образование",
   "history": "История",
   "business": "Бизнес",
   "news": "Новости",
   "blog": "Блог",
   "anime": "Аниме",
   "game": "Игры",
   "sport": "Спорт",
   "comedia": "Комедия"
}

export const postTagTranslationParse = (str: string) => postTagTranslation[str] || str

const dictionary: Record<string, string> = {
   "Всё": "all",
   "IT": "it",
   "Саморазвитие": "self_improve",
   "Образование": "learning",
   "История": "history",
   "Бизнес": "business",
   "Новости": "news",
   "Блог": "blog",
   "Аниме": "anime",
   "Игры": "game",
   "Спорт": "sport",
   "Комедия": "comedia",

   "all": "Всё",
   "it": "IT",
   "self_improve": "Саморазвитие",
   "learning": "Образование",
   "history": "История",
   "business": "Бизнес",
   "news": "Новости",
   "blog": "Блог",
   "anime": "Аниме",
   "game": "Игры",
   "sport": "Спорт",
   "comedia": "Комедия"
}

export const postTagsTranslation = (input: string[]): string[] => {
   const res = input.map(word => {
      const translatedWord = dictionary[word]
      return translatedWord ? translatedWord : word
   })
   return res
}

export const postFromTranslation = (str: string): PostsFrom | PostsFromRu => PostFromTranslation[str as PostsFrom | PostsFromRu] || str

export const privacyValuesTranslationToRus = (value: string) => {
   const privacyEngValues: Record<string, string> = {
      'all': 'Все',
      'friends': 'Только друзья',
      'none': 'Никто'
   }
   if (privacyEngValues[value]) return privacyEngValues[value]
   else return value
}

export const privacyValuesTranslationToEng = (value: string) => {
   const privacyRusValues: Record<string, string> = {
      'Все': 'all',
      'Только друзья': 'friends',
      'Никто': 'none'
   }
   if (privacyRusValues[value]) return privacyRusValues[value]
   else return value
}

export const genderValuesTranslationToEng = (value: string) => {
   const genderValues: Record<string, string> = {
      'Не указывать': 'none',
      'Мужчина': 'male',
      'Женщина': 'female'
   }
   if (genderValues[value]) return genderValues[value]
   else return value
}

export const genderValuesTranslationToRus = (value: string) => {
   const genderValues: Record<string, string> = {
      'none': 'Не указано',
      'male': 'Мужчина',
      'female': 'Женщина'
   }
   if (genderValues[value]) return genderValues[value]
   else return value
}