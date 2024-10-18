import { MainText } from '@/shared/ui/Theme/MainText'
import { ThemeButton } from '@/shared/ui/Theme/ThemeButton'
import { reportStore } from '@/stores/report-store/report-store'
import { themeStore } from '@/stores/theme/theme-store'
import { Checkbox, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

export const ReportModal = observer(() => {
	const { currentTheme } = themeStore
	const {
		isReportingModal: { isReportingModal, setIsReportingModal }
	} = reportStore

	return (
		<Modal
			open={isReportingModal}
			onCancel={() => setIsReportingModal(false)}
			footer={<></>}
			centered
			width={400}
		>
			<div className={s.main}>
				<div className={s.top}>
					<span className={s.title}>Выберите причину жалобы</span>
				</div>

				<div className={s.mid}>
					<Checkbox onChange={e => console.log(e.target.checked)}>
						<MainText>Нежелательная реклама или спам</MainText>
					</Checkbox>
					<Checkbox onChange={e => console.log(e.target.checked)}>
						<MainText>Порнография или откровенные сексуальные сцены</MainText>
					</Checkbox>
					<Checkbox onChange={e => console.log(e.target.checked)}>
						<MainText>Дискриминационные высказывания или натуралистический контент</MainText>
					</Checkbox>
					<Checkbox onChange={e => console.log(e.target.checked)}>
						<MainText>Пропаганда терроризма</MainText>
					</Checkbox>
					<Checkbox onChange={e => console.log(e.target.checked)}>
						<MainText>Домогательства, издевательства, насилие</MainText>
					</Checkbox>
					<Checkbox onChange={e => console.log(e.target.checked)}>
						<MainText>Самоубийство или членовредительство</MainText>
					</Checkbox>
					<Checkbox onChange={e => console.log(e.target.checked)}>
						<MainText>Политика или прочие высказывания связанные с ним</MainText>
					</Checkbox>
					<Checkbox onChange={e => console.log(e.target.checked)}>
						<MainText>Неадекватное поведение</MainText>
					</Checkbox>
					<Checkbox onChange={e => console.log(e.target.checked)}>
						<MainText>Ложная информация</MainText>
					</Checkbox>
				</div>

				<div className={s.bot}>
					<ThemeButton
						className={s.cancel}
						style={currentTheme.btnsTheme}
						onClick={() => setIsReportingModal(false)}
					>
						<MainText>Отмена</MainText>
					</ThemeButton>
					<button
						className={s.submit}
					// onClick={submitCreating}
					>
						Отправить
						{/* {isCreating && <SpinLoader size={15} color='black' />} */}
					</button>
				</div>
			</div>
		</Modal>
	)
})