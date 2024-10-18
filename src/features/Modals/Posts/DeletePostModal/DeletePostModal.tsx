import { Modal } from 'antd'
import s from './DeletePostModal.module.scss'
import { observer } from 'mobx-react-lite'
import { postStore } from '@/stores/post/post-store'
import { themeStore } from '@/stores/theme/theme-store'
import { deletePost } from '@/shared/api/posts/api'
import { postsApiStore } from '@/stores/api/posts/posts-store'
import { userPostsApiStore } from '@/stores/api/user-posts/user-posts-store'
import { useLocation } from 'react-router-dom'
import { GetPostsResponse } from '@/shared/api/posts/types'

export const DeletePostModal = observer(() => {
   const { isDeletingPost, setIsDeletingPost, selectedPostForDelete } = postStore
   const { posts, setPosts } = postsApiStore
   const { userPosts, setUserPosts } = userPostsApiStore
   const { currentTheme } = themeStore
   const path = useLocation().pathname

   const deletePostAction = async () => {
      if (!selectedPostForDelete) return
      try {
         const res = await deletePost(selectedPostForDelete?.id)
         console.log(res)
         const isMyProfile = path == '/main/my-profile'
         const postsList = isMyProfile ? userPosts?.posts : posts?.posts
         const mainPostsList = isMyProfile ? userPosts : posts
         if (res.data) {
            if (postsList && mainPostsList) {
               const filteredPosts = postsList.filter(post => post.id !== res.data.id)
               const newPostsList = { ...mainPostsList, posts: filteredPosts }
               isMyProfile ? setUserPosts(newPostsList) : setPosts(newPostsList)
               setIsDeletingPost(false)
            }
         }
      } catch (err) { console.log }
   }

   return (
      <Modal
         open={isDeletingPost}
         onCancel={() => setIsDeletingPost(false)}
         footer={<></>}
         centered
         width={400}
      >
         <div className={s.main}>
            <div className={s.top}>
               <span>Вы действительно хотите удалить пост?</span>
            </div>
            <div className={s.bot}>
               <button
                  className={s.submit}
                  onClick={deletePostAction}
               >Удалить</button>
               <button
                  className={s.cancel}
                  style={currentTheme.btnsTheme}
                  onClick={() => setIsDeletingPost(false)}
               >
                  <span style={currentTheme.textColor}>Отменить</span>
               </button>
            </div>
         </div>
      </Modal>
   )
})