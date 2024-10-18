import { IconOnlyWithWidthAndHeightAndStyle } from '../../../shared/utils/globalTypes'

export const Light = ({ width = 1100, height = 620, style = {} }: IconOnlyWithWidthAndHeightAndStyle) => {
   return (
      <svg style={style} width={width} height={height} viewBox={`0 0 1100 620`} fill="none" xmlns="http://www.w3.org/2000/svg">
         <g filter="url(#filter0_f_35_4)">
            <circle cx="666" cy="666" r="366" fill="white" fillOpacity="0.08" />
         </g>
         <defs>
            <filter id="filter0_f_35_4" x="0" y="0" width="1332" height="1332" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
               <feFlood floodOpacity="0" result="BackgroundImageFix" />
               <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
               <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_35_4" />
            </filter>
         </defs>
      </svg>
   )
}