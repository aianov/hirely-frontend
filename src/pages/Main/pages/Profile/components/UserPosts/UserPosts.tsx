import { NotFoundPost } from '@/pages/Main/components/NotFoundPost/NotFoundPost'
import { GetPostsPostResponse } from '@/shared/api/posts/types'
import { userPostsApiStore } from '@/stores/api/user-posts/user-posts-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation, useParams } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { Post } from '../../../Posts/components/Post'
import { PostPending } from '../../../Posts/components/PostPending'
import s from '../../../Posts/Posts.module.scss'

export const UserPosts = observer(() => {
   const postsRef = useRef(null)
   const { user, profile } = profileStore
   const url = useLocation().pathname
   const { userId } = useParams()

   const {
      userPostsLoading,
      changedUserPostsLoading,
      userPosts,
      getUserPostsAction,
      hasMoreUserPosts,
      setPostsPage,
      setHasMorePosts
   } = userPostsApiStore

   useEffect(() => {
      if (userId) {
         setPostsPage(1)
         setHasMorePosts(false)
      }
      getUserPostsAction(url == '/main/my-profile' ? profile.id : (userId ? userId : user.id))
   }, [getUserPostsAction, userId])

   useEffect(() => { localStorage.setItem('last-route', url) }, [])

   return (
      <div className={s.main}>
         {/* POSTS */}
         {userPostsLoading && <PostPending />}
         {changedUserPostsLoading ? (
            <PostPending />
         ) : userPosts?.posts?.length == 0 || !userPosts?.posts ? (
            <NotFoundPost />
         ) : (
            <div ref={postsRef} className={`${s.posts} scrollableDiv`}>
               <InfiniteScroll
                  dataLength={userPosts ? userPosts.posts.length : 0}
                  next={() => { getUserPostsAction(url == '/main/my-profile' ? profile.id : (userId ? userId : user.id), 'pagination') }}
                  hasMore={hasMoreUserPosts}
                  loader={<PostPending />}
                  scrollableTarget="scrollableDiv"
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
               >
                  {userPosts?.posts?.map((post: GetPostsPostResponse) => (
                     <Fragment key={post.id}>
                        <Post post={post} />
                     </Fragment>
                  ))}
               </InfiniteScroll>
            </div>
         )}
      </div>
   )
})