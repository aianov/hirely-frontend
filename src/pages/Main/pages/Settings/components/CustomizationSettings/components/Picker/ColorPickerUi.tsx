import { ColorPickerIcon } from '@/assets/icons/MainPage/MyProfile/Settings/ColorPickerIcon'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { RgbaColor, RgbaColorPicker } from 'react-colorful'
import s from './ColorPickerUi.module.scss'

export const ColorPickerUi = observer(({
   currentColor,
   color,
   onChange,
   defaultColor,
   isShort = false
}: ColorPickerUiT) => {
   let colors = [...[defaultColor]]
   const otherColors = ['rgba(113, 255, 136, 1)', 'rgba(84, 163, 255, 1)', 'rgba(255, 98, 220, 1)', 'rgba(0, 255, 194, 1)']
   if (!isShort) colors = [...colors, ...otherColors]
   const [open, setOpen] = useState(false)
   const colorPickerRef = useRef<HTMLDivElement | null>(null)

   // Логика если ты нажал outside колор пикера
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            colorPickerRef.current &&
            !colorPickerRef.current.contains(event.target as Node)
         ) setOpen(false)
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [])

   return (
      <div className={s.main}>
         <div className={s.left}>
            {colors.map((c, i) => {
               return (
                  <div
                     className={s.pickerbtn}
                     key={i}
                     style={currentColor == c ? { border: '1.5px solid #FF8A00' } : {}}
                  >
                     <button
                        className={s.pickercolor}
                        style={{ background: c }}
                        onClick={() => {
                           let initialColor = { r: 0, g: 0, b: 0, a: 1 }
                           const matchResult = c.match(/[\d.]+/g)
                           if (matchResult) {
                              const [r, g, b, a] = matchResult.map(Number)
                              initialColor = { r, g, b, a: a !== undefined ? a : 1 }
                           }
                           onChange(initialColor)
                        }}
                     ></button>
                  </div>
               )
            })}
         </div>

         <div className={s.right}>
            <button
               onClick={() => setOpen(prev => !prev)}
               className={s.colorpickerbtn}
            >
               <ColorPickerIcon />
            </button>
            {open && (
               <div
                  style={{ position: 'absolute', right: '0', top: '110%', zIndex: '1' }}
                  ref={colorPickerRef}
               >
                  <RgbaColorPicker
                     style={{ position: 'absolute', right: '0', top: '110%', zIndex: '1' }}
                     color={color}
                     onChange={onChange}
                  />
               </div>
            )}
         </div>
      </div>
   )
})

interface ColorPickerUiT {
   currentColor: string
   color?: RgbaColor
   onChange: (newColor: RgbaColor) => void
   defaultColor: string
   isShort?: boolean
}