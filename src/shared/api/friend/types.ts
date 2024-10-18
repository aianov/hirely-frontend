export interface SendFriendRequestApiBody {
   senderId: string
   receiverId: string
}

export interface GetFriendListParams {
   page: number
   pageSize?: number
   q: string
}

// RESPONSES
export interface GetFriendRequestsResponse {
   total: number
   currentPage: number
   pageSize: number
   friends: GetFriendRequestsResponseRequests[]
}
export interface GetFriendRequestsResponseRequests {
   userId: string
   friendId: string
   friend: {
      tag: string
      name: string
      isPremium: boolean
      more: {
         p_lang: string[]
         logo: string
         who: string
      }
   }
}

export interface GetRequestsListResponse {
   total: number
   currentPage: number
   pageSize: number
   friendRequests: GetRequestsListResponseRequests[]
}

export interface GetRequestsListResponseRequests {
   id: string
   senderId: string
   receiverId: string
   status: string
   createdAt: string
   sender: GetRequestsListResponseSender
}

export interface GetRequestsListResponseSender {
   id: string
   name: string
   isPremium: boolean
   tag: string
   more: {
      logo: string
      p_lang: string[]
      who: string
   }
}