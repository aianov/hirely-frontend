import { SpinLoader } from '@/shared/ui/SpinLoader'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { MessagePropsImages } from '../../../../ChatMessage'
import s from './MessageImages.module.scss'

export const MessageImages = observer(({
   img
}: MessageImagesProps) => {
   const [isImageLoading, setIsImageLoading] = useState(true)

   const handleImageLoad = () => setIsImageLoading(false)
   const handleImageError = () => setIsImageLoading(false)

   return (
      <button
         className={s.albumimgcontainer}
         key={img.id}
         style={isImageLoading ? { width: '100%' } : {}}
      >
         <div
            className={s.albumimgdiv}
            style={isImageLoading ? { width: '100%', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' } : {}}
         >
            {isImageLoading && <SpinLoader size={30} />}
            <img
               src={img.url}
               alt={`chat-img${img.id}`}
               onLoad={handleImageLoad}
               onError={handleImageError}
               style={{ display: isImageLoading ? 'none' : 'block' }}
            />
         </div>
      </button>
   )
})

interface MessageImagesProps {
   img: MessagePropsImages
}
