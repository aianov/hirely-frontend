import { IconWithWidthAndHeight } from '../../../shared/utils/globalTypes'

export const ArrowBottomIcon = ({ width = 12, height = 7, color = '#BABABA' }: IconWithWidthAndHeight) => {
   return (
      <svg width={width} height={height} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11 1L6 6L1 1" stroke={color} strokeLinecap="square" />
      </svg>
   )
}