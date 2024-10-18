import { IconWithWidthAndHeight } from '@/shared/utils/globalTypes'

export const SettingsList = ({ width = 20, height = 5, color = 'white' }: IconWithWidthAndHeight) => {
   return (
      <svg width={width} height={height} viewBox="0 0 25 5" fill="none" xmlns="http://www.w3.org/2000/svg">
         <circle cx="2.5" cy="2.5" r="2.5" fill={color} />
         <circle cx="12.5" cy="2.5" r="2.5" fill={color} />
         <circle cx="22.5" cy="2.5" r="2.5" fill={color} />
      </svg>
   )
}