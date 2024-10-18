
// ========================== GET POSTS MY OR ALL ==============================

import { baseInstance } from '../base'
import { CreatePostBody, GetPostsBody } from './types'

export const getPosts = async (body: GetPostsBody) => (await baseInstance.get("/post", {params: body})).data

export const postLike = async (postId: number) => await baseInstance.post(`/post/${postId}/like`)

export const postFav = async (postId: number) => await baseInstance.post(`/post/${postId}/favorite`)

export const postLikeOrDisToCom = async (commentId: number, type: "Like" | "Dislike") => await baseInstance.post(`/post/comment/${commentId}/like`, {type: type})

export const createPost = async (body: CreatePostBody) => await baseInstance.post('/post', body)

export const editPost = async (body: CreatePostBody, postId: number) => await baseInstance.put(`/post/${postId}`, body)

export const deletePost = async (postId: number) => await baseInstance.delete(`/post/${postId}`)