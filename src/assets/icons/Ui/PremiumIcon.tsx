import { IconOnlyWithSize } from '@/shared/utils/globalTypes'

export const PremiumIcon = ({ size = 28 }: IconOnlyWithSize) => {
   return (
      <svg width={size} height={size} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect x="1" y="1" width="17" height="16.1053" rx="4" fill="url(#paint0_linear_861_4027)" />
         <rect x="1" y="1" width="17" height="16.1053" rx="4" fill="black" fillOpacity="0.26" />
         <g filter="url(#filter0_d_861_4027)">
            <path d="M5.67255 11.2887L4.57898 5.13734L7.58629 7.93339L9.50003 4.57812L11.4138 7.93339L14.4211 5.13734L13.3275 11.2887H5.67255ZM13.3275 12.9663C13.3275 13.3018 13.1088 13.5255 12.7807 13.5255H6.21933C5.89126 13.5255 5.67255 13.3018 5.67255 12.9663V12.4071H13.3275V12.9663Z" fill="url(#paint1_linear_861_4027)" />
         </g>
         <defs>
            <filter id="filter0_d_861_4027" x="0.578979" y="0.578125" width="17.8422" height="16.9473" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
               <feFlood floodOpacity="0" result="BackgroundImageFix" />
               <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
               <feOffset />
               <feGaussianBlur stdDeviation="2" />
               <feComposite in2="hardAlpha" operator="out" />
               <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.43 0" />
               <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_861_4027" />
               <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_861_4027" result="shape" />
            </filter>
            <linearGradient id="paint0_linear_861_4027" x1="1.5" y1="8" x2="13.2137" y2="3.581" gradientUnits="userSpaceOnUse">
               <stop offset="0.0049" stopColor="#FF7A00" />
               <stop offset="0.005" stopColor="#FF7A00" />
               <stop offset="0.547821" stopColor="#FF0099" />
               <stop offset="1" stopColor="#BD00FF" />
            </linearGradient>
            <linearGradient id="paint1_linear_861_4027" x1="19" y1="3" x2="17.492" y2="15.6659" gradientUnits="userSpaceOnUse">
               <stop offset="0.005" stopColor="#FF7C03" />
               <stop offset="0.5025" stopColor="#FF54BA" />
               <stop offset="1" stopColor="#EAADFF" />
            </linearGradient>
         </defs>
      </svg>
   )
}