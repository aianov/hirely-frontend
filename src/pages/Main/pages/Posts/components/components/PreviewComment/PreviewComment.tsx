
import { EmojiIcon } from '@/assets/icons/MainPage/Posts/EmojiIcon'
import { SendMessageIcon } from '@/assets/icons/MainPage/Posts/SendMessageIcon'
import { CommentDeleteModal } from '@/features/Modals/CommentDeleteModal/CommentDeleteModal'
import { createReplyToCommentHandler, postComLikeOrDislike } from '@/shared/utils/commentsLogic'
import { parseCommentText } from '@/shared/utils/globalJsxData'
import { formatDate } from '@/shared/utils/someFunctions'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ComDislike } from '../../../../../../../assets/icons/MainPage/Posts/ComDislike'
import { ComDislikeActive } from '../../../../../../../assets/icons/MainPage/Posts/ComDislikeActive'
import { ComLike } from '../../../../../../../assets/icons/MainPage/Posts/ComLike'
import { ComLikeActive } from '../../../../../../../assets/icons/MainPage/Posts/ComLikeActive'
import { CommentIcon } from '../../../../../../../assets/icons/MainPage/Posts/CommentIcon'
import { defaultLogo } from '../../../../../../../shared/utils/globalData'
import { YourPreviewChildCommentType, YourPreviewCommentType } from '../../../../../../../shared/utils/globalTypes'
import { socialNumberFormat } from '../../../../../../../shared/utils/parsers'
import { profileStore } from '../../../../../../../stores/profile-store/profile-store'
import { SelectedForReplyT } from '../Comments/Comments'
import { CommentSelectList } from '../CommentSelectList/CommentSelectList'
import { EditComment } from '../EditComment/EditComment'
import { PreviewChildComment } from './components/PreviewChildComment'
import s from './PreviewComment.module.scss'

