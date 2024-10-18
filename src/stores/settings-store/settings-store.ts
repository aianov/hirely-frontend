import { editProfile, getProfile, getTag } from '@/shared/api/profile/api'
import { EditProfileBody } from '@/shared/api/profile/types'
import { defaultLogo } from '@/shared/utils/globalData'
import { convertToBackendLanguages } from '@/shared/utils/someFunctions'
import dayjs from 'dayjs'
import { action, makeAutoObservable, observable } from "mobx"
import { nanoid } from 'nanoid'
import { profileStore } from '../profile-store/profile-store'
import { GoalsErrT, GoalsT, ProfileSettingsErrT, ProfileSettingsT } from './types'

class SettingsStore {
   constructor() {
      makeAutoObservable(this, {
         goalsInEditMode: observable,
         updateGoals: action,
      })
   }

   // ========= HANDLERS ============
   submitEdit = async () => {
      this.validateData()
      if (Object.values(this.profileSettingsErr).some(t => t !== '')) return
      try {
         const data = this.profileSettings
         const body: EditProfileBody = {
            name: data.name,
            tag: data.tag.slice(1),
            more: {
               description: data.description,
               logo: data.logo + '',
               p_lang: convertToBackendLanguages(data.p_lang),
               who: data.who
            }
         }
         if (data?.hb) body.more.hb = dayjs(data.hb).toISOString()
         if (data.logo == '/src/assets/images/userlogo.jpg') delete body.more.logo
         // @ts-ignore
         if (data.tag.slice(1) == profileStore.profile.tag) delete body.tag
         const res = await editProfile(body)
         if (res.status == 200) {
            getProfile()
            this.callback = true
         }
      } catch (err) { console.log(err) }
   }

   // ========= FETCHES ============
   searchTag = async () => {
      if (!this.profileSettings.tag) return
      try {
         const res = await getTag(this.profileSettings.tag.slice(1))
         if (res.status == 400) this.profileSettingsErr.tagErr = 'Данный тег уже занят'
         this.tagLoading = false
      } catch (err) {
         console.log(err)
         this.tagLoading = false
      }
   }

   // ========= STATES ============
   callback = false
   tagLoading = false

   profileSettings: ProfileSettingsT = {
      logo: defaultLogo,
      description: '',
      name: '',
      tag: '',
      hb: '',
      p_lang: [],
      who: ''
   }

   profileSettingsErr: ProfileSettingsErrT = {
      logoErr: '',
      descriptionErr: '',
      nameErr: '',
      tagErr: '',
      hbErr: '',
      p_langErr: '',
      whoErr: ''
   }

   // ========= VALIDATE DATA ============
   validateData = () => {
      const data = this.profileSettings
      const err = this.profileSettingsErr
      if (data.name == '') err.nameErr = 'Укажите имя'
      else if (data.name.length < 3) err.nameErr = 'Минимальная длинна имени, 3 символа'

      if (data.tag == '') err.tagErr = 'Укажите тег'
      if (data.tag.length < 3 + 1) err.tagErr = 'Минимальная длинна тега, 3 символа' // because tag have "@"
   }

   clearAll = () => {
      this.profileSettings = {
         logo: profileStore?.profile?.more?.logo ? profileStore?.profile?.more?.logo : defaultLogo,
         description: profileStore?.profile?.more?.description,
         name: profileStore?.profile?.name,
         tag: "@" + profileStore?.profile?.tag,
         hb: profileStore?.profile?.more?.hb,
         p_lang: profileStore?.profile?.more?.p_lang,
         who: profileStore?.profile?.more?.who
      }
      Object.keys(this.profileSettingsErr).forEach((key) => {
         this.profileSettingsErr[key as keyof ProfileSettingsErrT] = ''
      })
   }

   // ========= OTHER MOVES ============
   setTagLoading = (is: boolean) => this.tagLoading = is
   setCallback = (call: boolean) => this.callback = call
   setProfileSettings = (settings: ProfileSettingsT) => this.profileSettings = settings

   // PLANS AND GOALS
   setIsPlanEditing = (is: boolean) => {
      const plans = profileStore.profile.more.plans
      if (is && plans.length > 0) {
         this.plansInEditMode = []
         this.plansInEditModeErr = []
         plans.forEach(p => {
            this.plansInEditMode.push(p)
            this.plansInEditModeErr.push('')
         })
      }
      this.isPlanEditing = is
   }
   setIsGoalEdition = (is: boolean) => {
      const goals = profileStore.profile.more.goals
      if (is && goals.length > 0) {
         this.goalsInEditMode = []
         this.goalsInEditModeErr = []
         for (let i = 0; i < goals.length; i++) {
            const goal = goals[i]
            const id = nanoid()
            this.goalsInEditMode.push({ to: goal.to, id: id, do: goal.do })
            this.goalsInEditModeErr.push({ toErr: '', doErr: '', id: id })
         }
      }
      this.isGoalEditing = is
   }

