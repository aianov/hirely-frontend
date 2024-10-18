
export interface CreateCommentBody {
   content: string
   parentId?: number | null
   addressedToTag?: string
   addressedToName?: string
}

export interface GetCommentsFromPostBody {
   postId: number
   page?: number
   size?: number
   sort?: "asc" | "desc"
}

export interface EditCommentBody {
   content: string
}