import { acceptFriendRequest, getFriendList, getRequestList, rejectFriendRequest, removeFriendApi } from '@/shared/api/friend/api'
import { GetFriendRequestsResponse, GetRequestsListResponse } from '@/shared/api/friend/types'
import { makeAutoObservable, runInAction } from "mobx"
import { profileStore } from '../profile-store/profile-store'

class FriendStore {
   constructor() { makeAutoObservable(this) }

   // ========================== STATES ==============================
   open = false
   whatOpen: 'friends' | 'requests' = 'friends'
   friendCount = 0
   friendRequestCount = 0

   // search
   friendSearch = ''
   requestSearch = ''
   staticFriendSearch = ''
   staticRequestSearch = ''

   // friend list
   friendList?: GetFriendRequestsResponse
   hasMoreFriendList = true
   friendPage = 1
   friendLoading = false

   // request list
   requestList?: GetRequestsListResponse
   hasMoreRequestList = true
   requestPage = 1
   requestLoading = false

   // ========================== FETCHES ==============================

   // ========= GETS ============
   getFriendListAction = async (type: 'search' | 'default' | 'pagination' = 'default', id: string) => {
      if (this.friendLoading) return
      this.setFriendLoading(true)
      try {
         const res: GetFriendRequestsResponse = await getFriendList(id, {
            page: this.friendPage,
            q: this.friendSearch
         })
         if (type == 'default') {
            this.friendList = {
               ...res,
               friends: [...this.friendList?.friends || [], ...res.friends]
            }
         }
         else if (type == 'search') {
            this.friendList = {
               ...res,
               friends: res.friends
            }
         }
         if (type == 'pagination') this.friendPage = this.friendPage + 1
         this.staticFriendSearch = this.friendSearch
         this.setFriendLoading(false)
      }
      catch (err) { console.log(err) }
      this.setFriendLoading(false)
   }

   getRequestListAction = async (type: 'search' | 'default' | 'pagination' = 'default', id: string) => {
      if (this.requestLoading) return
      if (type !== 'pagination') this.setRequestLoading(true)
      console.log(this.requestLoading)
      try {
         if (type == 'pagination') this.requestPage = this.requestPage + 1
         const res: GetRequestsListResponse = await getRequestList(id, {
            page: this.requestPage,
            q: this.requestSearch
         })
         if (!res.friendRequests) return
         if (type == 'default') {
            this.requestList = {
               ...res,
               friendRequests: [...this.requestList?.friendRequests || [], ...res.friendRequests]
            }
         }
         else if (type == 'search') {
            this.requestList = {
               ...res,
               friendRequests: res.friendRequests
            }
         } else if (type === 'pagination') {
            console.log(res.friendRequests.length)
            if (res.friendRequests.length < 10) this.setHasMoreRequestList(false)
            if (!this.requestList) this.requestList = res
            else {
               this.requestList = {
                  ...res,
                  friendRequests: [...this.requestList.friendRequests, ...res.friendRequests]
               }
            }
         }
         this.staticRequestSearch = this.requestSearch
         this.setRequestLoading(false)
      } catch (err) { console.log(err) }
      this.setRequestLoading(false)
      console.log(this.requestLoading)
   }

   // ========= REJECT OR ACCEPT ============
   acceptFriendRequestAction = async (requestId: string) => {
      try {
         const res = await acceptFriendRequest(requestId)
         if (res.status == 200) {
            this.friendCount = this.friendCount + 1
            this.friendRequestCount = this.friendRequestCount - 1
            this.requestList = {
               ...this.requestList,
               // @ts-ignore
               friendRequests: this.requestList?.friendRequests?.filter(t => t.id !== res.data.id)
            }
         }
      } catch (err) { console.log(err) }
   }

   rejectFriendRequestAction = async (receiverId: string) => {
      try {
         const res = await rejectFriendRequest(receiverId, profileStore.profile.id)
         if (res.status == 200) {
            this.friendRequestCount = this.friendRequestCount - 1
            this.requestList = {
               ...this.requestList,
               // @ts-ignore
               friendRequests: this.requestList?.friendRequests?.filter(t => t.id !== res.data.id)
            }
         }
      } catch (err) { console.log(err) }
   }

   // ========= REMOVE FRIEND ============
   removeFriendAction = async (userId: string) => {
      try {
         const res = await removeFriendApi(profileStore.profile.id, userId)
         if (res.status == 200) {
            this.friendCount = this.friendCount - 1
            this.friendList = {
               ...this.friendList,
               // @ts-ignore
               friends: this.friendList?.friends.filter(t => t.friendId !== userId)
            }
         }
      } catch (err) { console.log(err) }
   }

   // ========================== OTHER MOVES ==============================
   setOpen = (open: boolean) => this.open = open
   setWhatOpen = (soWhat: 'friends' | 'requests') => this.whatOpen = soWhat

   // search
   setFriendSearch = (text: string) => this.friendSearch = text
   setRequestSearch = (text: string) => this.requestSearch = text

   // friend list
   setHasMoreFriendList = (has: boolean) => this.hasMoreFriendList = has
   setFriendPage = (page: number) => this.friendPage = page
   setFriendLoading = (is: boolean) => this.friendLoading = is

   // request list
   setHasMoreRequestList = (has: boolean) => this.hasMoreRequestList = has
   setRequestPage = (page: number) => this.requestPage = page
   setRequestLoading = (is: boolean) => this.requestLoading = is

   setFriendCount = (count: number) => this.friendCount = count
   setFriendRequestCount = (count: number) => this.friendRequestCount = count

   clearAllRequest = () => {
      runInAction(() => {
         this.requestList = undefined
         this.requestPage = 1
         this.setHasMoreRequestList(true)
      })
   }

}

export const friendStore = new FriendStore()