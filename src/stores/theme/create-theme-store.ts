import { createTheme, deleteTheme, editTheme, getTheme, getThemeById } from '@/shared/api/theme/api'
import { CreateThemeBody, EditThemeBody, GetThemeListResponse } from '@/shared/api/theme/types'
import { makeAutoObservable, toJS } from "mobx"
import { themeStore } from './theme-store'
import { EditThemeObjT, ThemeT } from './types'

class CreateThemeStore {
   constructor() { makeAutoObservable(this) }

   // =========================== CREATING THEME ==============================

   isCreatingTheme = false
   getThemesList: GetThemeListResponse[] = []
   selectedThemeId: string | null = null

   createThemeObj = {
      name: ''
   }

   createThemeObjErr = {
      nameErr: ''
   }

   setSelectedThemeId = (themeId: string) => this.selectedThemeId = themeId
   setIsCreatingTheme = (is: boolean) => this.isCreatingTheme = is
   updateInput = (key: string, value: string) => {
      this.createThemeObj = {
         ...this.createThemeObj,
         [key]: value
      }
      this.createThemeObjErr = {
         ...this.createThemeObjErr,
         [key + 'Err']: ''
      }
   }

   validateData = () => {
      const inp = this.createThemeObj
      const err = this.createThemeObjErr
      if (inp.name == '') err.nameErr = 'Введите название темы'
      else err.nameErr = ''
   }

   createThemeAction = async () => {
      this.validateData()
      if (this.createThemeObjErr.nameErr != '') return
      try {
         const body: CreateThemeBody = {
            name: this.createThemeObj.name,
            theme: themeStore.currentTheme
         }
         console.log(themeStore.currentTheme)
         const res = await createTheme(body)
         console.log(res)
         if (res.data) {
            this.setIsCreatingTheme(false)
            this.getThemeAction()
         }
      } catch (err) { console.log(err) }
   }

   // ========================== FETCHES ==============================

   getThemeAction = async () => {
      try {
         const res = await getTheme()
         this.getThemesList = res.data
      } catch (err) { console.log(err) }
   }

   deleteThemeAction = async () => {
      try {
         if (!this.selectedThemeId) return
         const res = await deleteTheme(this.selectedThemeId)
         if (res.data) {
            this.getThemeAction()
            this.setIsDeletingTheme(false)
         }
      } catch (err) { console.log(err) }
   }

   editThemeAction = async () => {
      this.validateEditThemObj()
      if (this.createThemeObjErr.nameErr || !this.selectedThemeId) return
      try {
         const body: EditThemeBody = {
            name: this.editThemeObj.name,
            theme: toJS(themeStore.currentThemeObj!)
         }
         const res = await editTheme(this.selectedThemeId, body)
         if (res.data) {
            this.getThemeAction()
            this.setIsEditingTheme(false)
         }
      } catch (err) { console.log(err) }
   }

   getThemeByIdAction = async (themeId: string) => {
      try {
         const res = await getThemeById(themeId)
         console.log(res)
         if (res.data) {
            this.themeForView = res.data
         }
      } catch (err) { console.log(err) }
   }

   // =========================== DELETE THEME ==============================

   currentThemeObj: ThemeT | null = null
   currentThemeName: string | null = localStorage.getItem('selected-theme-name') ? localStorage.getItem('selected-theme-name')! : null
   isDeletingTheme = false

   setIsDeletingTheme = (is: boolean) => this.isDeletingTheme = is

   setCurrentThemeName = (theme: GetThemeListResponse) => {
      localStorage.setItem('selected-theme-name', theme.name)
      this.currentThemeName = theme.name
      this.currentThemeObj = theme.theme
      this.setSelectedThemeId(theme.id)
   }

   // =========================== EDIT THEME ==============================

   isEditingTheme = false
   editThemeObj: EditThemeObjT = {
      name: '',
   }
   editThemeObjErr: { nameErr: string } = {
      nameErr: ''
   }
   selectedThemeObj: ThemeT | null = null

   setSelectedThemeObj = (theme: ThemeT) => this.selectedThemeObj = theme
   setIsEditingTheme = (is: boolean) => this.isEditingTheme = is

   updateEditThemeObj = (key: string, value: string) => {
      this.editThemeObj = {
         ...this.editThemeObj,
         [key]: value
      }
      this.editThemeObjErr = {
         ...this.editThemeObjErr,
         [key + 'Err']: ''
      }
   }

   validateEditThemObj = () => {
      const name = this.editThemeObj.name
      const err = this.editThemeObjErr
      if (!name) err.nameErr = 'Введите название темы'
      else if (name.length >= 32) err.nameErr = 'Максимальная длина названия темы 32 символа'
      else if (name.length < 3) err.nameErr = 'Минимальная длина названия темы 3 символа'
      else err.nameErr = ''
   }

   // =========================== SHARE THEME ==============================

   isSharingTheme = false

   setIsSharingTheme = (is: boolean) => this.isSharingTheme = is

   // =========================== VIEW THEME ==============================

   themeForView: null | GetThemeListResponse = null
   isThemeViewing = false

   setIsThemeViewing = (is: boolean) => this.isThemeViewing = is

}

export const createThemeStore = new CreateThemeStore()