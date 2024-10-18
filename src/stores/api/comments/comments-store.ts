
import { makeAutoObservable } from "mobx"
import { getCommentsFromPost } from '../../../shared/api/posts/comments/api'
import { GetCommentsFromPostBody } from '../../../shared/api/posts/comments/types'
import { SortType } from '../../../shared/utils/globalTypes'

class CommentsStore {
   constructor() { makeAutoObservable(this) }

   // ========= FETCHES ============
   getCommentsFromPostAction = async (postId: number, page: number, sort: SortType = 'desc') => {
      try {
         const apiBody: GetCommentsFromPostBody = {
            postId: postId,
            page: page,
            size: 10,
            sort: sort
         }
         return await getCommentsFromPost(apiBody)
      }
      catch (err) { console.log(err) }
   }
}

export const commentsStore = new CommentsStore();