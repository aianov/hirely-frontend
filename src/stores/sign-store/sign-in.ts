
import { makeAutoObservable } from "mobx"
import { SignInBody } from '../../shared/api/auth/types'
import { numberRegex, passwordRegex } from '../../shared/utils/regex.ts'
import { authApiStore } from '../api/auth/auth-store'

class SignInStore {
   constructor() { makeAutoObservable(this) }

   // ========= FETCH ============

   submitData = async () => {
      this.setIsSubmiting(true)
      this.validateData()
      if (Object.values(this.inpDataErr).some(i => i !== '')) {
         this.setIsSubmiting(false)
         return
      }
      const body: SignInBody = {
         number: this.inpData.number.replace('+', '').trim(),
         password: this.inpData.password
      }
      const res = await authApiStore.signInAction(body)
      if (res?.response?.data?.message === "Invalid password") this.setAnotherErr("Неправильный пароль")
      if (res?.response?.data?.message === "User not found") this.setAnotherErr("Пользователя не существует")
      this.setIsSubmiting(false)
   }

   // ========= validate data ============

   validateData = () => {
      const inp = this.inpData
      const err = this.inpDataErr

      if (inp.number == '') err.numberErr = 'Номер не может быть пустым'
      else if (inp.number.length < 6) err.numberErr = 'Номер не может быть таким коротким'
      else if (!numberRegex.test(inp.number)) err.numberErr = 'Номер некорректен'

      if (inp.password == '') err.passwordErr = 'Пароль не мог быть пустым'
      else if (inp.password.length < 6) err.passwordErr = 'Пароль не мог быть короче 6 символов'
      else if (!passwordRegex.test(inp.password)) err.passwordErr = 'Пароль дожен содержать лат.буквы цифры или +-!$%^&*()_'
   }

   // ========= states ============

   isSubmiting = false
   anotherErr = ''

   inpData = {
      number: '',
      password: ''
   }

   inpDataErr = {
      numberErr: '',
      passwordErr: '',
   }

   updateData = (key: string, value: string) => {
      this.inpData = { ...this.inpData, [key]: value }
      this.inpDataErr = { ...this.inpDataErr, [key + 'Err']: "" }
      this.setAnotherErr("")
   }

   // ========= OTHER FUNCTNS ============

   setIsSubmiting = (is: boolean) => this.isSubmiting = is
   setAnotherErr = (err: string) => this.anotherErr = err
}

export const signInStore = new SignInStore()