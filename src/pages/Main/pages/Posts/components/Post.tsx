import { DownloadIcon } from '@/assets/icons/MainPage/Posts/DownloadIcon'
import { ViewsIcon } from '@/assets/icons/MainPage/Posts/ViewsIcon'
import { CommentDeleteModal } from '@/features/Modals/CommentDeleteModal/CommentDeleteModal'
import { ImageLoader } from '@/shared/ui/ImageLoader/ImageLoader'
import { createMainCommentHandler, createReplyToCommentHandler, postComLikeOrDislike, postFavHandler, postLikeHandler } from '@/shared/utils/commentsLogic'
import { defaultLogo } from '@/shared/utils/globalData'
import { getProfileStatuses, parseCommentText } from '@/shared/utils/globalJsxData'
import { postTagTranslationParse } from '@/shared/utils/translations'
import { themeStore } from '@/stores/theme/theme-store'
import { CheckCommentsIcon } from '@assets/icons/MainPage/Posts/CheckComments'
import { ComDislike } from '@assets/icons/MainPage/Posts/ComDislike'
import { ComDislikeActive } from '@assets/icons/MainPage/Posts/ComDislikeActive'
import { ComLike } from '@assets/icons/MainPage/Posts/ComLike'
import { ComLikeActive } from '@assets/icons/MainPage/Posts/ComLikeActive'
import { CommentIcon } from '@assets/icons/MainPage/Posts/CommentIcon'
import { EmojiIcon } from '@assets/icons/MainPage/Posts/EmojiIcon'
import { FavIcon } from '@assets/icons/MainPage/Posts/FavIcon'
import { FavIconActive } from '@assets/icons/MainPage/Posts/FavIconActive'
import { HeartIcon } from '@assets/icons/MainPage/Posts/HeartIcon'
import { HeartIconActive } from '@assets/icons/MainPage/Posts/HeartIconActive'
import { HideComments } from '@assets/icons/MainPage/Posts/HideComments'
import { SendMessageIcon } from '@assets/icons/MainPage/Posts/SendMessageIcon'
// @ts-ignore
import defaultlogo from '@images/userlogo.jpg'
import { GetPostsCommentResponse, GetPostsPostResponse, GetPostsPostResponseLikes } from '@shared/api/posts/types'
import { SortType, YourPreviewCommentType } from '@shared/utils/globalTypes'
import { socialNumberFormat } from '@shared/utils/parsers'
import { formatDate, handleDownload } from '@shared/utils/someFunctions'
import { authApiStore } from '@stores/api/auth/auth-store'
import { commentsStore } from '@stores/api/comments/comments-store'
import { commentStore } from '@stores/post/components/comment/comment-store'
import { profileStore } from '@stores/profile-store/profile-store'
import { convertFromRaw, EditorState } from 'draft-js'
import EmojiPicker from 'emoji-picker-react'
import { observer } from 'mobx-react-lite'
import { Fragment, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { Link } from 'react-router-dom'
import { ChildComment } from './components/ChildComment/ChildComment'
import { Comments, SelectedForReplyT } from './components/Comments/Comments'
import { CommentsPending } from './components/Comments/components/CommentsPending'
import { CommentSelectList } from './components/CommentSelectList/CommentSelectList'
import { EditComment } from './components/EditComment/EditComment'
import { PostSelect } from './components/PostSelect/PostSelect'
import { PreviewComment } from './components/PreviewComment/PreviewComment'
import s from './Post.module.scss'

export const Post = observer(({ post }: PostProps) => {
   // MOBX STORES
   const { isAuth } = authApiStore
   const { getCommentsFromPostAction } = commentsStore
   const { profile: { id } } = profileStore
   const { selectedUserCommentForReply, setSelectedUserCommentForReply } = commentStore
   const { currentTheme } = themeStore

   const inpRef: RefObject<HTMLInputElement> = useRef(null)

   // USE STATES
   const [isLiking, setIsLiking] = useState(false)
   const [isFaving, setIsFaving] = useState(false)
   const [isLikOrDis, setIsLikOrDis] = useState(false)
   const [likes, setLikes] = useState(post._count.likes)
   const [comments, setComments] = useState(post._count.comments)
   const [commentsList, setCommentsList] = useState<GetPostsCommentResponse[]>(post?.comments)
   const [comLikes, setComLikes] = useState(post?.comments?.[0]?.likesCount)
   const [comDislikes, setComDislikes] = useState(post?.comments?.[0]?.dislikesCount)
   const [favs, setFavs] = useState(post._count.favorites)
   const [isLiked, setIsLiked] = useState(post.userLiked)
   const [isFav, setIsFav] = useState(post.userFavorited)
   const [isComLike, setIsComLike] = useState(post?.comments?.[0]?.userLiked)
   const [isComDislike, setIsComDislike] = useState(post?.comments?.[0]?.userDisliked)
   const [comReplies, setComReplies] = useState(post?.comments?.[0]?.repliesCount)
   const [lastLikeTime, setLastLikeTime] = useState(0)

   // COMMENT
   const [comment, setComment] = useState('')
   const [isCommentDisabled, setIsCommentDisabled] = useState(false)
   const [yourPreviewComments, setYourPreviewComments] = useState<YourPreviewCommentType[]>([])
   const [commentContent, setCommentContent] = useState(post?.comments?.[0]?.content)
   const [mode, setMode] = useState<'preview' | 'list'>('preview')
   const [firstLoading, setFirstLoading] = useState(true)
   const [realComments, setRealComments] = useState<YourPreviewCommentType[]>([])
   const [realCommentsStaticLength, setRealCommentsStaticLength] = useState(0)
   const [commentsPage, setCommentsPage] = useState(1)
   const [commentsSort, setCommentsSort] = useState<SortType>('desc')
   const [mainCommentsCount, setMainCommentsCount] = useState(post?.mainCommentsCount)
   const [childComments, setChildComments] = useState(post?.comments[0]?.childComments)
   const [showEmojiPicker, setShowEmojiPicker] = useState(false)
   const emojiPickerRef = useRef<HTMLDivElement | null>(null)
   const buttonRef = useRef<HTMLDivElement | null>(null)
   const [isReply, setIsReply] = useState(false)
   const [selectedForReply, setSelectedForReply] = useState<SelectedForReplyT>()
   const inpRefReply = useRef<HTMLInputElement>(null)
   const [commentText, setCommentText] = useState('')
   const [isCommentEditing, setIsCommentEditing] = useState(false)
   const [isCommentDeleting, setIsCommentDeleting] = useState(false)
   const [isCommentDeletingPreview, setIsCommentDeletingPreview] = useState(false)
   const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
   const [isLightboxOpen, setIsLightboxOpen] = useState(false)
   const previewCommentLogo = post?.comments?.[0]?.author?.more?.logo
   const commentName = post?.comments?.[0]?.author?.name
   const who = post?.comments?.[0]?.author?.more?.who

   const editCom = (inputText: string) => setCommentContent(inputText)
   const postLikeComponent = () => postLikeHandler(post?.id, isLiking, setIsLiking, isLiked, setIsLiked, setLikes,)
   const handleLikeButtonClick = useCallback(() => {
      const now = Date.now()
      if (now - lastLikeTime < 500) postLikeComponent()
      else setLastLikeTime(now)
   }, [postLikeHandler, lastLikeTime])

   const getRealCommentsList = useCallback(async (postId: number, page: number, sort: SortType) => {
      const res = await getCommentsFromPostAction(postId, page, sort)
      setFirstLoading(false)
      setRealCommentsStaticLength(prev => prev + res?.data?.comments?.length)
      // @ts-ignore
      setRealComments(prev => [...prev, ...res?.data?.comments])
   }, [getCommentsFromPostAction])

   const hideCommentHandler = useCallback(() => {
      setMode('preview')
      setCommentsPage(1)
      setMainCommentsCount(post?.mainCommentsCount)
      setRealComments([])
      setRealCommentsStaticLength(0)
   }, [post])

   // Логика если ты нажал outside эмодзи пикера
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            emojiPickerRef.current &&
            !emojiPickerRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
         ) setShowEmojiPicker(false)
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [])

   useEffect(() => {
      if (!post || !post.content) return
      try {
         if (!post.content.blocks || !post.content.entityMap) return
         const contentState = convertFromRaw(post.content)
         setEditorState(EditorState.createWithContent(contentState))
      }
      catch (err) { console.log(err) }
   }, [post])

   const [isImageLoading, setIsImageLoading] = useState(true)
   const handleImageLoad = () => setIsImageLoading(false)

   return (
      <div className={s.post} style={themeStore.currentTheme.bgTheme}>
         {/* ================================================================ PREVIEW MODE ================================================================ */}
         <>
            <div className={s.posttop}>
               <Link className={s.posttopleft} to={`/main/profile/${post?.author?.tag}`}>
                  <div className={s.imgdiv}>
                     <img src={post?.author?.more?.logo ? post?.author?.more?.logo : defaultlogo} alt="" />
                  </div>
                  <div className={s.names}>
                     <span style={themeStore.currentTheme.textColor}>{post?.author?.name}</span>
                     <div className={s.tags}>
                        <div className={s.tag} style={themeStore.currentTheme.textColor}>{post?.author?.more?.who ? post?.author?.more?.who : 'Самурай'}</div>
                        {getProfileStatuses(post?.author?.more?.p_lang?.[0], 18)}
                     </div>
                  </div>
               </Link>
               <div className={s.posttopright}>
                  <div className='df fdc aife'>
                     <div className={s.posttoprightleft}>
                        {(formatDate(post?.createdAt)?.includes('Вчера') || formatDate(post?.createdAt)?.includes('Сегодня')) ? (
                           <span className={s.toptext} style={themeStore.currentTheme.textColor}>{formatDate(post?.createdAt, 'default', post?.createdAt !== post?.updatedAt)}</span>
                        ) : (
                           <>
                              <span className={s.toptext} style={themeStore.currentTheme.textColor}>{formatDate(post?.createdAt, 'time')}</span>
                              <span className={s.bottext} style={themeStore.currentTheme.secondTextColor}>{formatDate(post?.createdAt, 'date')}</span>
                           </>
                        )}
                     </div>
                     {post?.createdAt !== post?.updatedAt && (
                        <span className={s.postedited} style={currentTheme.secondTextColor}>изменено</span>
                     )}
                  </div>
                  <PostSelect post={post} />
               </div>
            </div>

            <div
               className={s.postcontent}
               onClick={handleLikeButtonClick}
               style={!post?.content?.blocks?.[0]?.text ? { marginBottom: '10px' } : {}}
            >
               {post?.tags?.length !== 0 && (
                  <div className={s.tags}>
                     {post?.tags?.map((tag, ind) => (
                        <div key={ind} className={s.tag}>{postTagTranslationParse(tag)}</div>
                     ))}
                  </div>
               )}

               {post?.images?.[0] && (
                  <ImageLoader
                     src={post?.images?.[0]}
                     alt={`post-${post?.id}`}
                     className={s.postimgdiv}
                     imageStyle={currentTheme.btnsTheme}
                     callback={() => setIsLightboxOpen(true)}
                     style={currentTheme?.btnsTheme}
                  />
               )}
               {isLightboxOpen && (
                  <Lightbox
                     mainSrc={post.images[0]}
                     onCloseRequest={() => setIsLightboxOpen(false)}
                     wrapperClassName={s.lightbox}
                     toolbarButtons={[
                        <button
                           key="download"
                           onClick={() => handleDownload(post?.images[0], `${post?.author?.name}-post`)}
                           style={{ padding: '10px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#fff' }}
                        >
                           <DownloadIcon size={30} />
                        </button>
                     ]}
                  />
               )}

               <p className={s.postcontenttitle}>{post?.title}</p>
               {typeof post?.content == 'string' ? (
                  <p className={s.postcontentsubtitle}>{post?.content}</p>
               ) : editorState && post?.content?.blocks?.[0]?.text && (
                  <>
                     <Editor
                        editorState={editorState}
                        readOnly={true}
                        toolbarHidden={true}
                        editorStyle={{ color: 'white' }}
                     />
                     {post?.hashtags?.length !== 0 && <p className={s.hashtags}>{post?.hashtags.map((str: string) => '#' + str).join(' ')}</p>}
                  </>
               )}
            </div>

            {post?._count?.likes > 2 && (
               <div className={s.postlikes}>
                  <div className={s.images}>
                     {post?.likes?.map((like: GetPostsPostResponseLikes) => (
                        <div className={s.imgdiv} key={like.id}>
                           <img src={like?.logo ? like?.logo : defaultlogo} alt={`like${like.id}`} />
                        </div>
                     ))}
                  </div>
               </div>
            )}

            <div className={s.postbtns} style={post?._count?.comments !== 0 ? { borderBottom: "1px solid #BABABA", padding: '10px 20px 10px 20px' } : {}}>
               <div className={s.postleft}>
                  <button
                     className={s.likebtn}
                     style={themeStore.currentTheme.btnsTheme}
                     onClick={postLikeComponent}
                  >
                     {isLiked ? <HeartIconActive size={23} /> : <HeartIcon size={23} color={themeStore.currentTheme.secondTextColor.color} />}
                     <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(likes)}</span>
                  </button>

                  <button
                     style={themeStore.currentTheme.btnsTheme}
                     className={s.likebtn}
                     onClick={() => { inpRef && inpRef.current?.focus() }}
                  >
                     <CommentIcon size={23} />
                     <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(comments)}</span>
                  </button>

                  <button
                     style={themeStore.currentTheme.btnsTheme}
                     className={s.likebtn}
                     onClick={() => {
                        postFavHandler(
                           post?.id,
                           isFaving,
                           setIsFaving,
                           isFav,
                           setIsFav,
                           setFavs
                        )
                     }}
                  >
                     {isFav ? <FavIconActive size={23} /> : <FavIcon size={23} color={themeStore.currentTheme.secondTextColor.color} />}
                     <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(favs)}</span>
                  </button>
               </div>

               <div className={s.postright}>
                  <ViewsIcon width={20} height={15} color={themeStore.currentTheme.secondTextColor.color} />
                  <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(post?.viewsCount)}</span>
               </div>
            </div>

            {/* ================================================================ INPUT FOR COMMENT ================================================================ */}
            {isAuth && (
               <div className={s.commentdiv}>
                  <form>
                     <div className={s.left}>
                        <div className={s.imgdiv}>
                           <img src={profileStore?.profile?.more?.logo ? profileStore?.profile?.more?.logo : defaultlogo} alt="your logo" />
                        </div>
                     </div>

                     <div className={s.mid}>
                        <div className={s.inpdiv} style={{ position: 'relative' }}>
                           <input
                              placeholder='Введите текст'
                              value={comment}
                              onChange={e => {
                                 e.preventDefault()
                                 e.stopPropagation()
                                 if (selectedUserCommentForReply && !e.target.value.includes(selectedUserCommentForReply?.tag)) {
                                    setComment(e.target.value.slice(selectedUserCommentForReply?.tag?.length))
                                    setSelectedUserCommentForReply(null)
                                    return
                                 }
                                 setComment(e.target.value)
                              }}
                              ref={inpRef}
                           />
                           <div
                              className='df jcc aic cp'
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowEmojiPicker(p => !p) }}
                              ref={buttonRef}
                           >
                              <EmojiIcon />
                           </div>
                           {showEmojiPicker && (
                              <div ref={emojiPickerRef} style={{ position: 'absolute', zIndex: 1000, top: '40px', right: '0' }}>
                                 <EmojiPicker
                                    onEmojiClick={emoji => setComment(prev => prev + emoji.emoji)}
                                    searchPlaceHolder='Поиск эмодзи'
                                    // @ts-ignore
                                    theme='dark'
                                 />
                              </div>
                           )}
                        </div>
                     </div>

                     <div className={s.right}>
                        <button
                           disabled={isCommentDisabled}
                           style={{ cursor: isCommentDisabled ? "not-allowed" : "pointer" }}
                           onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              createMainCommentHandler(
                                 post?.id,
                                 { content: comment, parentId: null },
                                 setComments,
                                 setIsCommentDisabled,
                                 setComment,
                                 // @ts-ignore
                                 setYourPreviewComments
                              )
                           }}
                        >
                           <SendMessageIcon />
                        </button>
                     </div>
                  </form>
               </div>
            )}

            {yourPreviewComments.length > 0 && (
               yourPreviewComments.map((comment) => {
                  console.log(comment)
                  if (!comment) return null
                  return (
                     <Fragment key={comment.id}>
                        <PreviewComment
                           comment={comment}
                           setYourPreviewComments={setYourPreviewComments}
                           setComments={setComments}
                           postId={post.id}
                           isCommentDeleting={isCommentDeleting}
                        />
                     </Fragment>
                  )
               })
            )}

            {mode == 'preview' && (
               <>
                  {post?._count?.comments !== 0 && (
                     <>
                        {/* ================================================================ MAIN COM ================================================================ */}
                        {commentsList?.map((com: GetPostsCommentResponse) => {
                           return (
                              <div className={s.postcomments} key={com.id}>
                                 <CommentDeleteModal
                                    setComments={setCommentsList}
                                    isCommentDeleting={isCommentDeletingPreview}
                                    setIsCommentDeleting={setIsCommentDeletingPreview}
                                    deleteCallback={() => {
                                       setComments(prev => prev - 1)
                                    }}
                                 />
                                 <div className={s.comcontainer}>
                                    {/* ================================================================ USER COMMENTS ================================================================ */}
                                    <div
                                       className={s.parentcom}
                                       style={id == com?.authorId ? { background: themeStore.currentTheme.myCommentBgTheme.background } : {}}
                                    >
                                       <div className={s.parentcomcontainer}>
                                          <div className={s.left}>
                                             <Link className={s.imgdiv} to={com.authorId == id ? '/main/my-profile' : `/main/profile/${com?.author?.tag}`}>
                                                <img
                                                   src={previewCommentLogo ? previewCommentLogo : defaultlogo}
                                                   alt="previewcommentlogo"
                                                />
                                             </Link>
                                          </div>

                                          <div className={s.right}>
                                             <div
                                                className={s.rightcom}
                                                style={
                                                   post?.comments?.[0]?.childComments?.length !== 0 ?
                                                      { borderBottom: '1px solid rgb(137, 137, 137)', paddingBottom: '7px' }
                                                      : {}
                                                }
                                             >
                                                <div className={s.topdiv}>
                                                   <Link className={s.names} to={com.authorId == id ? '/main/my-profile' : `/main/profile/${com.authorId}`}>
                                                      <span className={s.name}>{commentName}</span>
                                                      <div className={s.who}>{who ? who : 'Самурай'}</div>
                                                   </Link>
                                                   <CommentSelectList
                                                      com={com}
                                                      setIsCommentEditing={setIsCommentEditing}
                                                      setIsCommentDeleting={setIsCommentDeletingPreview}
                                                   />
                                                </div>
                                                {(isCommentEditing && com.authorId == id) ? (
                                                   <EditComment
                                                      setIsCommentEditing={setIsCommentEditing}
                                                      com={com}
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
                                                         {/* LIKE */}
                                                         <button
                                                            className={s.like}
                                                            onClick={() => {
                                                               postComLikeOrDislike(
                                                                  com?.id,
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

                                                         {/* DISLIKE */}
                                                         <button
                                                            className={s.dislike}
                                                            onClick={() => {
                                                               postComLikeOrDislike(
                                                                  com?.id,
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

                                                      {/* COMMENT */}
                                                      <button
                                                         style={themeStore.currentTheme.btnsTheme}
                                                         className={s.com}
                                                         onClick={() => {
                                                            setIsReply(true)
                                                            setSelectedForReply({ tag: com?.author?.tag, id: com?.id, name: com?.author?.name, userId: com?.authorId, type: 'preview-child' })
                                                            setCommentText(`@${com?.author?.tag}, `)
                                                            setTimeout(() => { if (inpRefReply?.current) inpRefReply.current.focus() }, 0)
                                                         }}
                                                      >
                                                         <CommentIcon size={14} color={themeStore.currentTheme.secondTextColor.color} />
                                                         <span style={themeStore.currentTheme.secondTextColor}>{socialNumberFormat(comReplies)}</span>
                                                      </button>
                                                   </div>

                                                   <span className={s.date} style={themeStore.currentTheme.secondTextColor}>{formatDate(com?.createdAt)}</span>
                                                </div>
                                             </div>
                                          </div>
                                       </div>

                                       {isReply && (
                                          <div
                                             className={s.replycommentdiv}
                                             style={{
                                                background: id === post?.comments[0]?.authorId ? 'rgb(53, 53, 53)' : '#272727',
                                                borderBottom: post?.comments[0]?.repliesCount == 0 ? 'none' : '1px solid #BABABA'
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
                                                            if (selectedForReply && !e.target.value.includes(`${selectedForReply?.tag}, `)) {
                                                               console.log(e.target.value.slice(selectedForReply?.tag?.length))
                                                               setCommentText(e.target.value.slice(selectedForReply?.tag?.length))
                                                               setIsReply(false)
                                                               return
                                                            }
                                                            setCommentText(e.target.value)
                                                         }}
                                                         ref={inpRefReply}
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
                                                            post.id,
                                                            { content: commentText, parentId: post?.comments[0]?.id, addressedToName: selectedForReply?.name, addressedToTag: selectedForReply?.tag },
                                                            selectedForReply?.name,
                                                            selectedForReply?.userId,
                                                            setComments,
                                                            setIsCommentDisabled,
                                                            setComReplies,
                                                            setIsReply,
                                                            // @ts-ignore
                                                            setChildComments,
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

                                    {/* ================================================================ CHILD COM ================================================================ */}
                                    {childComments.length !== 0 && (
                                       <>
                                          {childComments?.map((child) => {
                                             return (
                                                <Fragment key={child.id}>
                                                   <ChildComment
                                                      child={child}
                                                      setComments={setComments}
                                                      setParentComments={setComReplies}
                                                      parentId={com?.id}
                                                      postId={post?.id}
                                                      setCommentsList={setChildComments}
                                                   />
                                                </Fragment>
                                             )
                                          })}
                                       </>
                                    )}
                                 </div>
                              </div>
                           )
                        })}
                     </>
                  )
                  }

                  {post?._count?.comments > 1 && !(post?._count?.comments == 2 && post?.comments?.length === 1) && (
                     <div className={s.checkcomments}>
                        <button
                           className={s.checkcommentscontainer}
                           onClick={() => {
                              setCommentsPage(prev => {
                                 getRealCommentsList(post?.id, prev, commentsSort)
                                 setMode('list')
                                 return prev + 1
                              })
                           }}
                        >
                           <div className={s.textcontainer} style={{ borderBottom: `1px solid ${themeStore.currentTheme.secondTextColor.color}` }}>
                              <span style={themeStore.currentTheme.secondTextColor}>Посмотреть {mainCommentsCount} ответов</span>
                           </div>
                           <CheckCommentsIcon color={themeStore.currentTheme.secondTextColor.color} />
                        </button>
                     </div>
                  )}
               </>
            )
            }
         </>
         {/* ================================================================ REAL COMMENTS ================================================================ */}
         {
            mode == 'list' && (
               <>
                  {firstLoading ? (
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
                        <CommentsPending
                           length={mainCommentsCount - realCommentsStaticLength > 10 ? 10 : mainCommentsCount}
                        />
                     </div>
                  ) : (
                     <>
                        {/* ===================== POSTS ======================== */}
                        {realComments?.map((com: any) => {
                           return (
                              <Fragment key={com.id}>
                                 <Comments
                                    comment={com}
                                    setComments={setComments}
                                    postId={post?.id}
                                    setRealComments={setRealComments}
                                 />
                              </Fragment>
                           )
                        })}

                        <div className={post?.mainCommentsCount - realCommentsStaticLength == 0 ? s.combtnsone : s.combtns}>
                           {post?.mainCommentsCount - realCommentsStaticLength != 0 && (
                              <div className={s.checkcomments}>
                                 <button
                                    className={s.checkcommentscontainer}
                                    onClick={() => {
                                       setCommentsPage(prev => {
                                          getRealCommentsList(post?.id, prev, commentsSort)
                                          return prev + 1
                                       })
                                    }}
                                 >
                                    <div className={s.textcontainer}>
                                       <span>Посмотреть {mainCommentsCount - realCommentsStaticLength} ответов</span>
                                    </div>
                                    <CheckCommentsIcon />
                                 </button>
                              </div>
                           )}

                           <button
                              className={s.hidecomment}
                              onClick={hideCommentHandler}
                           >
                              <div className={s.textcontainer}>
                                 <span>Скрыть комментарии</span>
                              </div>
                              <HideComments />
                           </button>
                        </div>
                     </>
                  )}
               </>
            )
         }
      </div >
   )
})

interface PostProps {
   post: GetPostsPostResponse
}