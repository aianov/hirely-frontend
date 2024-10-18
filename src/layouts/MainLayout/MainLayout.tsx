import { BottomBar } from '@/features/BottomBar/BottomBar'
import { MobileSideBar } from '@/features/MobileSideBar/MobileSideBar'
import { PremiumModal } from '@/features/Modals/PremiumModal/PremiumModal'
import { ReportModal } from '@/features/Modals/ReportModal/ReportModal'
import { UserNotFoundModal } from '@/features/Modals/UserNotFoundModal/UserNotFoundModal'
import { themeStore } from '@/stores/theme/theme-store'
import { NavBar } from '@features/NavBar/NavBar'
import { SideBar } from '@features/SideBar/SideBar'
import { Outlet, useLocation } from 'react-router-dom'
import s from './MainLayout.module.scss'

export const MainLayout = () => {
   const path = useLocation().pathname
   const { currentTheme } = themeStore

   return (
      <div className={s.main}>

         {/* GLOBAL MODALS */}
         <PremiumModal />
         <UserNotFoundModal />
         <ReportModal />

         <div className={s.container}>
            {/* {!path.includes('/main/chat/') && ( */}
            <div className={s.fakenavbar}>
               <NavBar />
            </div>
            {/* )} */}

            <div className={s.othermain}>
               {/* SIDE BAR OF MAIN PAGE */}
               <div className={s.fakeleft}>
                  <div
                     className={s.left}
                  >
                     <SideBar />
                  </div>
               </div>

               <div
                  className={s.mid}
                  style={
                     path.includes('/main/settings/customization')
                        ? { overflowX: 'auto' }
                        : path.includes('/main/chat/')
                           ? { height: '85vh', margin: '0', minHeight: 'auto' } :
                           {}
                  }
               >
                  <Outlet />
                  {!path.includes('/main/chat/') && (
                     <BottomBar />
                  )}
               </div>

               {/* <div className={s.fakeright}>
                  <div className={s.right}>
                     <div className={s.joinus}>
                        <span>Присоединяйтесь к нашему сообществу в телеграмм !</span>
                        <a
                           target='_blank'
                           href='https://t.me/nicsfrontend'
                           className={s.joinbtn}
                        >
                           Присоединиться
                        </a>
                     </div>
                     <div className={s.ad}>
                        <span>{`Здесь могла бы быть ваша реклама :)`}</span>
                        <span>Тг: @nics51</span>
                     </div>
                  </div>
               </div> */}
            </div>
         </div>

         <MobileSideBar />
      </div >
   )
}

