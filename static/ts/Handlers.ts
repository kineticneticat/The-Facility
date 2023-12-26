/**how many handlers should be loaded */
export let TargetHandlers = 0
/**how many handlers are loaded*/
export let HandlersLoaded = 0
/** if a handler has failed */
export let Failed = false

/** basic handler */
abstract class Handler {
    data: any
    constructor() {
        TargetHandlers += 1
    }

    /**call once asset loaded */
    defaultCallback(data:any): void {
        HandlersLoaded += 1
        this.customCallback(data)
    }
    abstract customCallback(data:any):void
    handleResponse(response:Response) {
        switch (response.status) {
            case 200:
                return response.json()
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
    /**if handler fails */
    failed() {
        Failed = true
    }
}

interface RoomData {
    "layout": [[string]]
}

/** for loading room JSON */
export class RoomHandler extends Handler {
    fileName: string
    constructor(fileName:string) {
        super()
        this.fileName = fileName
        fetch(fileName)
            .then(response => this.handleResponse(response))
            .then(data => this.defaultCallback(data as RoomData))
    }
    customCallback(data: RoomData): void {
        this.data = data
    }

}