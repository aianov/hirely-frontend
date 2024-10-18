export interface User {
   createdAt: string
   phone: string
   id: string
   isPremium: boolean
   friendStatus: FriendStatus,
   gender: 'none' | 'male' | 'female'

   isPhoneView: PrivacyValues,
   isFriendView: PrivacyValues,
   isGoalView: PrivacyValues,
   isHbView: PrivacyValues,
   isPlanView: PrivacyValues,
   isDescriptionView: PrivacyValues,
   isFriendChat: boolean

   more: {
      description: string
      friends: number
      hb: string
      friendRequestsCount: number
      id: string
      level: number
      logo: string
      p_lang: string[]
      plans: string[]
      posts_count: number
      rating: number
      stack: string[]
      status: string
      streak: number
      subscribers: number
      who: string
      goals: { to: string, do: string, createdAt: string, updatedAt: string }[]
   }

   requestId: string | null
   moreId: string
   name: string
   tag: string
   updatedAt: string
}

export type PrivacyKeys = 'isPhoneView' | 'isFriendView' | 'isGoalView' | 'isHbView' | 'isPlanView' | 'isDescriptionView'
export type PrivacyValues = 'all' | 'friends' | 'none' | 'Все' | 'Только друзья' | 'Никто'
export type FriendStatus = 'friend' | 'notfriend' | 'pending'

export interface UserFromTg {
   auth_date: number
   first_name: string
   hash: string
   id: number
   photo_url: string
   username: string
}