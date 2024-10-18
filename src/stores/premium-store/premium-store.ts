import { makeAutoObservable } from "mobx"

class PremiumStore {
	constructor() { makeAutoObservable(this) }

	isPremiumShow = false

	setIsPremiumShow = (is: boolean) => this.isPremiumShow = is

}

export const premiumStore = new PremiumStore()