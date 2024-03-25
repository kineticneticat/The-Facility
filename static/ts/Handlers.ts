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
    name: string,
    file: string,
    data: any
}

/** basic handler */
abstract class Handler {
    Asset: AssetIndex = -1
    fileName: string
    name: string
    constructor(fileName: string, name: string) {
        this.fileName = fileName
        this.name = name
        TargetHandlers += 1
    }

    /**call once asset loaded */
    defaultCallback(data:any): void {
        HandlersLoaded += 1
        this.Asset = Assets.push({
            "file": this.fileName,
            "name": this.name,
            "data": data
        } as Asset)-1 as AssetIndex

        this.customCallback(data)
    }
    customCallback(data:any):void {}

    
    /**if handler fails */
    failed() {
        Failed = true
    }
}

/** for loading room JSON */
export class JsonHandler extends Handler {
    constructor(fileName:string, name:string) {
        super("static/json/" + fileName, name)
        fetch(this.fileName)
            .then(response => this.handleResponse(response)?.json())
            .then(data => this.defaultCallback(data))
    }

    handleResponse(response:Response) {
        switch (response.status) {
            case 200:
                return response
            case 404:
                this.failed()
                break
            default:
                console.log(response)
                console.error(`got a ${response.status}???`)
                this.failed()
                break
        }
        
    }

}

/**for loading images */
export class ImageHandler extends Handler {
    private img: HTMLImageElement
    constructor(fileName:string, name:string) {  
        super("static/img/" + fileName, name)
        this.img = new Image()
        this.img.src = this.fileName
        this.img.onload = () => this.defaultCallback(this.img)
    }
}