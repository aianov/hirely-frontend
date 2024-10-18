import { IconWithSize } from '../../../shared/utils/globalTypes'

export const BackIcon = ({size = 30, color = 'black'}: IconWithSize) => {
   return (
      <svg width={size} height={size} viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fillRule="evenodd" clipRule="evenodd" d="M0.126859 1.01364C0.253099 0.713516 0.466784 0.457026 0.740897 0.2766C1.01501 0.0961754 1.33724 -8.17075e-05 1.66685 5.20408e-08H18.3334C19.8655 2.95371e-08 21.3826 0.297456 22.798 0.875385C24.2135 1.45331 25.4996 2.3004 26.5829 3.36827C27.6663 4.43615 28.5256 5.7039 29.1119 7.09914C29.6982 8.49438 30 9.9898 30 11.5C30 13.0102 29.6982 14.5056 29.1119 15.9009C28.5256 17.2961 27.6663 18.5639 26.5829 19.6317C25.4996 20.6996 24.2135 21.5467 22.798 22.1246C21.3826 22.7025 19.8655 23 18.3334 23H3.3335C2.89148 23 2.46756 22.8269 2.155 22.5188C1.84244 22.2107 1.66685 21.7929 1.66685 21.3571C1.66685 20.9214 1.84244 20.5036 2.155 20.1955C2.46756 19.8874 2.89148 19.7143 3.3335 19.7143H18.3334C20.5435 19.7143 22.6631 18.8489 24.2259 17.3084C25.7887 15.7679 26.6667 13.6786 26.6667 11.5C26.6667 9.32144 25.7887 7.2321 24.2259 5.69162C22.6631 4.15115 20.5435 3.28571 18.3334 3.28571H5.69016L8.67847 6.23136C8.98207 6.5412 9.15005 6.95619 9.14626 7.38694C9.14246 7.8177 8.96718 8.22975 8.65817 8.53434C8.34916 8.83894 7.93114 9.01172 7.49415 9.01546C7.05716 9.01921 6.63615 8.85362 6.32182 8.55436L0.488523 2.80436C0.255304 2.57461 0.0964562 2.28184 0.0320783 1.96309C-0.0322996 1.64433 0.000685139 1.31392 0.126859 1.01364Z" fill={color} />
      </svg>
   )
}