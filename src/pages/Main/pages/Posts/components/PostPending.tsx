
import Skeleton from 'react-loading-skeleton'
import s from '../Posts.module.scss'
import { observer } from 'mobx-react-lite'
import 'react-loading-skeleton/dist/skeleton.css'

export const PostPending = observer(() => {
   return (
      <div className={s.pending}>
         {Array(6).fill('').map((_, i) => (
            <Skeleton
               key={i}
               height={300}
               width={'100%'}
               borderRadius={30}
            />
         ))}
      </div>
   )
})