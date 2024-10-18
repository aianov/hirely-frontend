import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export const ThemeButton = observer(({
	children,
	...props
}: ThemeDivProps) => {
	const { currentTheme } = themeStore
	return (
		<button style={currentTheme.btnsTheme} {...props}>
			{children}
		</button>
	)
})

interface ThemeDivProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
}