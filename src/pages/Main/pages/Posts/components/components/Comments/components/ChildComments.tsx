import { ComDislike } from '@/assets/icons/MainPage/Posts/ComDislike'
import { ComDislikeActive } from '@/assets/icons/MainPage/Posts/ComDislikeActive'
import { ComLike } from '@/assets/icons/MainPage/Posts/ComLike'
import { ComLikeActive } from '@/assets/icons/MainPage/Posts/ComLikeActive'
import { CommentIcon } from '@/assets/icons/MainPage/Posts/CommentIcon'
import { observer } from 'mobx-react-lite'
import { profileStore } from '../../../../../../../../stores/profile-store/profile-store'

import { EmojiIcon } from '@/assets/icons/MainPage/Posts/EmojiIcon'
import { SendMessageIcon } from '@/assets/icons/MainPage/Posts/SendMessageIcon'
import { CommentDeleteModal } from '@/features/Modals/CommentDeleteModal/CommentDeleteModal'
import { createReplyToChildCommentHandler, postComLikeOrDislike } from '@/shared/utils/commentsLogic'
import { parseCommentText } from '@/shared/utils/globalJsxData'
import { formatDate } from '@/shared/utils/someFunctions'
import { themeStore } from '@/stores/theme/theme-store'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { defaultLogo } from '../../../../../../../../shared/utils/globalData'
import { YourPreviewChildCommentType } from '../../../../../../../../shared/utils/globalTypes'
import { socialNumberFormat } from '../../../../../../../../shared/utils/parsers'
import s from '../../../../Posts.module.scss'
import { CommentSelectList } from '../../CommentSelectList/CommentSelectList'
import { EditComment } from '../../EditComment/EditComment'
import { SelectedForReplyT } from '../Comments'

