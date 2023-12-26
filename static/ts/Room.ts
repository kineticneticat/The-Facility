import { RoomHandler } from "./Handlers.js";

export class Room {
    handler: RoomHandler
    constructor(fn:string) {
        this.handler = new RoomHandler(`static/json/room/${fn}`)
    }
    get data() {return this.handler.data}
}