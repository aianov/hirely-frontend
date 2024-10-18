import { EditIcon } from '@/assets/icons/Ui/EditIcon'
import { NotFoundIcon } from '@/assets/icons/Ui/NotFoundIcon'
import { ThemeDiv } from '@/shared/ui/Theme/ThemeDiv'
import { User } from '@/stores/profile-store/types'
import { themeStore } from '@/stores/theme/theme-store'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import s from './UserGoals.module.scss'

export const UserGoals = observer(({
   user,
   which
}: UserGoalsProps) => {
   const { currentTheme } = themeStore

   const navigate = useNavigate()
   const url = useLocation().pathname

   useEffect(() => { localStorage.setItem('last-route', url) }, [])

   return (
      <ThemeDiv className={s.main}>
         <div className={s.title}>
            <span>{which == 'my' ? 'Мои цели:' : `Цели ${user.name}:`}</span>
            {which == 'my' && (
               <button
                  onClick={() => navigate('/main/settings/goals-plans')}
               >
                  <EditIcon color={currentTheme.secondTextColor.color} size={17} />
               </button>
            )}
         </div>

         <div className={s.goals}>
            {which == 'my' ? (user?.more?.goals?.length == 0 ? (
               <div className={s.nogoals}>
                  <NotFoundIcon color={currentTheme.secondTextColor.color} />
                  <span style={currentTheme.secondTextColor}>У вас нет созданных целей</span>
               </div>
            ) : user?.more?.goals?.map((goals, ind) => (
               <div className={s.goal} key={ind}>
                  <span className={s.createdAt}>Создано: {dayjs(goals.createdAt).format('D MMMM YYYY')}</span>
                  <span className={s.do}>{goals.do}</span>
                  <span className={s.to}>Выполнить до: {dayjs(goals.to).format('D MMMM YYYY')}</span>
               </div>
            ))) : user?.isGoalView == 'friends' ? (
               <div className={s.hiddengoals}>
                  <NotFoundIcon color={currentTheme.secondTextColor.color} />
                  <span style={currentTheme.secondTextColor}>Пользователь {user.name} показывает свои цели только друзьям</span>
               </div>
            ) : user?.isGoalView == 'none' ? (
               <div className={s.hiddengoals}>
                  <NotFoundIcon color={currentTheme.secondTextColor.color} />
                  <span style={currentTheme.secondTextColor}>Пользователь {user.name} скрыл свои цели</span>
               </div>
            ) : user?.more?.goals?.length == 0 ? (
               <div className={s.hiddengoals}>
                  <NotFoundIcon color={currentTheme.secondTextColor.color} />
                  <span style={currentTheme.secondTextColor}>Пользователь {user.name} не имеет целей</span>
               </div>
            ) : (user?.more?.goals?.map((goals, ind) => (
               <div className={s.goal} key={ind}>
                  <span className={s.createdAt}>Создано: {dayjs(goals.createdAt).format('D MMMM YYYY')}</span>
                  <span className={s.do}>{goals.do}</span>
                  <span className={s.to}>Выполнить до: {dayjs(goals.to).format('D MMMM YYYY')}</span>
               </div>
            )))}
         </div>
      </ThemeDiv>
   )
})

interface UserGoalsProps {
   user: User
   which: 'my' | 'other'
}