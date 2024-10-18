import { LeaveIcon } from '@/assets/icons/MainPage/Sidebar/LeaveIcon'
import { SettingsIcon } from '@/assets/icons/MainPage/Sidebar/SettingsIcon'
import { MainText } from '@/shared/ui/Theme/MainText'
import { profileStore } from '@/stores/profile-store/profile-store'
import { settingsStore } from '@/stores/settings-store/settings-store'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import s from './index.module.scss'

export const MobileSideBar = observer(() => {
	const { currentTheme } = themeStore
	const { isSide, setIsSide } = settingsStore
	const { profile, logoutAction } = profileStore

	return (
		<div
			className={`${s.asidebar} ${isSide ? s.active : ''}`}
			style={{ background: currentTheme.bgTheme.background }}
		>
			<div className={s.top}>
				<div className={s.usercard} style={themeStore.currentTheme.btnsTheme}>
					<div className={s.container}>
						<div className={s.left}>
						</div>
						<div className={s.right}>
							<div className={s.name}>
								<MainText>{profile?.name}</MainText>
							</div>
							<div className={s.tags}>
								<div>
									<div className={s.who}>
										<MainText>Новенький</MainText>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Link
						to={'/main/settings'}
						onClick={() => setIsSide(false)}
						className={s.settingsbtn}
					>
						<SettingsIcon />
					</Link>
				</div>
			</div>
			<div className={s.bot}>
				<button
					className={s.leavebtn}
					onClick={logoutAction}
					style={themeStore.currentTheme.btnsTheme}
				>
					<LeaveIcon />
					<MainText>Выйти</MainText>
				</button>
			</div>
		</div>
	)
})