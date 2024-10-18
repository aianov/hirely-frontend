import { postStore } from '@/stores/post/post-store'
import { themeStore } from '@/stores/theme/theme-store'
import { Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import s from './PostHaveBadContentModal.module.scss'

export const PostHaveBadContentModal = observer(() => {
	const { isHaveBadContent, setIsHaveBadContent } = postStore
	const { currentTheme } = themeStore

	useEffect(() => {
		console.log(isHaveBadContent)
	}, [isHaveBadContent])

	return (
		<Modal
			open={isHaveBadContent}
			onCancel={() => setIsHaveBadContent(false)}
			footer={<></>}
			centered
			width={400}
		>
			<div className={s.main}>
				<div className={s.top}>
					<span>Ваш пост содержит неприемлемый контент!</span>
				</div>
				<div className={s.bot}>
					<button
						className={s.cancel}
						style={currentTheme.btnsTheme}
						onClick={() => setIsHaveBadContent(false)}
					>
						<span style={currentTheme.textColor}>Ок</span>
					</button>
				</div>
			</div>
		</Modal>
	)
})