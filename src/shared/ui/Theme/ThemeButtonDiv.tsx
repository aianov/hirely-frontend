import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { HTMLProps, ReactNode } from 'react'

export const ThemeButtonDiv = observer(({
	children,
	...props
}: ThemeDivProps) => {
	const { currentTheme } = themeStore
	return (
		<div style={currentTheme.btnsTheme} {...props}>
			{children}
		</div>
	)
})

interface ThemeDivProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode
}