   // PLANS AND GOALS
   isPlanEditing = false
   isGoalEditing = false
   goalsInEditMode: GoalsT[] = []
   goalsInEditModeErr: GoalsErrT[] = []

   plansInEditMode: string[] = []
   plansInEditModeErr: string[] = []

   // =========================== ADD PLAN AND GOAL ==============================

   addNewGoal = () => {
      const goalId = nanoid()
      this.goalsInEditMode.push({ to: null, do: '', id: goalId })
      this.goalsInEditModeErr.push({ toErr: '', doErr: '', id: goalId })
   }
   addNewPlan = () => {
      this.plansInEditMode.push('')
      this.plansInEditModeErr.push('')
   }

   deleteGoal = (id: string) => {
      this.goalsInEditMode = this.goalsInEditMode.filter(t => t.id !== id)
      this.goalsInEditModeErr = this.goalsInEditModeErr.filter(t => t.id !== id)
   }
   deletePlan = (index: number) => {
      this.plansInEditMode = this.plansInEditMode.filter((_, i) => i !== index)
      this.plansInEditModeErr = this.plansInEditModeErr.filter((_, i) => i !== index)
   }

   clearGoals = () => {
      this.isGoalEditing = false
      this.goalsInEditMode = []
   }

   clearPlans = () => {
      this.isPlanEditing = false
      this.plansInEditMode = []
   }

   // ========= UPDATE STATE ============
   updateProfileSettingsData = (key: string, value: string | string[]) => {
      if (key == 'tag') this.tagLoading = true
      if (key == 'tag' && value == '') return
      this.profileSettings = {
         ...this.profileSettings,
         [key]: value
      }
      this.profileSettingsErr = {
         ...this.profileSettingsErr,
         [key + 'Err']: ''
      }
      this.validateData()
   }

   updateGoals = (key: string, value: string | string[] | null, index: number) => {
      this.goalsInEditMode[index] = {
         ...this.goalsInEditMode[index],
         [key]: value
      }
      this.goalsInEditModeErr[index] = {
         ...this.goalsInEditModeErr[index],
         [key + 'Err']: ''
      }
   }

   updatePlans = (index: number, value: string) => {
      this.plansInEditMode[index] = value
      this.plansInEditModeErr[index] = ''
   }

   // ========= PLANS GOALS FETCHES ============

   saveGoals = async () => {
      this.validateGoals()
      console.log(!this.goalsInEditModeErr.every(t => t.doErr === '' && t.toErr === ''))
      if (!this.goalsInEditModeErr.every(t => t.doErr === '' && t.toErr === '')) return
      try {
         const body: Partial<EditProfileBody> = {
            more: {
               goals: this.goalsInEditMode.map(t => ({
                  to: t.to,
                  do: t.do
               }))
            }
         }
         const res = await editProfile(body)
         if (res.data.id) {
            getProfile()
            this.setIsGoalEdition(false)
         }
      } catch (err) { console.log(err) }
   }

   savePlans = async () => {
      this.validatePlans()
      if (!this.plansInEditModeErr.every(t => t === '')) return
      try {
         const body: Partial<EditProfileBody> = {
            more: {
               plans: this.plansInEditMode
            }
         }
         const res = await editProfile(body)
         if (res.data.id) {
            getProfile()
            this.setIsPlanEditing(false)
         }
      } catch (err) { console.log(err) }
   }

   // ========= VALIDATE PLANS AND GOALS ============

   validateGoals = () => {
      for (let i = 0; i < this.goalsInEditMode.length; i++) {
         const goal = this.goalsInEditMode[i]
         if (!goal.do) this.goalsInEditModeErr[i].doErr = 'Опишите цель'
         else this.goalsInEditModeErr[i].doErr = ''

         if (!goal.to) this.goalsInEditModeErr[i].toErr = 'Выберите дату выполнения цели'
         else this.goalsInEditModeErr[i].toErr = ''
      }
   }

   validatePlans = () => {
      this.plansInEditMode.forEach((p, i) => {
         if (!p) this.plansInEditModeErr[i] = 'Опишите план'
         else this.plansInEditModeErr[i] = ''
      })
   }

   // ========================== MOBILE ASIDE ==============================

   isMobileAside = false

   setIsMobileAside = (is: boolean) => this.isMobileAside = is

   // ========================== BOTTOM PANEL ==============================

   isSide = false

   setIsSide = (is: boolean) => this.isSide = is

}

export const settingsStore = new SettingsStore()