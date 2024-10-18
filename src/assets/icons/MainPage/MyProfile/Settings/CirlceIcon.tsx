import { IconWithSize } from '@/shared/utils/globalTypes'

export const CircleIcon = ({ size = 18, color = "white" }: IconWithSize) => {
   return (
      <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
         <circle cx="9" cy="9" r="8.5" stroke={color} />
      </svg>
   )
}