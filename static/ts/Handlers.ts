import { Asset, SimpleMap, RoomJSONData, TileJSONData } from "./Const.js"
import { Vec3 } from "./Maths.js"
/** if a handler has failed */
export let Failed = false
/** stores assets for use */
export let Assets: SimpleMap<Asset<any>> = {}

export interface HandlerUser {
    callback():void
}

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
        extCallback = extCallback ? extCallback : ()=>{}
        this.firstLoad = true
        this.fileName = fn
        this.assetName = name
        this.data = this.blankData()
        this.extCallback = extCallback

        // make sure asset hasnt already been loaded
        if (Object.keys(Assets).includes(this.assetName)) {
            this.firstLoad = false
            this.data = Assets[this.assetName].data
            return
        }

        //if first load; do normal stuff
        // add asset so data can be accessed later
        Assets[this.assetName] = ({
            loaded: false,
            file: this.fileName,
            name: this.assetName,
            data: this.data
        } as Asset<HandlerDataType>)
        
        this.getData()
    }

    /**call once asset loaded */
    defaultCallback(data:HandlerDataType): void {
        Assets[this.assetName].data = data
        this.data = data

        this.intCallback(data)
        this.extCallback()

        Assets[this.assetName].loaded = true
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
