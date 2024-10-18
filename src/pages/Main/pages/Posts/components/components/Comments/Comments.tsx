
import { CommentDeleteModal } from '@/features/Modals/CommentDeleteModal/CommentDeleteModal'
import { createReplyToCommentHandler, getChildCommentsHandler, postComLikeOrDislike } from '@/shared/utils/commentsLogic'
import { parseCommentText } from '@/shared/utils/globalJsxData'
import { formatDate } from '@/shared/utils/someFunctions'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCommentsIcon } from '../../../../../../../assets/icons/MainPage/Posts/CheckComments'
import { ComDislike } from '../../../../../../../assets/icons/MainPage/Posts/ComDislike'
import { ComDislikeActive } from '../../../../../../../assets/icons/MainPage/Posts/ComDislikeActive'
import { ComLike } from '../../../../../../../assets/icons/MainPage/Posts/ComLike'
import { ComLikeActive } from '../../../../../../../assets/icons/MainPage/Posts/ComLikeActive'
import { CommentIcon } from '../../../../../../../assets/icons/MainPage/Posts/CommentIcon'
import { EmojiIcon } from '../../../../../../../assets/icons/MainPage/Posts/EmojiIcon'
import { SendMessageIcon } from '../../../../../../../assets/icons/MainPage/Posts/SendMessageIcon'
import { defaultLogo } from '../../../../../../../shared/utils/globalData'
import { YourPreviewCommentType } from '../../../../../../../shared/utils/globalTypes'
import { socialNumberFormat } from '../../../../../../../shared/utils/parsers'
import { profileStore } from '../../../../../../../stores/profile-store/profile-store'
import { CommentSelectList } from '../CommentSelectList/CommentSelectList'
import { EditComment } from '../EditComment/EditComment'
import s from './Comments.module.scss'
import { ChildComments } from './components/ChildComments'
import { CommentsPending } from './components/CommentsPending'

export const Comments = observer(({
   comment,
   setComments,
   postId,
   setRealComments
}: PreviewCommentProps) => {
   const { profile } = profileStore
   const [commentCount, setCommentCount] = useState(comment?.repliesCount)

   const [parentId] = useState(comment?.id)
   const [isComLike, setIsComLike] = useState(comment?.userLiked)
   const [isComDislike, setIsComDislike] = useState(comment?.userDisliked)
   const [comLikes, setComLikes] = useState(comment?.likesCount)
   const [comDislikes, setComDislikes] = useState(comment?.dislikesCount)
   const [isLikOrDis, setIsLikOrDis] = useState(false)

   const [childCommentsPage, setChildCommentsPage] = useState(1)
   const [childCommentsList, setChildCommentsList] = useState([])
   const [childCommentsStaticLength, setChildCommentsStaticLength] = useState(0)
   const [loading, setLoading] = useState(false)

   const [isReply, setIsReply] = useState(false)

   const [commentText, setCommentText] = useState('')

   const [selectedForReply, setSelectedForReply] = useState<SelectedForReplyT>()
   const inpRef = useRef<HTMLInputElement>(null)
   const [isCommentDisabled, setIsCommentDisabled] = useState(false)

   // EDIT
   const [isCommentEditing, setIsCommentEditing] = useState(false)
   const [commentContent, setCommentContent] = useState(comment?.content)
   const editCom = (inputText: string) => setCommentContent(inputText)

   // DELETE
   const [isCommentDeleting, setIsCommentDeleting] = useState(false)

   useEffect(() => { setCommentCount(comment?.repliesCount) }, [comment?.repliesCount])

   return (
      <>
         <CommentDeleteModal
            setComments={setRealComments}
            isCommentDeleting={isCommentDeleting}
            setIsCommentDeleting={setIsCommentDeleting}
            deleteCallback={() => {
               setComments(prev => prev - 1)
            }}
         />
         <div className={s.comcontainer}>
            <div
               className={s.parentcom}
               style={{ borderTop: '1px solid #BABABA', background: profile?.tag === comment?.author?.tag ? 'rgb(53, 53, 53)' : '#272727' }}
            >
               <div className={s.parentcomcontainer}>
                  <div className={s.left}>
                     <Link
                        className={s.imgdiv}
                        to={comment?.author?.tag == profile?.tag ? '/main/my-profile' : `/main/profile/${comment?.author?.tag}`}
                     >
                        <img
                           src={comment?.author?.more?.logo ? comment?.author?.more?.logo : defaultLogo}
                           alt="previewcommentlogo"
                        />
                     </Link>
                  </div>

                  <div className={s.right}>
                     <div
                        className={s.rightcom}
                     >
                        <div className={s.rightcomtopdiv}>
                           <Link
                              className={s.names}
                              to={comment?.author?.tag == profile?.tag ? '/main/my-profile' : `/main/profile/${comment?.author?.tag}`}
                           >
                              <span className={s.name}>{comment?.author?.name}</span>
                              <div className={s.who}>{comment?.author?.more?.who ? comment?.author?.more?.who : 'Самурай'}</div>
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
                              setCom={setRealComments}
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

                           <span className={s.date} style={themeStore.currentTheme.secondTextColor}>{formatDate(comment?.createdAt)}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {isReply && (
            <div className={s.replycommentdiv} style={{ background: profile?.id === comment?.authorId ? 'rgb(53, 53, 53)' : '#272727' }}>
               <div className={s.replycommentdivcontainer}>
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
                                 setChildCommentsList
                              )
                           }}
                        >
                           <SendMessageIcon width={18} height={23} />
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         {loading ? (
            <div style={{ padding: '10px 15px 10px 70px' }}>
               <CommentsPending length={comment?.repliesCount - childCommentsList?.length > 10 ? 10 : comment?.repliesCount - childCommentsList?.length} />
            </div>
         ) : (
            <>
               {childCommentsList?.map((child: any) => (
                  <Fragment key={child.id}>
                     <ChildComments
                        child={child}
                        setComments={setComments}
                        setParentComments={setCommentCount}
                        setChildCommentsList={setChildCommentsList}
                        parentId={comment?.id}
                        postId={postId}
                     />
                  </Fragment>
               ))}
            </>
         )}

         {comment?.repliesCount !== 0 && comment?.repliesCount - childCommentsStaticLength !== 0 && !loading && (
            <div className={s.checkreplies} style={{ background: profile?.id === comment?.authorId ? 'rgb(53, 53, 53)' : '#272727' }}>
               <button
                  className={s.checkcommentscontainer}
                  onClick={() => {
                     setChildCommentsPage(prev => {
                        getChildCommentsHandler(
                           comment?.id,
                           childCommentsPage,
                           loading,
                           setLoading,
                           setChildCommentsStaticLength,
                           setChildCommentsList
                        )
                        return prev + 1
                     })
                  }}
               >
                  <div className={s.textcontainer}>
                     <span>Посмотреть {comment?.repliesCount - childCommentsStaticLength} ответов</span>
                  </div>
                  <CheckCommentsIcon size={14} />
               </button>
            </div>
         )}
      </>
   )
})

interface PreviewCommentProps {
   comment: YourPreviewCommentType
   setComments: Dispatch<SetStateAction<number>>
   postId: number
   setRealComments: Dispatch<React.SetStateAction<YourPreviewCommentType[]>>
}

export interface SelectedForReplyT {
   tag: string
   id: number
   name: string
   userId: string
   type: string
}