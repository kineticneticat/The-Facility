import { SimpleMap, callbackFunction } from "./Const"

export let Waiters: SimpleMap<Waiter>

export class Waiter {
    tray: callbackFunction[]

    constructor(name: string) {
        this.tray = []
        Waiters[name] = this
    }

    addMeal(callback: callbackFunction) {
        this.tray.push(callback)
    }

    serve() {
        this.tray.forEach((x) => {x()})
    }
}