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
                return response.json();
            case 404:
                this.failed();
                break;
            default:
                console.log(response);
                console.error(`got a ${response.status}???`);
                this.failed();
                break;
        }
    }
    /**if handler fails */
    failed() {
        Failed = true;
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
}
//# sourceMappingURL=Handlers.js.map