export const PreviewComment = observer(({
   comment,
   setYourPreviewComments,
   setComments,
   postId
}: PreviewCommentProps) => {
   const [commentCount, setCommentCount] = useState(comment?.repliesCount)
   const { profile: { tag, name, more } } = profileStore

   const [parentId] = useState(comment?.id)
   const [isComLike, setIsComLike] = useState(comment?.userLiked)
   const [isComDislike, setIsComDislike] = useState(comment?.userDisliked)
   const [comLikes, setComLikes] = useState(comment?.likesCount)
   const [comDislikes, setComDislikes] = useState(comment?.dislikesCount)
   const [isLikOrDis, setIsLikOrDis] = useState(false)

   const [yourPreviewChildComments, setYourPreviewChildComments] = useState<YourPreviewChildCommentType[]>([])

   // FOR REPLY
   const [isReply, setIsReply] = useState(false)
   const [selectedForReply, setSelectedForReply] = useState<SelectedForReplyT>()
   const inpRef = useRef<HTMLInputElement>(null)
   const [commentText, setCommentText] = useState('')
   const [isCommentDisabled, setIsCommentDisabled] = useState(false)

   // EDIT
   const [isCommentEditing, setIsCommentEditing] = useState(false)
   const [commentContent, setCommentContent] = useState(comment?.content)
   const editCom = (inputText: string) => setCommentContent(inputText)

   // DELETE
   const [isCommentDeleting, setIsCommentDeleting] = useState(false)

   useEffect(() => {
      setCommentCount(comment?.repliesCount)
   }, [comment?.repliesCount])

   return (
      <>
         <CommentDeleteModal
            setComments={setYourPreviewComments}
            isCommentDeleting={isCommentDeleting}
            setIsCommentDeleting={setIsCommentDeleting}
            deleteCallback={() => {
               setComments(prev => prev - 1)
               setCommentCount(prev => prev - 1)
            }}
         />
         <div
            className={s.parentcom}
            style={{ background: '#353535', borderBottom: '1px solid #BABABA' }}
         >
            <div className={s.parentcomcontainer}>
               <div className={s.left}>
                  <Link style={{ display: 'block' }} className={s.imgdiv} to={comment?.author?.tag == tag ? '/main/my-profile' : `/main/profile/${comment?.author?.tag}`}>
                     <img
                        src={more?.logo ? more?.logo : defaultLogo}
                        alt="previewcommentlogo"
                     />
                  </Link>
               </div>

               <div className={s.right}>
                  <div
                     className={s.rightcom}
                     style={{}}
                  >
                     <div className={s.rightcomtopdiv}>
                        <Link className={s.names} to={comment?.author?.tag == tag ? '/main/my-profile' : `/main/profile/${comment?.author?.tag}`}>
                           <span className={s.name}>{name}</span>
                           <div className={s.who}>{more?.who ? more?.who : 'Самурай'}</div>
                        </Link>
                        <CommentSelectList
                           // @ts-ignore
                           com={comment}
                           setIsCommentEditing={setIsCommentEditing}
                           setIsCommentDeleting={setIsCommentDeleting}
                        />
                     </div>

                     {isCommentEditing ? (
                        <EditComment
                           setIsCommentEditing={setIsCommentEditing}
                           // @ts-ignore
                           com={comment}
                           // @ts-ignore
                           setCom={setYourPreviewComments}
                           editCom={editCom}
                        />
                     ) : (
                        <>{parseCommentText(commentContent)}</>
                     )}

                     <div className={s.bottom}>
                        <div className={s.btns}>
                           <div className={s.dislikeandlike}>
                              <button
                                 className={s.like}
                                 onClick={() => {
                                    postComLikeOrDislike(
                                       comment?.id,
                                       'Like',
                                       isLikOrDis,
                                       setIsLikOrDis,
                                       isComLike,
                                       isComDislike,
                                       setComLikes,
                                       setIsComLike,
                                       setComDislikes,
                                       setIsComDislike
                                    )
                                 }}
                                 disabled={isLikOrDis}
                              >
                                 {isComLike ? <ComLikeActive /> : <ComLike color={themeStore.currentTheme.secondTextColor.color} />}
                                 <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(comLikes)}</span>
                              </button>
                              <button
                                 className={s.dislike}
                                 onClick={() => {
                                    postComLikeOrDislike(
                                       comment?.id,
                                       'Dislike',
                                       isLikOrDis,
                                       setIsLikOrDis,
                                       isComLike,
                                       isComDislike,
                                       setComLikes,
                                       setIsComLike,
                                       setComDislikes,
                                       setIsComDislike
                                    )
                                 }}
                                 disabled={isLikOrDis}
                              >
                                 {isComDislike ? <ComDislikeActive /> : <ComDislike color={themeStore.currentTheme.secondTextColor.color} />}
                                 <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(comDislikes)}</span>
                              </button>
                           </div>
                           <button
                              className={s.com}
                              style={themeStore.currentTheme.btnsTheme}
                              onClick={() => {
                                 setIsReply(true)
                                 setSelectedForReply({ tag: comment?.author?.tag, id: parentId, name: comment?.author?.name, userId: comment?.authorId, type: 'preview' })
                                 setCommentText(`@${comment?.author?.tag}, `)
                                 setTimeout(() => { if (inpRef?.current) inpRef.current.focus() }, 0)
                              }}
                           >
                              <CommentIcon size={14} color={themeStore.currentTheme.secondTextColor.color} />
                              <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(commentCount)}</span>
                           </button>
                        </div>
                        <span className={s.date}>{formatDate(comment?.createdAt)}</span>
                     </div>
                  </div>
               </div>
            </div>

            {isReply && (
               <div
                  className={s.replycommentdiv}
                  style={{
                     background: tag === comment?.author?.tag ? 'rgb(53, 53, 53)' : '#272727',
                     borderBottom: comment?.repliesCount == 0 ? 'none' : '1px solid #BABABA'
                  }}
               >
                  <form>
                     <div className={s.left}>
                        <div className={s.imgdiv}>
                           <img src={profileStore?.profile?.more?.logo ? profileStore?.profile?.more?.logo : defaultLogo} alt="your logo" />
                        </div>
                     </div>

                     <div className={s.mid}>
                        <div className={s.inpdiv}>
                           <input
                              placeholder='Введите текст'
                              value={commentText}
                              onChange={e => {
                                 console.log(e.target.value)
                                 if (selectedForReply && !e.target.value.includes(`${selectedForReply?.tag}, `)) {
                                    console.log('1')
                                    console.log(selectedForReply)
                                    console.log(e.target.value.slice(selectedForReply?.tag?.length))
                                    setCommentText(e.target.value.slice(selectedForReply?.tag?.length))
                                    setIsReply(false)
                                    return
                                 }
                                 setCommentText(e.target.value)
                              }}
                              ref={inpRef}
                           />
                           <EmojiIcon />
                        </div>
                     </div>

                     <div className={s.right}>
                        <div
                           className={s.closereply}
                           onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              setIsReply(false)
                           }}
                        >
                           <span>x</span>
                        </div>
                        <button
                           disabled={isCommentDisabled}
                           className='df jcc aic'
                           style={{ cursor: isCommentDisabled ? "not-allowed" : "pointer", paddingTop: '5px' }}
                           onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              if (!commentText?.split(' ')?.[1] || !selectedForReply) return
                              createReplyToCommentHandler(
                                 postId,
                                 { content: commentText, parentId: comment?.id, addressedToName: selectedForReply?.name, addressedToTag: selectedForReply?.tag },
                                 selectedForReply?.name,
                                 selectedForReply?.userId,
                                 setCommentCount,
                                 setIsCommentDisabled,
                                 setComments,
                                 setIsReply,
                                 // @ts-ignore
                                 setYourPreviewChildComments
                              )
                           }}
                        >
                           <SendMessageIcon width={18} height={23} />
                        </button>
                     </div>
                  </form>
               </div>
            )}
         </div>

         {/* // ====================== CHILD COM ======================== */}
         {yourPreviewChildComments?.map((child: YourPreviewChildCommentType) => (
            <Fragment key={child.id}>
               <PreviewChildComment
                  child={child}
                  setComments={setComments}
                  setParentComments={setCommentCount}
                  setComment={setYourPreviewChildComments}
                  parentId={child?.id}
                  postId={postId}
               />
            </Fragment>
         ))}
      </>
   )
})

interface PreviewCommentProps {
   comment: YourPreviewCommentType
   setComments: Dispatch<SetStateAction<number>>
   setYourPreviewComments: Dispatch<SetStateAction<YourPreviewCommentType[]>>
   postId: number
   isCommentDeleting: boolean
}