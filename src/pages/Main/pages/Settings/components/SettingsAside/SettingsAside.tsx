import { BackArrowLeftIcon } from '@/assets/icons/Ui/BackArrowLeftIcon'
import { settingsButtons } from '@/shared/utils/globalJsxData'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import s from '../../Settings.module.scss'

export const SettingsAside = observer(() => {
	const navigate = useNavigate()
	const url = useLocation().pathname
	const [lastUrl] = useState(localStorage.getItem('last-route') ? localStorage.getItem('last-route') : '/main/posts')

	return (
		<>
			{/* settings sidebar */}
			<div className={s.left}>
				{/* BACKBTN */}
				<div className={s.back}>
					<button
						className={s.backbtn}
						onClick={() => navigate(lastUrl!)}
					>
						<BackArrowLeftIcon width={20} height={15} />
						<span>Назад</span>
					</button>
				</div>

				{/* OTHER NAV BTNS */}
				<div className={s.navbtns}>
					{settingsButtons.map((t, i) => (
						<Link
							className={url == t.url ? s.navbtnactive : s.navbtn}
							key={i}
							to={t.url}
						>
							{t.icon}
							<span>{t.text}</span>
						</Link>
					))}
				</div>
			</div>
		</>
	)
})