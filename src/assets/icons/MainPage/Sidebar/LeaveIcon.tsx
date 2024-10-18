import { IconWithSize } from '../../../../shared/utils/globalTypes'

export const LeaveIcon = ({size = 24, color = "white"}: IconWithSize) => {
   return (
      <svg width={size} height={size} viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fillRule="evenodd" clipRule="evenodd" d="M8.3842 0.509982C7.5004 1.29377 7.5004 2.7276 7.5004 5.594V19.4047C7.5004 22.2712 7.5004 23.705 8.3842 24.4888C9.268 25.2726 10.6193 25.0375 13.322 24.5663L16.2346 24.0587C19.2273 23.5362 20.7236 23.275 21.6124 22.1774C22.5012 21.0786 22.5012 19.491 22.5012 16.3146V8.68417C22.5012 5.509 22.5012 3.92141 21.6137 2.82261C20.7236 1.72505 19.226 1.46378 16.2334 0.942505L13.3232 0.433728C10.6206 -0.0375475 9.26925 -0.27256 8.38545 0.511232M11.2506 10.2105C11.7681 10.2105 12.1882 10.6493 12.1882 11.1906V13.8082C12.1882 14.3495 11.7681 14.7882 11.2506 14.7882C10.7331 14.7882 10.3131 14.3495 10.3131 13.8082V11.1906C10.3131 10.6493 10.7331 10.2105 11.2506 10.2105Z" fill={color} fillOpacity="0.68" />
         <path d="M5.68405 3.12384C3.11142 3.12759 1.7701 3.18384 0.915049 4.03889C1.4902e-07 4.95394 0 6.42652 0 9.37418V15.6245C0 18.5709 1.4902e-07 20.0435 0.915049 20.9598C1.7701 21.8136 3.11142 21.8711 5.68405 21.8748C5.6253 21.0948 5.6253 20.1948 5.6253 19.221V5.77773C5.6253 4.80268 5.6253 3.90263 5.68405 3.12384Z" fill={color} fillOpacity="0.68" />
      </svg>
   )
}