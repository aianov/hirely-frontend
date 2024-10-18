
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import s from '../../../../Posts.module.scss'
import { observer } from 'mobx-react-lite'
import 'react-loading-skeleton/dist/skeleton.css'

export const CommentsPending = observer(({ length = 6 }: { length: number }) => {
   console.log(length)
   return (
      <div className={s.pending}>
         <SkeletonTheme baseColor="#3b3b3b" highlightColor="#444">
            {Array(length)?.fill('')?.map((_, i) => <Skeleton key={i} height={110} width={'100%'} borderRadius={30} />)}
         </SkeletonTheme>
      </div>
   )
})