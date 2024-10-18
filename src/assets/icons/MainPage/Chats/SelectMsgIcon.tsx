import { IconWithSize } from '@/shared/utils/globalTypes'

export const SelectMsgIcon = ({ size = 12, color = 'white'}: IconWithSize) => {
   return (
      <svg width={size} height={size} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M5.55745 8.6596L3.35938 6.42497L3.9089 5.86631L5.55745 7.54228L9.09556 3.94531L9.64509 4.50397L5.55745 8.6596Z" fill={color} />
         <path d="M6.49888 11.9071C9.59365 11.9071 12.1025 9.39834 12.1025 6.30357C12.1025 3.2088 9.59365 0.7 6.49888 0.7C3.40412 0.7 0.895312 3.2088 0.895312 6.30357C0.895312 9.39834 3.40412 11.9071 6.49888 11.9071Z" stroke={color} strokeWidth="0.6" />
      </svg>
   )
}