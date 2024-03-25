/**how many handlers should be loaded */
export let TargetHandlers = 0
/**how many handlers are loaded*/
export let HandlersLoaded = 0
/** if a handler has failed */
export let Failed = false

/** basic handler */
abstract class Handler<HandlerDataType> {
    data: HandlerDataType | undefined
    constructor() {
        this.data = undefined
        TargetHandlers += 1
    }

    /**call once asset loaded */
    defaultCallback(data:HandlerDataType): void {
        HandlersLoaded += 1
        this.customCallback(data)
    }
    abstract customCallback(data:HandlerDataType):void
    abstract customFailure(status:number):void
    abstract customResponseHandler(response:Response):Promise<HandlerDataType>
    handleResponse(response:Response) {
        switch (response.status) {
            case 200:
                return this.customResponseHandler(response)
            case 404:
                this.failed(404)
                break
            default:
                console.log(response)
                console.error(`got a ${response.status}???`)
                this.failed(response.status)
                break
        }
        
    }
    /**if handler fails */
    failed(status:number) {
        Failed = true
        this.customFailure(status)
    }
}

interface RoomData {
    "layout": [[string]]
}

/** for loading room JSON */
export class RoomHandler extends Handler<RoomData> {
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
    customFailure(status: number): void {}
    customResponseHandler(response: Response): Promise<RoomData> {
        return response.json()
    }
}