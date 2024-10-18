import { IconWithSize } from '../../../../shared/utils/globalTypes'

export const CheckCommentsIcon = ({size = 17, color = 'white'}: IconWithSize) => {
   return (
      <svg width={size} height={size} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M15.97 10.8817L10.98 15.8223L5.98997 10.8817" stroke={color} strokeOpacity="0.68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
         <path d="M0.999983 1.00042L4.32665 1.00042C6.09122 1.00042 7.78352 1.69445 9.03126 2.92984C10.279 4.16522 10.98 5.84077 10.98 7.58787L10.98 9.39941" stroke={color} strokeOpacity="0.68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
   )
}