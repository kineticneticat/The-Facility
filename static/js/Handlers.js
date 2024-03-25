/**how many handlers should be loaded */
export let TargetHandlers = 0;
/**how many handlers are loaded*/
export let HandlersLoaded = 0;
/** if a handler has failed */
export let Failed = false;
/** basic handler */
class Handler {
    data;
    constructor() {
        this.data = undefined;
        TargetHandlers += 1;
    }
    /**call once asset loaded */
    defaultCallback(data) {
        HandlersLoaded += 1;
        this.customCallback(data);
    }
    handleResponse(response) {
        switch (response.status) {
            case 200:
                return this.customResponseHandler(response);
            case 404:
                this.failed(404);
                break;
            default:
                console.log(response);
                console.error(`got a ${response.status}???`);
                this.failed(response.status);
                break;
        }
    }
    /**if handler fails */
    failed(status) {
        Failed = true;
        this.customFailure(status);
    }
}
/** for loading room JSON */
export class RoomHandler extends Handler {
    fileName;
    constructor(fileName) {
        super();
        this.fileName = fileName;
        fetch(fileName)
            .then(response => this.handleResponse(response))
            .then(data => this.defaultCallback(data));
    }
    customCallback(data) {
        this.data = data;
    }
    customFailure(status) { }
    customResponseHandler(response) {
        return response.json();
    }
}
//# sourceMappingURL=Handlers.js.map