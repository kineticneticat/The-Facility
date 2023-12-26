import { devRenderGround } from "./Grid.js"
import { Failed, HandlersLoaded, RoomHandler, TargetHandlers } from "./Handlers.js"
import { Room } from "./Room.js"

export let canvas = document.getElementById("canvas") as HTMLCanvasElement
export let ctx = canvas.getContext("2d")
let first = false

let canvasSize = {
    width: 500,
    height: 500
}

window.onload = () => {
    canvas.width = canvasSize.width
    canvas.height = canvasSize.height

    init()
}
let test:Room
function init() {
    test = new Room("dev.json")

    loop()
}

function loop() {
    if (!Failed && (HandlersLoaded != TargetHandlers)) {
        // not all handlers loaded so skip frame
        console.info("Handlers Not Loaded")
    }
    if (!first && (HandlersLoaded == TargetHandlers) && !Failed) {
        // triggers once after handlers loaded
        console.info("Handlers Loaded")

        first = true
    }
    if (Failed) {
        console.error("Handler Failed")
        return
    }
    if (HandlersLoaded == TargetHandlers && !Failed) {
        // all handlers loaded

        Draw()

        
    }
    requestAnimationFrame(loop)
}

function Draw() {
    ctx?.clearRect(0,0,canvasSize.width, canvasSize.height)
    devRenderGround()

}