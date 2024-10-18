import { IconWithWidthAndHeight } from '@/shared/utils/globalTypes'

export const MenuIcon = ({ width = 24, height = 24, color = 'white' }: IconWithWidthAndHeight) => {
	return (
		<svg width={width} height={height} viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1.20019 2L27.2002 2M1.20019 10.5L27.2002 10.5M1.2002 19L27.2002 19" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}