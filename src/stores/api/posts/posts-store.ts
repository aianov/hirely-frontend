import { makeAutoObservable } from "mobx"
import { getPosts, postLike } from '../../../shared/api/posts/api'
import { GetPostsBody, GetPostsResponse } from '../../../shared/api/posts/types'
import { postFromTranslation, postTagsTranslation } from '../../../shared/utils/translations'
// @ts-ignore
import { PostsFromRu } from './types'

class PostsApiStore {
   // =========================== GET POSTS ==============================
   posts?: GetPostsResponse
   postsTag: string[] = ['Всё']
   postsFrom: PostsFromRu = 'В рекомендациях'
   sort?: 'asc' | 'desc' = 'desc'

   // pagination
   postsPage = 1
   postsLoading = false
   changedPostsLoading = true
   hasMorePosts = true
   POSTS_SIZE = 10

   // ========= FETCHES ============
   getPostsAction = async (type?: string) => {
      if (this.postsLoading) return
      const body: GetPostsBody = {
         page: type === 'pagination' ? this.postsPage + 1 : this.postsPage,
         size: this.POSTS_SIZE,
         sort: this.postsFrom === 'Старые публикации' ? "asc" : this.postsFrom === 'Новые публикации' ? "desc" : this.sort,
         tags: postTagsTranslation(this.postsTag),
         from: postFromTranslation(this.postsFrom)
      }
      this.setPostsLoading(true)
      try {
         const response = await getPosts(body)
         if (response?.posts?.length === this.POSTS_SIZE && response?.total > this.POSTS_SIZE) this.setHasMorePosts(true)
         else this.setHasMorePosts(false)
         if (this.posts && type === 'pagination') {
            this.posts = {
               total: response.total,
               posts: [...this.posts.posts, ...response.posts],
               currentPage: response.currentPage,
               pageSize: response.pageSize
            }
            if (response?.posts < this.POSTS_SIZE) this.setHasMorePosts(false)
            this.setPostsPage(response?.currentPage)
         }
         else this.setPosts(response)
         this.setChangedPostsLoading(false)
      } catch (err) { console.error(err) }
      this.setPostsLoading(false)
   }

   // ========= OTHER MOVES ============
   setPosts = (posts: GetPostsResponse) => this.posts = posts
   setPostsPage = (page: number) => this.postsPage = page
   setPostsTag = (tag: string[]) => {
      if (tag.length == 0) {
         this.postsTag = ['Всё']
         return
      }
      this.postsTag = tag
   }
   setPostsFrom = (from: PostsFromRu) => this.postsFrom = from
   setPostsLoading = (is: boolean) => this.postsLoading = is
   setHasMorePosts = (is: boolean) => this.hasMorePosts = is
   setChangedPostsLoading = (is: boolean) => this.changedPostsLoading = is

   // ========================== LIKE POST ==============================
   isLiking = false

   // ========= FETCHES ============
   postLikeAction = async (postId: number) => {
      this.setIsLiking(true)
      try { await postLike(postId) }
      catch (err) { console.log(err) }
      finally { this.setIsLiking(false) }
   }

   // ========= OTHER MOVES ============
   setIsLiking = (is: boolean) => this.isLiking = is

   constructor() { makeAutoObservable(this) }
}

export const postsApiStore = new PostsApiStore()