import { EditMsgIcon } from '@/assets/icons/MainPage/Chats/EditMsgIcon'
import { orangeBtnBgColor, settings } from '@/shared/utils/globalData'
import { messageApiStore } from '@/stores/api/chat-store/message-store/message-store'
import { messageStore } from '@/stores/chat-store/message-store/message-store'
import { themeStore } from '@/stores/theme/theme-store'
import { Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import Slider from "react-slick"
import s from './UploadedImagesModal.module.scss'

export const UploadedImagesModal = observer(() => {
   const { currentTheme } = themeStore
   const {
      isFileUploaded,
      setIsFileUploaded,
      setMessageFile,
      messageFile,
      setSelectedImage,
      originalMessageFile
   } = messageStore
   const { addMessageAction } = messageApiStore

   const [imageSrcs, setImageSrcs] = useState<string[]>([])

   const loadImages = async () => {
      const srcs: string[] = []
      for (const file of messageFile) {
         const reader = new FileReader()
         const promise = new Promise<string>((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = () => reject(new Error('Error reading file'))
            reader.readAsDataURL(file)
         })
         srcs.push(await promise)
      }
      setImageSrcs(srcs)
   }

   useEffect(() => { loadImages() }, [messageFile])

   return (
      <Modal
         open={isFileUploaded}
         onCancel={() => {
            setMessageFile([])
            setSelectedImage(null)
            setIsFileUploaded(false)
         }}
         footer={<></>}
         centered
         className={`${s.modal} modal-without-close`}
      >
         <div className={s.main}>
            <div className={s.top}>
               <span>Отправка изображений</span>
            </div>

            <div className={s.mid}>
               <Slider
                  {...settings}
               >
                  {imageSrcs?.map((imageSrc, index) => {
                     const key = nanoid()
                     return (
                        <div
                           key={key}
                           className={s.midslider}
                        >
                           <button
                              onClick={() => {
                                 const file = originalMessageFile[index]
                                 console.log(file)
                                 if (file) {
                                    setSelectedImage({ url: URL.createObjectURL(file), id: index, fileName: file.name, file: file })
                                 }
                              }}
                              className={s.editimgbtn}
                              style={currentTheme.btnsTheme}
                           >
                              <EditMsgIcon size={15} />
                           </button>
                           <img src={imageSrc} alt={`slide-${index}`} />
                        </div>
                     )
                  })}
               </Slider>
            </div>

            <div className={s.bot}>
               <button
                  className={s.cancel}
                  style={currentTheme.btnsTheme}
                  onClick={() => {
                     setMessageFile([])
                     setIsFileUploaded(false)
                  }}
               >
                  <span style={currentTheme.textColor}>Отмена</span>
               </button>
               <button
                  style={{ background: orangeBtnBgColor }}
                  onClick={() => addMessageAction()}
               >
                  Отправить
               </button>
            </div>
         </div>
      </Modal>
   )
})
