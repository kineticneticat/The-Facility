/**how many handlers should be loaded */
export let TargetHandlers = 0
/**how many handlers are loaded*/
export let HandlersLoaded = 0
/** if a handler has failed */
export let Failed = false
/** stores assets for use */
export let Assets: (Asset)[] = []

export type AssetIndex = number
interface Asset {
    file: string,
    data: any
}

/** basic handler */
abstract class Handler<HandlerDataType> {
    data: HandlerDataType
    assetIndex : AssetIndex
    fileName: string
    firstLoad: Boolean
    constructor(fn:string) {
        if (!this.verifyFilename(fn)) {
            throw TypeError(`File ${fn} is not valid for this Handler}`)
            return
        }
        this.firstLoad = true
        this.fileName = fn
        this.data = this.blankData()
        this.assetIndex = -1

        // make sure asset hasnt already been loaded
        for (const idx in Assets) {
            let asset = Assets[parseInt(idx)]
            if (asset.file == fn) {
                this.firstLoad = false
                this.data = asset.data
                this.assetIndex = parseInt(idx)
                return 
            }
        }
        //if first load; do normal stuff
        
        TargetHandlers += 1
        this.getData()
    }

    /**call once asset loaded */
    defaultCallback(data:HandlerDataType): void {
        HandlersLoaded += 1
        this.assetIndex = Assets.push({
            "file": this.fileName,
            "data": data
        } as Asset)-1 as AssetIndex

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
    
    constructor(fileName:string) { super(fileName) }
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

export interface RoomJSONData {
    "layout": [[string]]
}
export let RoomHandler = JSONHandler<RoomJSONData>

export interface TileJSONData {
    "name": string,
    "corners": {
        "000": [number, number, number],
        "100": [number, number, number],
        "001": [number, number, number],
        "010": [number, number, number],
        "101": [number, number, number],
        "110": [number, number, number],
        "011": [number, number, number],
        "111": [number, number, number]
    },
    "texture": string
}
export let TileHandler = JSONHandler<TileJSONData>

export interface ImageData {
    img: HTMLImageElement
}

export class ImageHandler extends Handler<HTMLImageElement> {
    constructor(fn:string) { super(fn) }
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