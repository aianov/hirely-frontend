import { themeStore } from '@/stores/theme/theme-store'
import { SearchIcon } from '@assets/icons/MainPage/Posts/SearchIcon'
import { GetPostsPostResponse } from '@shared/api/posts/types'
import { SelectUi } from '@shared/ui/SelectUi'
import { selectPostFrom, selectPostTags } from '@shared/utils/globalData'
import { postsApiStore } from '@stores/api/posts/posts-store'
import { Select, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import { Fragment, RefObject, useEffect, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import { NotFoundPost } from '../../components/NotFoundPost/NotFoundPost'
import { Post } from './components/Post'
import { PostPending } from './components/PostPending'
import s from './Posts.module.scss'

export const Posts = observer(() => {
   const url = useLocation().pathname

   const {
      posts,
      postsTag,
      postsFrom,
      postsLoading,
      setPostsPage,
      setChangedPostsLoading,
      setPostsFrom,
      hasMorePosts,
      changedPostsLoading,
      setPostsTag,
      getPostsAction,
   } = postsApiStore

   useEffect(() => {
      setPostsPage(1)
      setChangedPostsLoading(true)
      getPostsAction()
   }, [postsTag, postsFrom])

   const postsRef: RefObject<HTMLInputElement> = useRef(null)

   useEffect(() => { localStorage.setItem('last-route', url) }, [url])

   return (
      <div className={s.main}>
         {/* SEARCH/FILTERS BAR */}
         <div className={s.fakebar}>
            <div className={s.bar} style={themeStore.currentTheme.bgTheme}>
               <div className={s.left}>
                  <div className={s.inpdiv}>
                     <input type="text" placeholder="Поиск" />
                     <SearchIcon />
                  </div>
               </div>
               <div className={s.right}>
                  <Space
                     style={{ display: 'inline-block', width: '50%', height: '37px' }}
                     direction="horizontal"
                  >
                     <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%', height: '100%' }}
                        placeholder="Всё"
                        onChange={(e) => {
                           setPostsTag(
                              selectPostTags
                                 .filter((tag) => e.includes(tag.key))
                                 .map((tag) => tag.label)
                           )
                        }}
                        options={selectPostTags.map((tag) => ({
                           label: tag.label,
                           value: tag.key,
                        }))}
                     />
                  </Space>

                  <SelectUi
                     style={{ height: '37px' }}
                     items={selectPostFrom}
                     state={postsFrom!}
                     // @ts-ignore
                     setState={setPostsFrom}
                     containerStyle={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                  />
               </div>
            </div>
         </div>

         {/* POSTS */}
         {postsLoading && <PostPending />}
         {changedPostsLoading ? (
            <PostPending />
         ) : posts?.posts?.length === 0 || !posts?.posts ? (
            <NotFoundPost title="Посты не найдены" />
         ) : (
            <div ref={postsRef} className={`${s.posts} scrollableDiv`}>
               <InfiniteScroll
                  dataLength={posts ? posts.posts.length : 0}
                  next={() => {
                     getPostsAction('pagination')
                  }}
                  hasMore={hasMorePosts}
                  loader={<PostPending />}
                  scrollableTarget="scrollableDiv"
                  className={s.infinitescroll}
               >
                  {posts?.posts?.map((post: GetPostsPostResponse) => (
                     <Fragment key={nanoid()}>
                        <Post post={post} />
                     </Fragment>
                  ))}
               </InfiniteScroll>
            </div>
         )}
      </div>
   )
})
