import { PaintIcon } from '@/assets/icons/Ui/PaintIcon'
import { ResizeIcon } from '@/assets/icons/Ui/ResizeIcon'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import s from './index.module.scss'

export const NicsBarImageEditor = observer(({
	file,
	onFinish,
	onClose
}: NicsBarImageEditorProps) => {
	const [image, setImage] = useState<HTMLImageElement | null>(null)
	const [isResizing, setIsResizing] = useState(false)
	const [isMoving, setIsMoving] = useState(false)
	const [crop, setCrop] = useState({ x: 50, y: 50, width: 200, height: 200 })
	const [startPosition, setStartPosition] = useState<{ x: number, y: number } | null>(null)
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
	const [loading, setLoading] = useState(true)

	const canvasRef = useRef<HTMLCanvasElement>(null)
	const bottomBtnsRef = useRef<null | HTMLDivElement>(null)
	const resetBtnRef = useRef<null | HTMLButtonElement>(null)

	const fileUrl = URL.createObjectURL(file)

	useEffect(() => {
		const img = new Image()
		img.src = fileUrl
		img.onload = () => {
			setImage(img)
			// Устанавливаем размеры canvas равными размеру изображения
			setCanvasSize({ width: img.width >= 1200 ? 1200 : img.width, height: img.height >= 700 ? 700 : img.height })
			setLoading(false)
		}
	}, [fileUrl])

	useEffect(() => {
		if (image && canvasRef.current) {
			const canvas = canvasRef.current
			const ctx = canvas.getContext('2d')
			if (!ctx) return
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
		}
	}, [image, canvasSize])

	const handleMouseDown = (e: React.MouseEvent, type: string) => {
		e.preventDefault()
		setStartPosition({ x: e.clientX, y: e.clientY })

		if (type === 'resize') {
			setIsResizing(true)
		} else {
			setIsMoving(true)
		}
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!startPosition) return

		const dx = e.clientX - startPosition.x
		const dy = e.clientY - startPosition.y

		if (isResizing) {
			setCrop((prev) => ({
				...prev,
				width: Math.min(Math.max(50, prev.width + dx), canvasSize.width - prev.x),
				height: Math.min(Math.max(50, prev.height + dy), canvasSize.height - prev.y),
			}))
			setStartPosition({ x: e.clientX, y: e.clientY })
		} else if (isMoving) {
			setCrop((prev) => ({
				...prev,
				x: Math.min(Math.max(0, prev.x + dx), canvasSize.width - prev.width),
				y: Math.min(Math.max(0, prev.y + dy), canvasSize.height - prev.height),
			}))
			setStartPosition({ x: e.clientX, y: e.clientY })
		}
	}

	const handleMouseUp = () => {
		setIsResizing(false)
		setIsMoving(false)
		setStartPosition(null)
	}

	const handleFinish = () => {
		if (!canvasRef.current || !image) return
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// Создаем холст для обрезки
		const croppedCanvas = document.createElement('canvas')
		croppedCanvas.width = crop.width
		croppedCanvas.height = crop.height
		const croppedCtx = croppedCanvas.getContext('2d')
		if (!croppedCtx) return

		croppedCtx.drawImage(
			canvas,
			crop.x, crop.y, crop.width, crop.height,
			0, 0, crop.width, crop.height
		)

		// Отправка результата через onFinish
		croppedCanvas.toBlob(blob => {
			if (blob) {
				const croppedFile = new File([blob], "cropped_image.png", { type: "image/png" })
				// onFinish(croppedFile)
			}
		})
	}

	// Логика если ты нажал outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				canvasRef.current &&
				!canvasRef.current.contains(event.target as Node) &&
				bottomBtnsRef.current &&
				!bottomBtnsRef.current.contains(event.target as Node) &&
				resetBtnRef.current &&
				!resetBtnRef.current.contains(event.target as Node)
			) onClose()
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	if (loading) return (
		<motion.div
			className={s.main}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className={s.loadingcontainer}>
				<span>Загрузка изображения...</span>
			</div>
		</motion.div>
	)

	return (
		<motion.div
			className={s.main}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className={s.container}>
				<div
					className={s.imagediv}
				>
					<canvas
						ref={canvasRef}
						width={canvasSize.width}
						height={canvasSize.height}
					/>
				</div>

				<div className={s.btns}>
					<div className={s.top}>
						<button
							className={s.resetbtn}
							ref={resetBtnRef}
						>Сброс</button>
					</div>
					<div className={s.bottom}>
						<div
							className={s.bottombtns}
							ref={bottomBtnsRef}
						>
							<div className={s.left}>
								<button
									className={s.cancelbtn}
									onClick={onClose}
								>Отмена</button>
							</div>
							<div className={s.mid}>
								<button><ResizeIcon /></button>
								<button><PaintIcon /></button>
							</div>
							<div className={s.left}>
								<button className={s.savebtn}>Сохранить</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
})

interface NicsBarImageEditorProps {
	file: File
	onFinish: (url: string) => void
	onClose: () => void
}
