import s from './BRadiusPicker.module.scss'
import { observer } from 'mobx-react-lite'

export const BRadiusPicker = observer(({
   currentRadius,
   onChange,
   defaultRadius,
   isShort = false
}: BRadiusPickerProps) => {
   let bRadius = [...[defaultRadius]]
   const otherBRadius = [...[+defaultRadius+5+''], ...[+defaultRadius+10+''], ...[+defaultRadius+15+'']]
   if (!isShort) bRadius = [...bRadius, ...otherBRadius]
   return (
      <div className={s.main}>
         <div className={s.left}>
            {bRadius.map((r, i) => (
               <button
                  key={i}
                  className={s.box}
                  style={r == currentRadius ? { background: '#474747' } : {}}
                  onClick={() => onChange(r)}
               >
                  <span>{r}</span>
               </button>
            ))}
         </div>

         <div className={s.right}>
            <input
               value={currentRadius}
               type="number"
               onChange={e => onChange(e.target.value)}
            />
         </div>
      </div>
   )
})

interface BRadiusPickerProps {
   currentRadius: string
   onChange: (newRadius: string) => void
   defaultRadius: string
   isShort?: boolean
}