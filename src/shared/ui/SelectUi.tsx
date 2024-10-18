
import { ArrowBottomIcon } from '@assets/icons/Ui/ArrowBottomIcon'
import { Select } from 'antd'
import type { CSSProperties } from 'react'
import { Item } from '../utils/globalTypes'

export const SelectUi = ({
	placeholder,
	items,
	state,
	setState,
	doSome,
	loadingText = 'Загрузка...',
	style = {},
	className = '',
	required = false,
	title = '',
	titleStyle = {
		paddingLeft: '3px',
		paddingBottom: '3px',
		color: '#BABABA',
		fontSize: '13px'
	},
	containerStyle = { display: 'flex', flexDirection: 'column' }
}: Props) => {
	return (
		<div style={containerStyle}>
			{required ? (
				<div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
					<span style={titleStyle}>{title}</span>
					<span style={{ color: 'red', fontSize: titleStyle.fontSize }}>*</span>
				</div>
			) : title !== '' && (
				<span style={titleStyle}>{title}</span>
			)}
			<Select
				placeholder={placeholder}
				value={state}
				style={style}
				onChange={(e) => {
					if (doSome) doSome()
					setState(e)
				}}
				className={className}
				dropdownRender={(menu) => <div>{menu}</div>}
				suffixIcon={<ArrowBottomIcon />}
				notFoundContent={
					<div className='df fdc jcc aic' style={{ padding: '20px', gap: '10px' }}>
						<span className='fw600 tac'>{loadingText}</span>
					</div>
				}
			>
				{items && items?.length >= 1 && (
					<>
						{items?.map((i: Item, index: number) => (
							<Select.Option key={index} value={i.label}>
								{i.label}
							</Select.Option>
						))}
					</>
				)}
			</Select>
		</div>
	)
}

interface Props {
	placeholder?: string
	items?: Item[]
	state: null | string
	setState: (sort: string, second?: unknown) => void
	doSome?: () => void
	loadingText?: string
	style?: CSSProperties
	className?: string
	required?: boolean
	title?: string
	titleStyle?: CSSProperties
	containerStyle?: CSSProperties
}