import Skeleton from 'react-loading-skeleton'
import s from '../FriendListModal.module.scss'

export const ListPending = ({
   length = 6
}) => {
   return (
      <>
         {Array(length).fill('').map((_, i) => (
            <Skeleton
               key={i}
               height={61}
               width={'100%'}
               borderRadius={15}
               baseColor='#383838'
               highlightColor='#787878'
            />
         ))}
      </>
   )
}

interface ListPending {
   length?: number
}