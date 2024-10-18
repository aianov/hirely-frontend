import { AxiosRequestConfig } from 'axios'
import { RawDraftContentState } from 'draft-js'
import { PostsFrom, PostsFromRu } from '../../../stores/api/posts/types'
import { SortType } from '../../utils/globalTypes'

// ========= Get Post ============
export interface GetPostsBody extends AxiosRequestConfig {
   authorId?: string
   page?: number
   size?: number
   sort?: SortType
   from?: PostsFrom | PostsFromRu
   tags: string[]
   hashtags?: string[]
}

export interface GetUserPostsBody extends AxiosRequestConfig {
   authorId: string
   page?: number
   size?: number
   sort?: SortType
   from?: PostsFrom | PostsFromRu
   tags: string[]
   hashtags?: string[]
}

export interface GetPostsResponse {
   currentPage: number
   pageSize: number
   total: number
   posts: GetPostsPostResponse[]
}

export interface GetPostsPostResponse {
   author: GetPostsPostResponseAuthor
   authorId: string
   comments: GetPostsCommentResponse[]
   content: RawDraftContentState
   createdAt: string
   id: number
   mainCommentsCount: number
   viewsCount: number
   title: string
   images: string[]
   updatedAt: string
   hashtags: string[]
   tags: string[]
   userFavorited: boolean
   userLiked: boolean
   likes: GetPostsPostResponseLikes[]
   _count: {
      comments: number
      favorites: number
      likes: number
   }
}

export interface GetPostsPostResponseLikes {
   id: string
   logo: string
}

export interface GetPostsPostResponseAuthor {
   createdAt: string
   email: string
   id: string
   isPremium: boolean
   moreId: string
   name: string
   password: string
   more: {
      who: string
      p_lang: string
      logo: string
   }
   tag: string
   updatedAt: string
}

export interface GetPostsCommentResponse {
   authorId: string
   author: {
      name: string
      tag: string
      more: GetPostUserMore
   }
   childComments: GetPostsCommentLikesResponse[]
   commentLikes: { type: 'Like' | 'Dislike' }[]
   content: string
   createdAt: string
   id: number
   parentId: number | null
   postId: number
   repliesCount: number
   likesCount: number
   dislikesCount: number
   updatedAt: string
   userLiked: boolean
   userDisliked: boolean
   yourLike: {
      commentId: number
      id: number
      type: 'Like' | 'Dislike'
      userId: string
   }
}

export interface GetPostUserMore {
   logo: string
   p_lang: string
   who: string
}

export interface GetPostsCommentLikesResponse {
   id: number
   author: {
      name: string
      more: GetPostUserMore
      tag: string
   }
   addressedTo: { name: string; userId: string; tag: string }
   authorId: string
   dislikesCount: number
   content: string
   parentId: number | null
   createdAt: string
   likesCount: number
   repliesCount: number
   updatedAt: string
   postId: number
   userLiked: boolean
   userDisliked: boolean
   addressedToName: string
   addressedToTag: string
}

export interface CreatePostBody {
   authorId?: string
   title: string
   content: string
   tags?: string[]
   hashtags?: string[]
   images: string[]
}