import { themeStore } from '@/stores/theme/theme-store'
// @ts-ignore
import defaultLogo from '@images/userlogo.jpg'
import { observer } from 'mobx-react-lite'
import { Link, useLocation } from 'react-router-dom'
import { LeaveIcon } from '../../assets/icons/MainPage/Sidebar/LeaveIcon'
import { SettingsIcon } from '../../assets/icons/MainPage/Sidebar/SettingsIcon'
import WarningUi from '../../shared/ui/WarningUi'
import { getNavBtns, getProfileStatuses } from '../../shared/utils/globalJsxData'
import { NavBtnType } from '../../shared/utils/globalTypes'
import { profileStore } from '../../stores/profile-store/profile-store'
import s from "./SideBar.module.scss"

export const SideBar = observer(() => {
  const url = useLocation().pathname
  const { profile, logoutAction } = profileStore

  return (
    <div className={s.main} style={themeStore.currentTheme.bgTheme}>

      <div className={s.top}>
        {/* КАРТОЧКА ПОЛЬЗОВАТЕЛЯ */}
        <div className={s.usercard} style={themeStore.currentTheme.btnsTheme}>
          <div className={s.left}>
            <div className={s.imgdiv}>
              <img src={profile?.more?.logo ? profile?.more?.logo : defaultLogo} alt="" />
            </div>
          </div>
          <div className={s.right}>
            <div className={s.name}>
              <span>{profile?.name}</span>
              <span>{`@${profile?.tag}`}</span>
            </div>
            <div className={s.tags}>
              <div className={s.who}>{profile?.more.who ? profile?.more.who : "Самурай"}</div>
              <div className={s.plang}>
                <div className={s.icon}>
                  {getProfileStatuses(profile?.more?.p_lang[0], 19)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* КНОПКИ НАВИГАЦИИ */}
        <div className={s.navbtns}>
          {getNavBtns().map((btn: NavBtnType, ind) => (
            <Link
              to={btn.soon ? url : btn.to}
              key={ind}
              className={(btn.to == url || btn.allowUrls.includes(url) || (btn.text == 'Чаты' && url.includes('/main/chat'))) ? s.activenavbtn : s.navbtn}
              style={{ cursor: btn.soon ? 'not-allowed' : 'pointer' }}
              onClick={() => { btn.soon && WarningUi({ type: 'error', text: 'Скоро...', position: 'top-right' }) }}
            >
              {btn.icon}
              <span style={{ color: (btn.to == url || btn.allowUrls.includes(url) || (btn.text == 'Чаты' && url.includes('/main/chat'))) ? 'white' : '#BABABA' }}>{btn.text}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* НИЖНЯЯ ЧАСТЬ */}
      <div className={s.bottom}>
        {/* КНОПКА ВЫЙТИ */}
        <button
          className={s.leavebtn}
          onClick={logoutAction}
          style={themeStore.currentTheme.btnsTheme}
        >
          <LeaveIcon />
          <span>Выйти</span>
        </button>

        {/* КНОПКА НАСТРОЙКИ */}
        <Link
          to={'/main/settings'}
          className={s.settingsbtn}
          style={themeStore.currentTheme.btnsTheme}
        >
          <SettingsIcon />
        </Link>
      </div>
    </div>
  )
})
