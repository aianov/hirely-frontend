import { IconWithSize } from '@/shared/utils/globalTypes'

export const AcceptIcon = ({size = 19, color = '#3dc90e'}: IconWithSize) => {
   return (
      <svg width={size} height={size} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M7.69325 16L0 8.4158L1.92331 6.51975L7.69325 12.2079L20.0767 0L22 1.89605L7.69325 16Z" fill={color} />
      </svg>
   )
}