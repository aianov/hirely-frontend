import { IconWithWidthAndHeight } from '@/shared/utils/globalTypes'

export const BackArrowLeftIcon = ({width = 33, height = 20, color = "#BABABA"}: IconWithWidthAndHeight) => {
   return (
      <svg width={width} height={height} viewBox="0 0 33 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M1.63489 10.0779L0.817444 9.2605C0.600645 9.4773 0.478848 9.77134 0.478848 10.0779C0.478848 10.3845 0.600645 10.6786 0.817444 10.8954L1.63489 10.0779ZM2.45233 10.8954L11.4442 1.9035L9.80933 0.268609L0.817444 9.2605L2.45233 10.8954ZM0.817444 10.8954L9.80933 19.8873L11.4442 18.2524L2.45233 9.2605L0.817444 10.8954ZM1.63489 11.2354L33 11.5647V8.92207L1.63325 8.92208L1.63489 11.2354Z" fill={color} />
      </svg>
   )
}