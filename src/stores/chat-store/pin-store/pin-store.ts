import { makeAutoObservable } from "mobx"

class PinStore {
	constructor() { makeAutoObservable(this) }

	isPin = false

	setIsPin = (is: boolean) => this.isPin = is

}

export const pinStore = new PinStore()