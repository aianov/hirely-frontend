import { IconWithWidthAndHeight } from '@/shared/utils/globalTypes'

export const MessageReadedIcon = ({width = 15, height = 10, color = 'white'}: IconWithWidthAndHeight) => {
   return (
      <svg width={width} height={height} viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M4.19632 10L0 5.25988L1.04908 4.07484L4.19632 7.62994L10.9509 0L12 1.18503L4.19632 10Z" fill={color} />
         <path d="M9.05181 10L6 6.875L6.45029 5.25988L9.05181 7.62994L15.9315 0L17 1.18503L9.05181 10Z" fill={color} />
      </svg>
   )
}