import { IconWithWidthAndHeight } from '../../../shared/utils/globalTypes'

export const UserIcon = ({width = 18, height = 22, color = 'white'}: IconWithWidthAndHeight) => {
   return (
      <svg width={width} height={height} viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M8.5 8.6C10.8472 8.6 12.75 6.67482 12.75 4.3C12.75 1.92518 10.8472 0 8.5 0C6.15279 0 4.25 1.92518 4.25 4.3C4.25 6.67482 6.15279 8.6 8.5 8.6Z" fill={color} fillOpacity="0.68" />
         <path d="M17 16.6625C17 19.3338 17 21.5 8.5 21.5C0 21.5 0 19.3338 0 16.6625C0 13.9911 3.80587 11.825 8.5 11.825C13.1941 11.825 17 13.9911 17 16.6625Z" fill={color} fillOpacity="0.68" />
      </svg>
   )
}