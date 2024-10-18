import { editPrivacySettings } from '@/shared/api/profile/api'
import { EditPrivacySettingsBody } from '@/shared/api/profile/types'
import { privacyValuesTranslationToEng } from '@/shared/utils/translations'
import { makeAutoObservable } from "mobx"
import { mobxState } from 'mobx-toolbox'
import { authLogout } from '../../shared/api/auth/api'
import { PrivacyKeys, PrivacyValues, User, UserFromTg } from './types'

class ProfileStore {
   constructor() { makeAutoObservable(this) }

   profileFromTg = mobxState<UserFromTg>(localStorage.getItem("profilefromtg") ? JSON.parse(localStorage.getItem("profilefromtg")!) : null)('profileFromTg')

   // selected-user
   user: User = localStorage.getItem("selected-user") ? JSON.parse(localStorage.getItem("selected-user")!) : null

   // our profile
   profile: User = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null

   // for user not found
   selectedNotFoundTag = ''
   isUserNotFound = false

   // ========= FETCHES ============

   // LOGOUT
   logoutAction = async () => {
      try {
         const res = await authLogout()
         if (res?.status == 200) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
            window.location.href = '/sign-in'
         }
         return res
      } catch (err) { console.log }
   }

   setPrivacyAction = async (key: PrivacyKeys, value: PrivacyValues) => {
      this.profile[key] = value
      try {
         const obj: Partial<EditPrivacySettingsBody> = {}; obj[key] = privacyValuesTranslationToEng(value) as PrivacyValues
         await editPrivacySettings(obj)
      } catch (err) { console.log(err) }
   }

   // ========= OTHER MOVES ============
   setUser = (user: User) => { if (user) this.user = user }
   setProfile = (profile: User) => { if (profile) this.profile = profile }
   setSelectedNotFoundTag = (tag: string) => this.selectedNotFoundTag = tag
   setIsUserNotFound = (is: boolean) => this.isUserNotFound = is
}

export const profileStore = new ProfileStore()