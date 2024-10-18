import { IconWithWidthAndHeight } from '../../../shared/utils/globalTypes'

export const PasswordCloseIcon = ({width = 22, height = 12, color = "white"}: IconWithWidthAndHeight) => {
   return (
      <svg width={width} height={height} viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M8.954 9.037L8.167 11.977L6.235 11.46L7.022 8.52C5.84404 8.08583 4.74919 7.45301 3.785 6.649L1.632 8.802L0.218 7.388L2.371 5.234C1.15508 3.77776 0.338088 2.03076 0 0.164L0.9 0C3.78934 2.08282 7.2622 3.2009 10.824 3.195C14.528 3.195 17.956 2.011 20.748 0L21.648 0.163C21.3103 2.03 20.4937 3.77734 19.278 5.234L21.431 7.388L20.017 8.802L17.863 6.649C16.8989 7.45335 15.804 8.08651 14.626 8.521L15.414 11.46L13.482 11.977L12.694 9.037C11.4563 9.24896 10.1917 9.24896 8.954 9.037Z" fill={color} fillOpacity="0.68" />
      </svg>
   )
}