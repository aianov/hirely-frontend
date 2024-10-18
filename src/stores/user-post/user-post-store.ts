import { makeAutoObservable } from "mobx"

class CounterStore {
	constructor() { makeAutoObservable(this) }

}

export const counterStore = new CounterStore()