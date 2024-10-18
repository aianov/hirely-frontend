import { profileStore } from '@/stores/profile-store/profile-store'
import { baseInstance } from '../base'
import { EditPrivacySettingsBody, EditProfileBody } from './types'

export const getProfile = async () => {
   const res = await baseInstance.get('/user/profile')
   const userApi = res.data.user
   const profileApi = {
      ...userApi,
      more: {
         ...userApi.more,
         p_lang: userApi.more.p_lang
      }
   }
   localStorage.setItem('user', JSON.stringify(profileApi))
   profileStore.setProfile(profileApi)
   return res
}

export const getProfileByUserId = async (userId: string) => await baseInstance.get(`/user/${userId}`)

export const getProfileByTag = async (tag: string) => await baseInstance.get(`/user/tag/get/${tag}`)

export const editProfile = async (body: Partial<EditProfileBody>) => await baseInstance.put('/user/profile', body)

export const getTag = async (tag: string) => (await baseInstance.get(`/user/tag/${tag}`)).data

export const editPrivacySettings = async (body: Partial<EditPrivacySettingsBody>) => baseInstance.put('/user/privacy', body)