import { useEffect } from 'react'
import s from './UserPlans.module.scss'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'
import { User } from '@/stores/profile-store/types'
import { themeStore } from '@/stores/theme/theme-store'
import { NotFoundIcon } from '@/assets/icons/Ui/NotFoundIcon'
import { EditIcon } from '@/assets/icons/Ui/EditIcon'

export const UserPlans = observer(({
   user,
   which
}: UserPlansProps) => {
   const { currentTheme } = themeStore
   const url = useLocation().pathname
   useEffect(() => { localStorage.setItem('last-route', url) }, [])

   return (
      <div className={s.main} style={themeStore.currentTheme.bgTheme}>
         <div className={s.title}>
            <span>{which == 'my' ? 'Мои планы:' : `Планы ${user?.name}:`}</span>
            {which == 'my' && (
               <button>
                  <EditIcon color={currentTheme.secondTextColor.color} size={17} />
               </button>
            )}
         </div>

         <div className={s.plans}>
            {which == 'my' ? (user?.more?.plans?.length == 0 ? (
               <div className={s.noplans}>
                  <NotFoundIcon color={currentTheme.secondTextColor.color} />
                  <span style={currentTheme.secondTextColor}>У вас нет созданных планов</span>
               </div>
            ) : user?.more?.plans.map((p, i) => (
               <div
                  key={i}
                  className={s.plan}
               >
                  <div
                     className={s.numdiv}
                     style={currentTheme.btnsTheme}
                  >
                     <span className={s.num} style={currentTheme.secondTextColor}>{i + 1}</span>
                  </div>
                  <span className={s.plantext} style={currentTheme.textColor}>{p}</span>
               </div>
            ))) : user?.isPlanView == 'friends' ? (
               <div className={s.hiddenplans}>
                  <NotFoundIcon color={currentTheme.secondTextColor.color} />
                  <span style={currentTheme.secondTextColor}>Пользователь {user.name} показывает свои планы только друзьям</span>
               </div>
            ) : user?.isPlanView == 'none' ? (
               <div className={s.hiddenplans}>
                  <NotFoundIcon color={currentTheme.secondTextColor.color} />
                  <span style={currentTheme.secondTextColor}>Пользователь {user.name} скрыл свои планы</span>
               </div>
            ) : (user?.more?.plans?.length == 0 ? (
               <div className={s.hiddenplans}>
                  <NotFoundIcon color={currentTheme.secondTextColor.color} />
                  <span style={currentTheme.secondTextColor}>Пользователь {user.name} не имеет планов</span>
               </div>
            ) : (user?.more?.plans?.map((p, i) => (
               <div
                  key={i}
                  className={s.plan}
               >
                  <div
                     className={s.numdiv}
                     style={currentTheme.btnsTheme}
                  >
                     <span className={s.num} style={currentTheme.secondTextColor}>{i + 1}</span>
                  </div>
                  <span className={s.plantext} style={currentTheme.textColor}>{p}</span>
               </div>
            ))))}
         </div>
      </div>
   )
})

interface UserPlansProps {
   user: User
   which: 'my' | 'other'
}