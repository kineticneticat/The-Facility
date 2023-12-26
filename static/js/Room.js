import { RoomHandler } from "./Handlers.js";
export class Room {
    handler;
    constructor(fn) {
        this.handler = new RoomHandler(`static/json/room/${fn}`);
    }
    get data() { return this.handler.data; }
}
//# sourceMappingURL=Room.js.map