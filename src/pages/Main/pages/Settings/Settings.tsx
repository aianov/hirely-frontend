import { isMobile } from '@/shared/utils/someFunctions'
import { settingsStore } from '@/stores/settings-store/settings-store'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import s from './Settings.module.scss'
import { MobileAside } from './components/MobileAside/MobileAside'
import { SettingsAside } from './components/SettingsAside/SettingsAside'

export const Settings = observer(() => {
	const { isMobileAside } = settingsStore
	const navigate = useNavigate()
	const url = useLocation().pathname
	const [lastUrl] = useState(localStorage.getItem('last-route') ? localStorage.getItem('last-route') : '/main/posts')

	return (
		<div className={s.main} style={themeStore.currentTheme.bgTheme}>
			{(isMobile() && !isMobileAside) ? <MobileAside /> : <SettingsAside />}

			{/* settings content */}
			{!(isMobile() && !isMobileAside) && (
				<div className={s.right}>
					<Outlet />
				</div>
			)}
		</div>
	)
})