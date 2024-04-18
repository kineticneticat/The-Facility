import { Asset, SimpleMap, Queuer, RoomJSONData, TileJSONData } from "./Const.js"
import { Ready } from "./Main.js"
import { Vec2, Vec3 } from "./Maths.js"

/**what handlers are currently doing stuff */
export let Queue: SimpleMap<Queuer> = {}
/** if a handler has failed */
export let Failed = false
/** stores assets for use */
export let Assets: SimpleMap<Asset<any>> = {}
/** basic handler */
abstract class Handler<HandlerDataType> {
    data: HandlerDataType
    assetName: string
    fileName: string
    firstLoad: Boolean
    extCallback: () => void
    constructor(fn:string, name:string, extCallback?:() => void) {
        if (!this.verifyFilename(fn)) {
            throw TypeError(`File ${fn} is not valid for this Handler}`)
        }
        if (!extCallback) {
            extCallback = () => {}
        }
        this.firstLoad = true
        this.fileName = fn
        this.assetName = name
        this.data = this.blankData()
        this.extCallback = extCallback

        // make sure asset hasnt already been loaded
        for (const k of Object.keys(Assets)) {
            let asset = Assets[k]
            if (asset.file == fn) {
                this.firstLoad = false
                this.data = asset.data
                return 
            }
        }

        //if first load; do normal stuff
        // add asset so data can be accessed later
        Assets[this.assetName] = ({
            loaded: false,
            file: this.fileName,
            name: this.assetName,
            data: this.data
        } as Asset<HandlerDataType>)

        // add queuer so other stuff can check for completion
        Queue[this.assetName] = ({
            name:this.assetName,
            done:false,
            status:"Started!",
            failed:false
        } as Queuer)
        
        this.getData()
    }

    /**call once asset loaded */
    defaultCallback(data:HandlerDataType): void {
        Queue[this.assetName].done = true
        Queue[this.assetName].status = "Done!"
        Assets[this.assetName].loaded = true
        Assets[this.assetName].data = data
        this.data = data

        this.intCallback(data)
        this.extCallback()
    }

    abstract blankData():HandlerDataType
    /** called to begin the handler */
    abstract getData():void
    /** called internally w/in handler to finish up */
    intCallback(data:HandlerDataType):void {}
    abstract customFailure(status:number):void
    abstract verifyFilename(fn:string):boolean
    /**if handler fails */
    failed(status:number) {
        Failed = true
        this.customFailure(status)
    }
}



/** for loading Generic JSON */
export class JSONHandler<JSONType> extends Handler<JSONType> {
    
    constructor(fileName:string, name:string, callback?:()=>void) { super(fileName, name, callback) }
    blankData():JSONType { return {} as JSONType }
    getData() {
        fetch(this.fileName)
            .then(response => this.handleResponse(response)?.json())
            .then(data => this.defaultCallback(data as JSONType))
    }
    customFailure(status: number): void {}
    handleResponse(response: Response): Response {
        switch (response.status) {
            case 200:
                break
            case 404:
                this.failed(404)
                break
            default:
                console.log(response)
                console.error(`got a ${response.status}???`)
                this.failed(response.status)
                break
        }
        return response
    }
    verifyFilename(fn: string): boolean {
        return fn.endsWith(".json")
    }
}

export let RoomHandler = JSONHandler<RoomJSONData>

export let TileHandler = JSONHandler<TileJSONData>

export class ImageHandler extends Handler<HTMLImageElement> {
    constructor(fn:string, name:string, callback?:()=>void) { super(fn, name, callback) }
    blankData(): HTMLImageElement {
        return new Image()
    }
    getData(): void {
        this.data = new Image() 
        this.data.src = this.fileName
        this.data.onload = () => this.defaultCallback(this.data)
    }
    customCallback(data: HTMLImageElement): void {}
    customFailure(status: number): void {}
    verifyFilename(fn: string): boolean {
        return fn.endsWith(".png")
    }

}
let dataCanvas: HTMLCanvasElement = document.getElementById("datacanvas") as HTMLCanvasElement
let dataCtx: CanvasRenderingContext2D = dataCanvas.getContext("2d") as CanvasRenderingContext2D
type RowMetum = {
    framePos:Vec2,
    frameSize:Vec2,
    frameCount:number
}

/** doesnt really follow the other handlers, but it literally handles animations
 so it would be dumb to call it something else */
export class AnimHandler {
    name: string
    meta: RowMetum[]
    constructor(name:string) {
        this.name = name
        // why the fuck do i need a lambda and why doesnt .bind work??????
        new ImageHandler(`static/img/char/${this.name}.char.png`, this.assetName, () => {this.extractData()})
        this.meta = []
    }
    get asset() {return Assets[this.assetName]}
    get assetName() { return `${this.name}.char.img` }
    get img() {return this.asset.data as HTMLImageElement}
    getImageData(x:number,y:number,w:number,h:number) {
        //make the canvas the right size, put then pull the image
        //why is this so weird
        dataCanvas.width = this.img.width
        dataCanvas.height = this.img.height
        dataCtx.drawImage(this.img, 0, 0)
        return dataCtx.getImageData(x,y,w,h)
    }
    extractData() {
        let rawMeta = this.getImageData(0,0,this.img.width,1)
        let runningmax = -1
        for (let i=0; i<rawMeta.data.length; i += 12) {
            let chunk = rawMeta.data.slice(i, i+12)
            // if width is not a multiple of 3 (12 rgba values) then final chunk will be short, therefore invalid, so skip
            if (chunk.length != 12) { continue }
            // metums must be in order to filter out invalid ones
            if (chunk[1] < runningmax) { continue }
            runningmax = chunk[1]
            this.meta.push({
                framePos: new Vec2(chunk[0],chunk[1]),
                frameSize: new Vec2(chunk[4],chunk[5]),
                frameCount: chunk[8],
            } as RowMetum)
        }
    }
    /** returns the specified frame 
     * @param {number} u which frame row in the sheet
     * @param v which frame in the row
    */
    frame(u:number,v:number) {
        
    }
}