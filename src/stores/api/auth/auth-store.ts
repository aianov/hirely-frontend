import { sendCode, signIn, signUp } from '@shared/api/auth/api'
import { SendCodeBody, SignInBody, SignUpBody } from '@shared/api/auth/types'
import WarningUi from '@shared/ui/WarningUi'
import { makeAutoObservable } from "mobx"
import { profileStore } from '../../profile-store/profile-store'

class AuthApiStore {
   constructor() { makeAutoObservable(this) }

   isAuth = localStorage.getItem("accessToken") && localStorage.getItem("user") ? true : false
   isVerifyCode = false
   isCreating = false

   sendCodeAction = async (body: SendCodeBody) => {
      this.setIsCreating(true)
      try {
         const res = await sendCode(body)
         console.log(res)
         this.setIsVerifyCode(true)
      } catch (err) { console.log(err) }
      finally { this.setIsCreating(false) }
   }

   signUpAction = async (body: SignUpBody) => {
      this.setIsCreating(true)
      try {
         const res = await signUp(body)
         console.log(res)
         localStorage.setItem("accessToken", res.data.accessToken)
         localStorage.setItem("user", JSON.stringify(res.data.user))
         profileStore.setProfile(res.data.user)
         window.location.href = '/main/posts'
      } catch (err) {
         // @ts-ignore
         if (err.response.data.message === "User already exists") {
            WarningUi({
               time: 6000,
               type: "error",
               text: "Аккаунт с этой почтой уже существует",
               position: "top-right"
            })
         }
         return false
      }
      finally { this.setIsCreating(false) }
   }

   signInAction = async (body: SignInBody) => {
      try {
         const res: any = await signIn(body)
         console.log(res)
         if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            profileStore.setProfile(res.data.user)
            window.location.href = '/main/posts'
         }
         return res
      }
      catch (err) { console.log(err) }
   }

   // ========= OTHER MOVES ============
   setIsAuth = (is: boolean) => this.isAuth = is
   setIsVerifyCode = (is: boolean) => this.isVerifyCode = is
   setIsCreating = (is: boolean) => this.isCreating = is
}

export const authApiStore = new AuthApiStore()