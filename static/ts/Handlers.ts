import { IAsset, IAssetMap, RoomJSONData, TileJSONData } from "./Const.js"

/**how many handlers should be loaded */
export let TargetHandlers = 0
/**how many handlers are loaded*/
export let HandlersLoaded = 0
/** if a handler has failed */
export let Failed = false
/** stores assets for use */
export let Assets: IAssetMap = {}

/** basic handler */
abstract class Handler<HandlerDataType> {
    data: HandlerDataType
    assetName: string
    fileName: string
    firstLoad: Boolean
    constructor(fn:string, name:string) {
        if (!this.verifyFilename(fn)) {
            throw TypeError(`File ${fn} is not valid for this Handler}`)
        }
        this.firstLoad = true
        this.fileName = fn
        this.assetName = name
        this.data = this.blankData()

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
        Assets[this.assetName] = ({
            "loaded": false,
            "file": this.fileName,
            "name": this.assetName,
            "data": undefined
        } as IAsset)

        
        TargetHandlers += 1
        this.getData()
    }

    /**call once asset loaded */
    defaultCallback(data:HandlerDataType): void {
        HandlersLoaded += 1
        Assets[this.assetName].loaded = true
        Assets[this.assetName].data = data

        this.customCallback(data)
    }
    abstract blankData():HandlerDataType
    abstract getData():void
    abstract customCallback(data:HandlerDataType):void
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
    
    constructor(fileName:string, name:string) { super(fileName, name) }
    blankData():JSONType {
        return {} as JSONType
    }
    getData() {
        fetch(this.fileName)
            .then(response => this.handleResponse(response)?.json())
            .then(data => this.defaultCallback(data as JSONType))
    }
    customCallback(data: JSONType): void {
        this.data = data
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
    constructor(fn:string, name:string) { super(fn, name) }
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