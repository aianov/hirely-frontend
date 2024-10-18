import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { CSSProperties } from 'react'
import { defaultLogo } from '../utils/globalData'

export const GetAvatar = observer(({
   size = 20,
   url = defaultLogo,
   status = '',
   statusSize = 15,
   circleClassName = '',
   style = {}
}: GetAvatarProps) => {
   return (
      <div
         className='df jcc aic get-avatar-ui'
         style={{
            minWidth: `${size}px`,
            maxWidth: `${size}px`,
            minHeight: `${size}px`,
            maxHeight: `${size}px`,
            ...style
         }}
      >
         <img
            alt="userlogo"
            src={url ? url : defaultLogo}
            style={{
               minWidth: `${size}px`,
               maxWidth: `${size}px`,
               minHeight: `${size}px`,
               maxHeight: `${size}px`,
               borderRadius: '50%'
            }}
         />
         {status && (
            <div
               className={`online-circle ${circleClassName}`}
               style={{
                  minWidth: `${statusSize}px`,
                  maxWidth: `${statusSize}px`,
                  minHeight: `${statusSize}px`,
                  maxHeight: `${statusSize}px`,
                  background: status == 'online' ? '#00931b' : '#bababa',
                  border: `3px solid ${themeStore.currentTheme.bgTheme.background}`,
               }}
            ></div>
         )}
      </div>
   )
})

export interface GetAvatarProps {
   size: number
   url: string
   status?: 'online' | 'offline' | ''
   statusSize?: number
   circleClassName?: string
   style?: CSSProperties
}