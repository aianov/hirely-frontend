import { makeAutoObservable } from "mobx"
import { getPosts, postLike } from '../../../shared/api/posts/api'
import { GetPostsResponse, GetUserPostsBody } from '../../../shared/api/posts/types'
import { postFromTranslation, postTagsTranslation } from '../../../shared/utils/translations'
import { PostsFromRu } from '../posts/types'

class UserPostsApiStore {
   constructor() {
      makeAutoObservable(this)
   }

   // ========================== GET USER POSTS ==============================
   userPosts?: GetPostsResponse
   userPostsTag: string[] = ['Всё']
   userPostsFrom: PostsFromRu = 'Новые публикации'
   userSort?: 'asc' | 'desc' = 'desc'
   // pagination
   userPostsPage = 1
   userPostsLoading = false
   changedUserPostsLoading = true
   hasMoreUserPosts = false
   USER_POSTS_SIZE = 10

   // ========= FETCHES ============
   getUserPostsAction = async (authorId: string, type?: string) => {
      console.log(this.hasMoreUserPosts)
      if (this.userPostsLoading) return
      const body: GetUserPostsBody = {
         page: type === 'pagination' ? this.userPostsPage + 1 : this.userPostsPage,
         size: this.USER_POSTS_SIZE,
         sort: this.userPostsFrom === 'Старые публикации' ? "asc" : this.userPostsFrom === 'Новые публикации' ? "desc" : this.userSort,
         tags: postTagsTranslation(this.userPostsTag),
         from: postFromTranslation(this.userPostsFrom),
         authorId: authorId
      }
      this.setPostsLoading(true)
      try {
         const response = await getPosts(body)
         if (response?.posts?.length === this.USER_POSTS_SIZE && response?.total > this.USER_POSTS_SIZE) this.setHasMorePosts(true)
         // else this.setHasMorePosts(false)
         if (this.userPosts && type === 'pagination') {
            this.userPosts = {
               total: response.total,
               posts: [...this.userPosts.posts, ...response.posts],
               currentPage: response.currentPage,
               pageSize: response.pageSize
            }
            if (response?.posts < this.USER_POSTS_SIZE) this.setHasMorePosts(false)
            this.setPostsPage(response?.currentPage)
         }
         else this.setUserPosts(response)
         this.setChangedPostsLoading(false)
      } catch (err) { console.error(err) }
      this.setPostsLoading(false)
   }

   // ========= OTHER MOVES ============
   setUserPosts = (posts: any) => this.userPosts = posts
   setPostsPage = (page: number) => this.userPostsPage = page
   setPostsTag = (tag: string[]) => this.userPostsTag = tag
   setPostsFrom = (from: PostsFromRu) => this.userPostsFrom = from
   setPostsLoading = (is: boolean) => this.userPostsLoading = is
   setHasMorePosts = (is: boolean) => this.hasMoreUserPosts = is
   setChangedPostsLoading = (is: boolean) => this.changedUserPostsLoading = is

   // ========================== LIKE POST ==============================
   isLiking = false

   // ========= FETCHES ============
   postLikeAction = async (postId: number) => {
      this.setIsLiking(true)
      try {
         await postLike(postId)
      } catch (err) {
         console.log(err)
      }
      this.setIsLiking(false)
   }

   // ========= OTHER MOVES ============
   setIsLiking = (is: boolean) => this.isLiking = is

}

export const userPostsApiStore = new UserPostsApiStore()