export const ChildComments = observer(({
   child,
   setComments,
   setParentComments,
   setChildCommentsList,
   parentId,
   postId
}: PreviewChildCommentProps) => {
   const navigate = useNavigate()
   const { profile } = profileStore

   const [isChildComLike, setIsChildComLike] = useState(child?.userLiked)
   const [isChildComDislike, setIsChildComDislike] = useState(child?.userDisliked)
   const [childComLikes, setChildComLikes] = useState(child?.likesCount)
   const [childComDislikes, setChildComDislikes] = useState(child?.dislikesCount)
   const [childComReplies, setChildComReplies] = useState(child?.repliesCount)
   const [childIsLikOrDis, setChildIsLikOrDis] = useState(false)

   const [isReply, setIsReply] = useState(false)
   const [isCommentDisabled, setIsCommentDisabled] = useState(false)
   const [commentText, setCommentText] = useState('')
   const inpRef = useRef<HTMLInputElement>(null)
   const [selectedForReply, setSelectedForReply] = useState<SelectedForReplyT>()

   // EDIT
   const [isCommentEditing, setIsCommentEditing] = useState(false)
   const [commentContent, setCommentContent] = useState(child?.content)
   const editCom = (inputText: string) => setCommentContent(inputText)

   // DELETE
   const [isCommentDeleting, setIsCommentDeleting] = useState(false)

   return (
      <div className={s.realchildcom} style={{ background: profile?.tag === child?.author?.tag ? 'rgb(53, 53, 53)' : '#272727' }}>
         <CommentDeleteModal
            // @ts-ignore
            setComments={setChildCommentsList}
            isCommentDeleting={isCommentDeleting}
            setIsCommentDeleting={setIsCommentDeleting}
            deleteCallback={() => {
               setComments(prev => prev - 1)
               setParentComments(prev => prev - 1)
            }}
         />
         <div className={s.top}>
            <div className={s.topcontainer}>
               <div className={s.left}>
                  <Link
                     className={s.imgdiv}
                     to={child?.author?.tag == profile?.tag ? '/main/my-profile' : `/main/profile/${child?.author?.tag}`}
                  >
                     <img
                        src={child?.author?.more?.logo ? child?.author?.more?.logo : defaultLogo}
                        alt="previewchildcommentlogo"
                     />
                  </Link>
               </div>

               <div className={s.right}>
                  <div className={s.rightcom}>
                     <div className={s.rightcomtopdiv}>
                        <div className={s.names}>
                           <Link
                              className={s.namesleft}
                              to={child?.author?.tag == profile?.tag ? '/main/my-profile' : `/main/profile/${child?.author?.tag}`}
                           >
                              <span className={s.name}>{child?.author?.name}</span>
                              <div className={s.who}>{child?.author?.more?.who ? child?.author?.more?.who : 'Самурай'}</div>
                           </Link>
                           <div className={s.addressedto}>
                              <span className={s.arrow}>{'->'}</span>
                              <button
                                 onClick={() => {
                                    if (child.to.id == profile?.id) {
                                       navigate(`/main/my-profile`)
                                       return
                                    }
                                    navigate(`/main/profile/${child?.addressedToTag}`)
                                 }}
                              >
                                 <span className={s.addressed}>{child?.addressedToName}</span>
                              </button>
                           </div>
                        </div>
                        <CommentSelectList
                           // @ts-ignore
                           com={child}
                           setIsCommentEditing={setIsCommentEditing}
                           setIsCommentDeleting={setIsCommentDeleting}
                           callback={() => {
                              setComments(prev => prev - 1)
                              setParentComments(prev => prev - 1)
                           }}
                        />
                     </div>

                     {isCommentEditing ? (
                        <EditComment
                           setIsCommentEditing={setIsCommentEditing}
                           // @ts-ignore
                           com={child}
                           setCom={setChildCommentsList}
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
                                       child?.id,
                                       'Like',
                                       childIsLikOrDis,
                                       setChildIsLikOrDis,
                                       isChildComLike,
                                       isChildComDislike,
                                       setChildComLikes,
                                       setIsChildComLike,
                                       setChildComDislikes,
                                       setIsChildComDislike
                                    )
                                 }}
                                 disabled={childIsLikOrDis}
                              >
                                 {isChildComLike ? <ComLikeActive /> : <ComLike color={themeStore.currentTheme.secondTextColor.color} />}
                                 <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(childComLikes)}</span>
                              </button>
                              <button
                                 className={s.dislike}
                                 onClick={() => {
                                    postComLikeOrDislike(
                                       child?.id,
                                       'Dislike',
                                       childIsLikOrDis,
                                       setChildIsLikOrDis,
                                       isChildComLike,
                                       isChildComDislike,
                                       setChildComLikes,
                                       setIsChildComLike,
                                       setChildComDislikes,
                                       setIsChildComDislike
                                    )
                                 }}
                                 disabled={childIsLikOrDis}
                              >
                                 {isChildComDislike ? <ComDislikeActive /> : <ComDislike color={themeStore.currentTheme.secondTextColor.color} />}
                                 <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(childComDislikes)}</span>
                              </button>
                           </div>
                           <button
                              className={s.com}
                              style={themeStore.currentTheme.btnsTheme}
                              onClick={() => {
                                 setSelectedForReply({ tag: child?.author?.tag, id: parentId, name: child?.author?.name, userId: child?.authorId, type: 'preview-child' })
                                 setCommentText(`@${child?.author?.tag}, `)
                                 setIsReply(true)
                                 setTimeout(() => { if (inpRef?.current) inpRef.current.focus() }, 0)
                              }}
                           >
                              <CommentIcon size={14} />
                              <span>{socialNumberFormat(childComReplies)}</span>
                           </button>
                        </div>

                        <span className={s.date} style={themeStore.currentTheme.secondTextColor}>{formatDate(child?.createdAt)}</span>
                     </div>
                  </div>
               </div>
            </div>

            {isReply && (
               <div className={s.replychildcommentdiv} style={{ background: profile?.id === child?.authorId ? 'rgb(53, 53, 53)' : '#272727' }}>
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
                              createReplyToChildCommentHandler(
                                 postId,
                                 { content: commentText, parentId: parentId, addressedToName: selectedForReply?.name, addressedToTag: selectedForReply?.tag },
                                 selectedForReply?.name,
                                 selectedForReply?.userId,
                                 setComments,
                                 setParentComments,
                                 setChildComReplies,
                                 setIsCommentDisabled,
                                 setIsReply,
                                 setChildCommentsList
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
      </div>
   )
})

interface PreviewChildCommentProps {
   child: YourPreviewChildCommentType
   setComments: Dispatch<SetStateAction<number>>
   setParentComments: Dispatch<SetStateAction<number>>
   setChildCommentsList: Dispatch<SetStateAction<never[]>>
   parentId: number
   postId: number
}