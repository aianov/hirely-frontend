import { TypingAnimation } from '@/shared/animations/TypingAnimation/TypingAnimation'
import { GetChatResponse } from '@/shared/api/chat/types'
import { GetAvatar } from '@/shared/ui/GetAvatar'
import { GetWho } from '@/shared/ui/GetWho'
import { SecondaryText } from '@/shared/ui/Theme/SecondaryText'
import { dateFormatter } from '@/shared/utils/dateFormatter'
import { getProfileStatuses } from '@/shared/utils/globalJsxData'
import { socialNumberFormat } from '@/shared/utils/parsers'
import { chatStore } from '@/stores/chat-store/chat-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import s from '../../ChatList.module.scss'

export const ChatItem = observer(({
	c
}: ChatItemProps) => {
	const { profile: { id } } = profileStore
	const { currentTheme } = themeStore
	const { setSelectedChat, setSelectedChatId } = chatStore

	const createdAt = c?.createdAt
	const user = c?.user
	const previewMessage = c?.messages?.[0]?.content
	const previwName = c?.isPersonal ? (c?.messages?.[0]?.sender?.id == id ? 'Вы' : c?.messages?.[0]?.sender?.name) : c?.title
	const pLang = c?.moreData?.p_lang?.[0]
	const chatId = c?.id
	let lastMessage = c?.message?.content?.length >= 40 ? c?.message?.content?.slice(0, 40) + '...' : c?.message?.content
	lastMessage = c?.isEdit ? `${lastMessage} (изменено)` : lastMessage
	const isTyping = c?.isTyping

	return (
		<Link
			className={s.chat}
			to={`/main/chat/${chatId}`}
			onClick={() => {
				setSelectedChat(c)
				setSelectedChatId(c?.id)
			}}
		>
			<div className={s.left}>
				<div className={s.ava}>
					<GetAvatar size={55} url={s.logo} status='online' circleClassName={s.circle} />
				</div>
				<div className={s.names}>

					{c.isPersonal && user ? (
						<div className={s.usernames}>
							<div className={s.left}>
								<span className={s.title} style={currentTheme.textColor}>{user?.name}</span>
								<div className={s.usernamestatuses}>
									<GetWho who={user?.more?.who} />
									{getProfileStatuses(pLang, 20)}
								</div>
							</div>

							<div className={s.right}>
								<span style={currentTheme.secondTextColor}>{dateFormatter(createdAt, 'HH:mm')}</span>
							</div>
						</div>
					) : (
						<span className={s.title} style={currentTheme.textColor}>{c.title}</span>
					)}

					<div className={s.bottom}>
						<div className={s.left}>
							{!previewMessage ? (
								<>
									{isTyping ? (
										<div className={s.typingdiv}>
											<TypingAnimation />
											<SecondaryText className={s.messageTyping}>печатает</SecondaryText>
										</div>
									) : (
										<span className={s.message} style={currentTheme.secondTextColor}>
											{lastMessage ? lastMessage : 'Здесь пока нет сообщений'}
										</span>
									)}
								</>
							) : (
								<div className='df aic' style={{ gap: '5px' }}>
									<span className={s.gradientText}>{previwName}:</span>
									<span className={s.message} style={currentTheme.textColor}>{previewMessage?.length >= 20 ? previewMessage.slice(0, 20) + '...' : previewMessage}</span>
								</div>
							)}
						</div>
						<div className={s.right}>
							{c.unreadCount != 0 && (
								<div className={s.unreaded}>
									<span style={currentTheme.textColor}>{socialNumberFormat(c.unreadCount)}</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
})

interface ChatItemProps {
	c: GetChatResponse
}