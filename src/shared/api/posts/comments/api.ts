import { baseInstance } from '../../base'
import { CreateCommentBody, EditCommentBody, GetCommentsFromPostBody } from './types'

export const createComment = async (postId: number, body: CreateCommentBody) => {
   const res = await baseInstance.post(`/post/comment/${postId}`, body)
   return res
}

export const getCommentsFromPost = async (body: GetCommentsFromPostBody) => {
   return await baseInstance.get(`/post/comment`, {params: body})
}

export const getRepliesFromComment = async (commentId: number, page: number) => {
   return await baseInstance.get(`/post/replies`, {params: {commentId: commentId, page: page, size: 10}})
}

export const editComment = async (commentId: number, body: EditCommentBody) => await baseInstance.put(`/post/comment/${commentId}`, body)

export const deleteComment = async (commentId: number) => await baseInstance.delete(`/post/comment/${commentId}`)