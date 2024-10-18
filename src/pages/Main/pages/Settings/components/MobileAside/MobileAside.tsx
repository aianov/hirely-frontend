import { BackArrowLeftIcon } from '@/assets/icons/Ui/BackArrowLeftIcon'
import { MainText } from '@/shared/ui/Theme/MainText'
import { settingsButtons } from '@/shared/utils/globalJsxData'
import { isMobile } from '@/shared/utils/someFunctions'
import { settingsStore } from '@/stores/settings-store/settings-store'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import s from '../../Settings.module.scss'

export const MobileAside = observer(() => {
	const { currentTheme } = themeStore
	const { setIsMobileAside } = settingsStore

	const navigate = useNavigate()
	const url = useLocation().pathname
	const [lastUrl] = useState(localStorage.getItem('last-route') ? localStorage.getItem('last-route') : '/main/posts')

	return (
		<div className={s.left2}>
			{/* BACKBTN */}
			<div className={s.back}>
				<button
					className={s.backbtn}
					onClick={() => {
						navigate(lastUrl!)
					}}
				>
					<BackArrowLeftIcon width={20} height={15} />
					<MainText>Назад</MainText>
				</button>
			</div>

			{/* OTHER NAV BTNS */}
			<div className={s.navbtns}>
				{settingsButtons.map((t, i) => (
					<Link
						className={s.navbtn}
						key={i}
						to={t.url}
						style={isMobile() ? {} : { background: url == t.url ? currentTheme.btnsTheme.background : '' }}
						onClick={() => setIsMobileAside(true)}
					>
						{t.icon}
						<MainText>{t.text}</MainText>
					</Link>
				))}
			</div>
		</div>
	)
})