import { EmojiIcon } from '@/assets/icons/MainPage/Posts/EmojiIcon'
import { SendMessageIcon } from '@/assets/icons/MainPage/Posts/SendMessageIcon'
import { CommentDeleteModal } from '@/features/Modals/CommentDeleteModal/CommentDeleteModal'
import { createReplyToChildCommentHandler, postComLikeOrDislike } from '@/shared/utils/commentsLogic'
import { parseCommentText } from '@/shared/utils/globalJsxData'
import { YourPreviewChildCommentType } from '@/shared/utils/globalTypes'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { Dispatch, Fragment, SetStateAction, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ComDislike } from '../../../../../../../assets/icons/MainPage/Posts/ComDislike'
import { ComDislikeActive } from '../../../../../../../assets/icons/MainPage/Posts/ComDislikeActive'
import { ComLike } from '../../../../../../../assets/icons/MainPage/Posts/ComLike'
import { ComLikeActive } from '../../../../../../../assets/icons/MainPage/Posts/ComLikeActive'
import { CommentIcon } from '../../../../../../../assets/icons/MainPage/Posts/CommentIcon'
import { GetPostsCommentLikesResponse } from '../../../../../../../shared/api/posts/types'
import { defaultLogo } from '../../../../../../../shared/utils/globalData'
import { socialNumberFormat } from '../../../../../../../shared/utils/parsers'
import { formatDate } from '../../../../../../../shared/utils/someFunctions'
import { authApiStore } from '../../../../../../../stores/api/auth/auth-store'
import { profileStore } from '../../../../../../../stores/profile-store/profile-store'
import { SelectedForReplyT } from '../Comments/Comments'
import { CommentSelectList } from '../CommentSelectList/CommentSelectList'
import { EditComment } from '../EditComment/EditComment'
import { PreviewChildComment } from '../PreviewComment/components/PreviewChildComment'
import s from './ChildComment.module.scss'

export const ChildComment = observer(({
   child,
   setComments,
   setParentComments,
   parentId,
   postId,
   setCommentsList
}: ChildCommentProps) => {
   const { isAuth } = authApiStore
   const { profile: { id, tag } } = profileStore

   const [childComLikes, setChildComLikes] = useState(child?.likesCount)
   const [childComDislikes, setChildComDislikes] = useState(child?.dislikesCount)
   const [childIsLikOrDis, setChildIsLikOrDis] = useState(false)

   const [childCommentsCount, setChildCommentsCount] = useState(child?.repliesCount)
   const [isChildComLike, setIsChildComLike] = useState(child?.userLiked || false)
   const [isChildComDislike, setIsChildComDislike] = useState(child?.userDisliked || false)

   const [yourPreviewChildComments, setYourPreviewChildComments] = useState<YourPreviewChildCommentType[]>([])

   // for reply
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
      <>
         <div className={s.childcom} style={id == child?.authorId ? { background: '#353535' } : {}}>
            <CommentDeleteModal
               // @ts-ignore
               setComments={setCommentsList}
               isCommentDeleting={isCommentDeleting}
               setIsCommentDeleting={setIsCommentDeleting}
               deleteCallback={() => {
                  setComments(prev => prev - 1)
                  setParentComments(prev => prev - 1)
               }}
            />
            <div className={s.childcomcontainer}>
               <div className={s.childcomwrapper}>
                  <Link className={s.left} to={child.authorId == id ? '/main/my-profile' : `/main/profile/${child.authorId}`}>
                     <div className={s.imgdiv}>
                        <img
                           src={child?.author?.more?.logo ? child?.author?.more?.logo : defaultLogo}
                           alt="previewcommentlogo"
                        />
                     </div>
                  </Link>

                  <div className={s.right}>
                     <div className={s.rightcom}>
                        <div className={s.rightcomtopdiv}>
                           <div className={s.names}>
                              <Link className={s.namesleft} to={child.authorId == id ? '/main/my-profile' : `/main/profile/${child.authorId}`}>
                                 <span className={s.name}>{child?.author?.name}</span>
                                 <div className={s.who}>{child?.author?.more?.who ? child?.author?.more?.who : 'Самурай'}</div>
                              </Link>
                              <div className={s.addressedto}>
                                 <span className={s.arrow}>{'->'}</span>
                                 <Link to={child?.addressedTo?.tag == tag ? '/main/my-profile' : `/main/profile/${child?.addressedToTag}`}>
                                    <span className={s.addressed}>{child?.addressedToName}</span>
                                 </Link>
                              </div>
                           </div>
                           <CommentSelectList
                              // @ts-ignore
                              com={child}
                              setIsCommentEditing={setIsCommentEditing}
                              setIsCommentDeleting={setIsCommentDeleting}
                           />
                        </div>

                        {isCommentEditing ? (
                           <EditComment
                              setIsCommentEditing={setIsCommentEditing}
                              // @ts-ignore
                              com={child}
                              // @ts-ignore
                              setCom={setCommentsList}
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
                                    setIsReply(true)
                                    setSelectedForReply({ tag: child?.author?.tag, id: parentId, name: child?.author?.name, userId: child?.authorId, type: '' })
                                    setCommentText(`@${child?.author?.tag}, `)
                                    setTimeout(() => { if (inpRef?.current) inpRef.current.focus() }, 0)
                                 }}
                              >
                                 <CommentIcon size={14} color={themeStore.currentTheme.secondTextColor.color} />
                                 <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(childCommentsCount)}</span>
                              </button>
                           </div>

                           <span className={s.date} style={themeStore.currentTheme.secondTextColor}>{formatDate(child?.createdAt)}</span>
                        </div>
                     </div>
                  </div>
               </div>
               {isReply && (
                  <div
                     className={s.replycommentdiv}
                     style={{
                        background: id === child?.authorId ? 'rgb(53, 53, 53)' : '#272727',
                        borderBottom: child?.repliesCount == 0 ? 'none' : '1px solid #BABABA'
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
                                 createReplyToChildCommentHandler(
                                    postId,
                                    { content: commentText, parentId: child?.id, addressedToName: selectedForReply?.name, addressedToTag: selectedForReply?.tag },
                                    selectedForReply?.name,
                                    selectedForReply?.userId,
                                    setComments,
                                    setParentComments,
                                    setChildCommentsCount,
                                    setIsCommentDisabled,
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
         </div>
         {/* // ====================== CHILD COM ======================== */}
         {yourPreviewChildComments?.map((child: YourPreviewChildCommentType) => (
            <Fragment key={child.id}>
               <PreviewChildComment
                  child={child}
                  setComments={setComments}
                  setParentComments={setParentComments}
                  setComment={setYourPreviewChildComments}
                  parentId={child?.id}
                  postId={postId}
               />
            </Fragment>
         ))}
      </>
   )
})

interface ChildCommentProps {
   child: GetPostsCommentLikesResponse
   setComments: Dispatch<SetStateAction<number>>
   setParentComments: Dispatch<SetStateAction<number>>
   parentId: number
   postId: number
   setCommentsList: Dispatch<React.SetStateAction<GetPostsCommentLikesResponse[]>>
}