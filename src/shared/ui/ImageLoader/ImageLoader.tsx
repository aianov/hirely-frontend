import { observer } from 'mobx-react-lite'
import { CSSProperties, useState } from 'react'
import { SpinLoader } from '../SpinLoader'

export const ImageLoader = observer(({
	src,
	alt = 'image',
	style = {},
	imageStyle = {},
	callback,
	className = '',
}: ImageLoaderProps) => {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<div
			className={className}
			style={style}
		>
			{isLoading && <SpinLoader size={70} />}
			<img
				alt={alt}
				src={src}
				onClick={callback}
				onLoad={() => setIsLoading(false)}
				loading='lazy'
				style={{
					...imageStyle,
					filter: isLoading ? 'blur(10px)' : 'none',
					transition: 'filter 0.5s ease',
					display: 'block',
				}}
			/>
		</div>
	)
})

interface ImageLoaderProps {
	src: string
	alt?: string
	style?: CSSProperties
	imageStyle?: CSSProperties
	callback?: () => void
	className?: string
}
