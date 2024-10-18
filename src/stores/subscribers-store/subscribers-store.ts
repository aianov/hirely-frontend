import { makeAutoObservable } from "mobx"

class SubscribersStore {
   constructor() {makeAutoObservable(this)}

   // ========================== STATES ==============================
   
   // modal
   open = false
   subscribeSearch = ''
   subscribeLoading = false

   subscribersList: any

   // ========================== FETCHES ==============================


   // ========================== OTHER MOVES ==============================
   setSubOpen = (open: boolean) => this.open = open
   setSubscribeSearch = (text: string) => this.subscribeSearch = text
   setSubscribeLoading = (is: boolean) => this.subscribeLoading = is

}

export const subscribersStore = new SubscribersStore()