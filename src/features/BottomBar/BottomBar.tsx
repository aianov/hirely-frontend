import { MenuIcon } from '@/assets/icons/MainPage/NavBar/MenuIcon'
import { getNavBtns } from '@/shared/utils/globalJsxData'
import { isMobile } from '@/shared/utils/someFunctions'
import { settingsStore } from '@/stores/settings-store/settings-store'
import { themeStore } from '@/stores/theme/theme-store'
import s from '@layouts/MainLayout/MainLayout.module.scss'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const BottomBar = observer(() => {
	const { currentTheme } = themeStore
	const { isSide, setIsSide } = settingsStore
	const path = useLocation().pathname

	useEffect(() => {
		setIsSide(false)
	}, [path])

	return (
		<div
			className={s.bottompanel}
			style={{
				background: currentTheme.bgTheme.background,
				paddingBottom: isMobile() ? '35px' : '0'
			}}
		>
			{getNavBtns('mobile').slice(0, 4).map((t, i) => {
				return (
					<Link
						key={i}
						className={s.navbtn}
						to={t.to}
					>
						{t.icon}
						<span
							className={s.navbtntext}
							style={(path == t.to || t.allowUrls.includes(path)) ? currentTheme.textColor : currentTheme.secondTextColor}
						>
							{t.text}
						</span>
					</Link>
				)
			})}
			<button
				className={s.navbtn}
				onClick={() => setIsSide(!isSide)}
			>
				<MenuIcon color={isSide ? 'white' : currentTheme.secondTextColor.color} />
				<span
					className={s.navbtntext}
					style={currentTheme.textColor}
				>
					Ещё
				</span>
			</button>
		</div>
	)
})