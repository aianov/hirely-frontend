import { botInstance } from '@/shared/api/base'
import { ThemeButtonDiv } from '@/shared/ui/Theme/ThemeButtonDiv'
import { profileStore } from '@/stores/profile-store/profile-store'
import { LoginButton } from '@telegram-auth/react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import s from './SignIn.module.scss'

export const SignIn = observer(() => {
   const {
      profileFromTg: { setProfileFromTg }
   } = profileStore
   const navigate = useNavigate()

   const handleAuthSuccess = async (user: any) => {
      try {
         const res = await botInstance.post('/auth/telegram/callback', user)
         console.log(res)
         if (res?.data?.status === "success") {
            setProfileFromTg(_ => {
               localStorage.setItem("profilefromtg", JSON.stringify(res?.data?.data))
               return res?.data?.data
            })
            navigate('/main/posts')
         }
      } catch (err) {
         console.log(err)
         alert('Что-то пошло не так')
      }
      console.log(user)
   }

   return (
      <div className={s.main}>
         <ThemeButtonDiv className={s.container}>
            <span className={s.title}>Вход</span>
            <p className={s.subtitle}>Войди в свой аккаунт, чтоб перейти на главную страницу.</p>

            <div className='df jcc'>
               <LoginButton
                  botUsername={"hirelybot"}
                  buttonSize="large"
                  cornerRadius={10}
                  onAuthCallback={handleAuthSuccess}
                  showAvatar={true}
                  lang="en"
                  requestAccess="write"
               />
            </div>
         </ThemeButtonDiv>
      </div>
   )
})