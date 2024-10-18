import { EditMsgIcon } from '@/assets/icons/MainPage/Chats/EditMsgIcon'
import { ReplyIcon } from '@/assets/icons/MainPage/Chats/ReplyIcon'
import { EmojiIcon } from '@/assets/icons/MainPage/Posts/EmojiIcon'
import { SendMessageIcon } from '@/assets/icons/MainPage/Posts/SendMessageIcon'
import { BackArrowLeftIcon } from '@/assets/icons/Ui/BackArrowLeftIcon'
import { CloseIcon } from '@/assets/icons/Ui/CloseIcon'
import { FileIcon } from '@/assets/icons/Ui/FileIcon'
import { SendMessageToUserIcon } from '@/assets/icons/Ui/SendMessageIcon'
import { MessageDeleteModal } from '@/features/Modals/Chats/MessageDeleteModal/MessageDeleteModal'
import { PinMsgModal } from '@/features/Modals/Chats/PinMsgModal/PinMsgModal'
import { UploadedImagesModal } from '@/features/Modals/Chats/UploadedImagesModal/UploadedImagesModal'
import { TypingAnimation } from '@/shared/animations/TypingAnimation/TypingAnimation'
import { GetAvatar } from '@/shared/ui/GetAvatar'
import { GetWho } from '@/shared/ui/GetWho'
import { NicsBarImageEditor } from '@/shared/ui/NicsBarImageEditor/NicsBarImageEditor'
import { getProfileStatuses } from '@/shared/utils/globalJsxData'
import { isMobile } from '@/shared/utils/someFunctions'
import { chatSocketStore } from '@/stores/chat-store/chat-socket-store/chat-socket-store'
import { chatStore } from '@/stores/chat-store/chat-store'
import { messageStore } from '@/stores/chat-store/message-store/message-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { themeStore } from '@/stores/theme/theme-store'
import { AnimatePresence, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import s from './Chat.module.scss'
import { ChatMessage } from './components/ChatMessage/ChatMessage'
import { ChatSelect } from './components/ChatSelect/ChatSelect'

export const Chat = observer(() => {
   const [replyMainWidth, setReplyMainWidth] = useState<number>(0)
   const navigate = useNavigate()
   const { chatId } = useParams()

   const inpRef = useRef<HTMLInputElement | null>(null)
   const fileInputRef = useRef<null | HTMLInputElement>(null)
   const replyDivRef = useRef<HTMLDivElement | null>(null)

   const { currentTheme } = themeStore
   const { profile: { id } } = profileStore
   const { selectedImage, setSelectedImage } = messageStore

   // CHAT STORE
   const { selectedChat, userLineStatus, setSelectedChatId, selectedChatId } = chatStore

   // MESSAGES STORE
   const {
      updateMessage,
      message,
      isReplying,
      messageToReply,
      editMessage,
      isMsgEditing,
      clearAll,
      selectedMessage,
      setEditMessage,
      handleChatFileUpload,
      isFileUploaded
   } = messageStore

   useEffect(() => { chatId && setSelectedChatId(chatId) }, [])

   useEffect(() => {
      if (!selectedChatId) return
      inpRef.current?.focus()
      chatSocketStore.connectChatSocket()
      return () => { chatSocketStore.socket && chatSocketStore.socket.emit('leave-chat', { chatId: selectedChatId, userId: id }) }
   }, [selectedChatId])

   useEffect(() => {
      if (replyDivRef.current) {
         const replyDivPadding = parseFloat(getComputedStyle(replyDivRef.current).paddingLeft) + parseFloat(getComputedStyle(replyDivRef.current).paddingRight)
         setReplyMainWidth(replyDivRef.current.offsetWidth - replyDivPadding)
      }
   }, [isReplying, isMsgEditing])

   useEffect(() => {
      if (isReplying || isMsgEditing) inpRef.current?.focus()
      const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && isReplying && clearAll()
      document.addEventListener('keydown', handleKeyDown)
      return () => { document.removeEventListener('keydown', handleKeyDown) }
   }, [isReplying, clearAll, isMsgEditing])

   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => chatSocketStore.handleInput(e, isMsgEditing ? setEditMessage : updateMessage)
   const handleFileClick = () => fileInputRef.current && fileInputRef.current.click()

   const handleSendMessage = (e?: FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault()
      if (!message || !chatId) return
      chatSocketStore.handleSendMessage(updateMessage, chatId)
   }

   const handleEditMessage = (e?: FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault()
      if (!editMessage) return
      chatSocketStore.handleEditMessage(setEditMessage)
   }

   return (
      <div className={s.main}>
         <MessageDeleteModal />
         <PinMsgModal />
         {isFileUploaded && <UploadedImagesModal />}
         <AnimatePresence>
            {(selectedImage !== null) && (
               <NicsBarImageEditor
                  file={selectedImage?.file}
                  onFinish={(url) => console.log('asd', url)}
                  onClose={() => setSelectedImage(null)}
               />
            )}
         </AnimatePresence>

         <div
            className={s.maincontainer}
            style={{
               background: currentTheme.bgTheme.background,
               border: currentTheme.bgTheme.border
            }}
         >
            <div className={s.top}>
               {/* LEFT */}
               <button className={s.left} onClick={() => navigate('/main/chats')}>
                  <BackArrowLeftIcon width={25} height={18} color={currentTheme.secondTextColor.color} />
                  <span style={currentTheme.secondTextColor}>Назад</span>
               </button>

               {/* MID */}
               <div className={s.mid}>
                  <div className={s.midright}>
                     {!isMobile() && <GetAvatar size={40} url={selectedChat?.user?.more?.logo!} />}
                  </div>
                  <div className={s.midleft}>
                     <div className={s.midtop}>
                        <span className={s.name} style={currentTheme.textColor}>{selectedChat?.user?.name}</span>
                        <div className={s.statuses}>
                           <GetWho who={selectedChat?.user?.more?.who!} />
                           {selectedChat?.user?.more?.p_lang?.[0] && <>{getProfileStatuses(selectedChat.user.more.p_lang[0], 20)}</>}
                        </div>
                     </div>
                     <div className={s.line}>
                        {userLineStatus === 'inchat' ? (
                           <SendMessageToUserIcon size={10} color='rgb(0, 210, 0)' />
                        ) : userLineStatus === 'typing' ? (
                           <TypingAnimation />
                        ) : (
                           <div
                              className={s.isonline}
                              style={{ background: (userLineStatus === 'online') ? 'rgb(0, 210, 0)' : currentTheme.secondTextColor.color }}
                           ></div>
                        )}
                        <span style={currentTheme.textColor}>{userLineStatus === 'inchat' ? 'В чате' : userLineStatus === 'online' ? 'Онлайн' : userLineStatus === 'typing' ? `печатает` : 'Был(а) недавно'}</span>
                     </div>
                  </div>
               </div>

               {/* RIGHT */}
               <div className={s.right}>
                  {isMobile() ? (
                     <GetAvatar size={40} url={selectedChat?.user?.more?.logo!} style={{ cursor: 'pointer' }} />
                  ) : (
                     <ChatSelect chat={selectedChat!} />
                  )}
               </div>
            </div>

            <div className={s.transition}>
               <ChatMessage inpRef={inpRef} />

               <div
                  className={s.bot}
                  // style={{
                  //    height: (isReplying || isMsgEditing) ? '14%' : '8%',
                  //    padding: (isReplying || isMsgEditing) ? '0' : '15px 20px'
                  // }}
                  ref={replyDivRef}
               >
                  <AnimatePresence>
                     {(isReplying || isMsgEditing) && (
                        <motion.div
                           className={s.replydiv}
                           initial="hidden"
                           animate="visible"
                           exit="exit"
                           variants={{
                              hidden: { opacity: 0, y: 20, height: 0 },
                              visible: { opacity: 1, y: 0, height: '50px' },
                              exit: { opacity: 0, y: 20, height: 0 },
                           }}
                           transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                           <div className={s.replycontainer}>
                              <div className={s.left}>
                                 <div className='df jcc aic'>
                                    {isReplying ? (
                                       <ReplyIcon size={27} color={currentTheme.textColor.color} />
                                    ) : (
                                       <EditMsgIcon size={20} color={currentTheme.textColor.color} />
                                    )}
                                 </div>
                                 <div
                                    className={s.replymain}
                                    style={{ maxWidth: `${replyMainWidth - 120}px` }}
                                 >
                                    <span className={s.toptext} style={currentTheme.secondTextColor}>
                                       {isReplying
                                          ? `Ответ на ${messageToReply?.sender?.id == id ? 'себя' : messageToReply.sender?.name}`
                                          : 'Редактирование'}
                                    </span>
                                    <span className={s.bottext} style={currentTheme.textColor}>
                                       {isReplying ? messageToReply.content : selectedMessage?.content}
                                    </span>
                                 </div>
                              </div>
                              <div className={s.right}>
                                 <button onClick={clearAll}>
                                    <CloseIcon />
                                 </button>
                              </div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
                  <div
                     className={s.botbot}
                     style={{
                        // height: (isReplying || isMsgEditing) ? '100%' : '100%',
                        // padding: (isReplying || isMsgEditing) ? '10px 20px' : '0',
                        borderTop: '1px solid rgb(83, 83, 83)'
                     }}
                  >
                     <form
                        onSubmit={isMsgEditing ? handleEditMessage : handleSendMessage}
                        style={{
                           // height: isReplying ? '100%' : '100%'
                        }}
                     >
                        <div className={s.inpdiv}>
                           <input
                              style={{ ...currentTheme.textColor, zIndex: '100' }}
                              type="text"
                              placeholder='Сообщение...'
                              value={isMsgEditing ? editMessage : message}
                              onChange={handleInput}
                              maxLength={10000}
                              ref={inpRef}
                           />
                           <button
                              type='button'
                           >
                              <EmojiIcon color={currentTheme.secondTextColor.color} />
                           </button>

                           <div>
                              <input
                                 type="file"
                                 ref={fileInputRef}
                                 style={{ display: 'none' }}
                                 accept=".png, .jpg, .jpeg"
                                 onChange={handleChatFileUpload}
                                 multiple
                              />
                              <button
                                 type='button'
                                 onClick={handleFileClick}
                              >
                                 <FileIcon color={currentTheme.secondTextColor.color} />
                              </button>
                           </div>
                        </div>
                        <button
                           className='df jcc aic'
                           type='button'
                           onClick={() => handleSendMessage()}
                        >
                           <SendMessageIcon color={currentTheme.secondTextColor.color} />
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div >
   )
})
