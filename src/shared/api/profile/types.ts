import { PrivacyValues } from '@/stores/profile-store/types'

export interface EditProfileBody {
   name: string
   tag: string
   more: Partial<EditProfileBodyMore>
}

export interface EditProfileBodyMore {
   description: string
   plans: string[]
   status: string
   p_lang: string[]
   stack: string[]
   logo: string
   hb?: string
   who: string
   goals: { to: string | null; do: string }[]
}

export interface EditPrivacySettingsBody {
   "isHbView": PrivacyValues,
   "isFriendView": PrivacyValues,
   "isPhoneView": PrivacyValues,
   "isGoalView": PrivacyValues,
   "isPlanView": PrivacyValues,
   "isDescriptionView": PrivacyValues
}