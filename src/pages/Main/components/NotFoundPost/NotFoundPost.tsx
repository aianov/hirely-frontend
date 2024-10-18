import { NotFoundIcon } from '@/assets/icons/Ui/NotFoundIcon'
import s from './NotFoundPost.module.scss'
import { observer } from 'mobx-react-lite'

export const NotFoundPost = observer(({
   title = 'Посты не найдены'
}: NotFoundPostProps) => {
   return (
      <div className={s.main}>
         <NotFoundIcon />
         <p className={s.text}>{title}</p>
      </div>
   )
})

interface NotFoundPostProps {
   title?: string
}