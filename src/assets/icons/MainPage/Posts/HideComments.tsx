import { IconWithSize } from '../../../../shared/utils/globalTypes'

export const HideComments = ({size = 17, color = "white"}: IconWithSize) => {
   return (
      <svg width={size} height={size} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M15.9702 5.94059L10.9802 1L5.99022 5.94059" stroke={color} strokeOpacity="0.68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
         <path d="M0.999983 15.8216L4.32665 15.8216C6.09122 15.8216 7.78352 15.1276 9.03126 13.8922C10.279 12.6568 10.98 10.9813 10.98 9.23415L10.98 7.42261" stroke={color} strokeOpacity="0.68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
   )
}