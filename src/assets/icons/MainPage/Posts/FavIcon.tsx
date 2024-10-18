import { IconWithSize } from '../../../../shared/utils/globalTypes'

export const FavIcon = ({size=20,color="#B5B5B5"}: IconWithSize) => {
   return (
      <svg width={size} height={size} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M10.5 0C10.6949 0.000103825 10.886 0.0543301 11.0518 0.156606C11.2176 0.258881 11.3515 0.405167 11.4387 0.579081L14.1476 5.98035L20.1009 6.84321C20.2948 6.87129 20.477 6.95295 20.6268 7.07893C20.7767 7.20491 20.8881 7.37019 20.9487 7.55607C21.0092 7.74196 21.0163 7.94103 20.9693 8.13076C20.9223 8.32049 20.823 8.49331 20.6826 8.62967L16.3494 12.8435L17.3238 18.785C17.3551 18.9774 17.3319 19.1746 17.257 19.3546C17.182 19.5345 17.0582 19.69 16.8995 19.8036C16.7407 19.9172 16.5533 19.9844 16.3584 19.9976C16.1635 20.0108 15.9687 19.9695 15.796 19.8783L10.5 17.0761L5.20395 19.8783C5.03128 19.9695 4.83653 20.0108 4.64159 19.9976C4.44666 19.9844 4.25928 19.9172 4.10054 19.8036C3.9418 19.69 3.81798 19.5345 3.74303 19.3546C3.66807 19.1746 3.64494 18.9774 3.67625 18.785L4.65062 12.8435L0.317395 8.62967C0.177011 8.49331 0.0776913 8.32049 0.0306719 8.13076C-0.0163474 7.94103 -0.00918968 7.74196 0.0513354 7.55607C0.11186 7.37019 0.223337 7.20491 0.373154 7.07893C0.522971 6.95295 0.705149 6.87129 0.899078 6.84321L6.85241 5.98035L9.56133 0.579081C9.64847 0.405167 9.78243 0.258881 9.94821 0.156606C10.114 0.0543301 10.3051 0.000103825 10.5 0ZM10.5 3.38862L8.48616 7.40553C8.41058 7.5566 8.2995 7.68721 8.16238 7.78621C8.02526 7.88522 7.86618 7.9497 7.69868 7.97414L3.30561 8.61082L6.50802 11.724C6.62904 11.8416 6.71982 11.9866 6.77264 12.1467C6.82547 12.3067 6.83879 12.4771 6.81146 12.6434L6.09013 17.0384L10.0076 14.965C10.1592 14.8847 10.3283 14.8427 10.5 14.8427C10.6717 14.8427 10.8408 14.8847 10.9924 14.965L14.9099 17.0384L14.1885 12.6434C14.1614 12.4773 14.1748 12.3071 14.2276 12.1472C14.2804 11.9874 14.3711 11.8426 14.492 11.7251L17.6944 8.61082L13.3024 7.97414C13.1349 7.9497 12.9758 7.88522 12.8387 7.78621C12.7015 7.68721 12.5905 7.5566 12.5149 7.40553L10.5 3.38862Z" fill={color} />
      </svg>
   )
}