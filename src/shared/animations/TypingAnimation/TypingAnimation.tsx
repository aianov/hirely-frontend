import { themeStore } from '@/stores/theme/theme-store'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

export const TypingAnimation = observer(({
	color = 'rgb(0, 210, 0)'
}: TypingAnimationProps) => {
	const { currentTheme } = themeStore
	const dots = [0, 1, 2]

	return (
		<div className={s.container}>
			{dots.map((dot) => (
				<motion.span
					key={dot}
					className={s.dot}
					style={{ color: color ? color : currentTheme?.secondTextColor?.color }}
					initial={{ y: 0, scale: 1 }}
					animate={{
						y: [0, -1, 0], // Подъем и возврат
						scale: [1, 1.2, 1], // Увеличение и уменьшение
					}}
					transition={{
						duration: 0.6, // Длительность анимации
						repeat: Infinity, // Повтор бесконечно
						delay: dot * 0.15, // Задержка для каждой точки
						ease: 'easeInOut'
					}}
				>
					•
				</motion.span>
			))}
		</div>
	)
})

interface TypingAnimationProps {
	color?: string
}