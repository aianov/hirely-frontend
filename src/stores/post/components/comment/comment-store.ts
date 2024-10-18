
import { makeAutoObservable } from "mobx"
import { CommentTypeForDelete } from './types'

class CommentStore {
   constructor() { makeAutoObservable(this) }

   selectedUserCommentForReply?: { tag: string; id: number; name: string; userId: string; type?: string } | null = null

   setSelectedUserCommentForReply = (obj: { tag: string; id: number; name: string; userId: string; type?: string } | null) => this.selectedUserCommentForReply = obj

   isCommentDeleting = false
   selectedCommentIdForDelete: null | number = null
   typeOfDelete: CommentTypeForDelete | null = null

   setIsCommentDeleting = (is: boolean) => this.isCommentDeleting = is
   setSelectedCommentIdForDelete = (commentId: number) => this.selectedCommentIdForDelete = commentId 
   setTypeOfDelete = (type: CommentTypeForDelete) => this.typeOfDelete = type

}

export const commentStore = new CommentStore()