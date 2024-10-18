
import { MainText } from '@/shared/ui/Theme/MainText'
import { ThemeDiv } from '@/shared/ui/Theme/ThemeDiv'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

export const NewsPage = observer(() => {
	return (
		<div className={s.main}>
			<ThemeDiv
				className={s.maincontainer}
			>
				<MainText className={s.title}>Новости</MainText>
			</ThemeDiv>
		</div>
	)
})