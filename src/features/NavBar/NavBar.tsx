import { premiumStore } from '@/stores/premium-store/premium-store'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { NicsBarLogoIcon } from '../../assets/icons/MainPage/NavBar/NicsBarLogo'
import { NotifyIcon } from '../../assets/icons/MainPage/NavBar/NotifyIcon'
import s from './NavBar.module.scss'

export const NavBar = observer(() => {
   const { currentTheme } = themeStore
   const { setIsPremiumShow } = premiumStore

   const navigate = useNavigate()

   return (
      <div className={s.main} style={{
         background: themeStore.currentTheme.bgTheme.background,
         border: themeStore.currentTheme.bgTheme.border
      }}>
         <div className={s.left}>
            <NicsBarLogoIcon color={themeStore.currentTheme.btnsTheme.background as string} />
            <div className={s.lefttexts}>
               <span className={s.nicsbar}>NicsBar</span>
               <span className={s.nicsbarsubtitle}>Social network</span>
            </div>
         </div>

         <div className={s.right}>
            <button
               className={s.prembtn}
               onClick={() => setIsPremiumShow(true)}
            >
               Premium
            </button>
            <button
               className='df jcc aic'
               onClick={() => navigate('/main/notifications')}
            >
               <NotifyIcon color={currentTheme.secondTextColor.color} size={25} />
            </button>
         </div>
      </div>
   )
})
