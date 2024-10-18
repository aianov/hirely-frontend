import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { HTMLProps, ReactNode } from 'react'

export const MainText = observer(({
	children,
	...props
}: ThemeDivProps) => {
	const { currentTheme } = themeStore
	return (
		<span style={currentTheme.textColor} {...props}>
			{children}
		</span>
	)
})

interface ThemeDivProps extends HTMLProps<HTMLSpanElement> {
	children?: ReactNode
}