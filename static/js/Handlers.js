/**how many handlers should be loaded */
export let TargetHandlers = 0;
/**how many handlers are loaded*/
export let HandlersLoaded = 0;
/** if a handler has failed */
export let Failed = false;
/** stores assets for use */
export let Assets = [];
/** basic handler */
class Handler {
    data;
    assetIndex;
    fileName;
    firstLoad;
    constructor(fn) {
        if (!this.verifyFilename(fn)) {
            throw TypeError(`File ${fn} is not valid for this Handler}`);
            return;
        }
        this.firstLoad = true;
        this.fileName = fn;
        this.data = this.blankData();
        this.assetIndex = -1;
        // make sure asset hasnt already been loaded
        for (const idx in Assets) {
            let asset = Assets[parseInt(idx)];
            if (asset.file == fn) {
                this.firstLoad = false;
                this.data = asset.data;
                this.assetIndex = parseInt(idx);
                return;
            }
        }
        //if first load; do normal stuff
        TargetHandlers += 1;
        this.getData();
    }
    /**call once asset loaded */
    defaultCallback(data) {
        HandlersLoaded += 1;
        this.assetIndex = Assets.push({
            "file": this.fileName,
            "data": data
        }) - 1;
        this.customCallback(data);
    }
    /**if handler fails */
    failed(status) {
        Failed = true;
        this.customFailure(status);
    }
}
/** for loading Generic JSON */
export class JSONHandler extends Handler {
    constructor(fileName) { super(fileName); }
    blankData() {
        return {};
    }
    getData() {
        fetch(this.fileName)
            .then(response => this.handleResponse(response)?.json())
            .then(data => this.defaultCallback(data));
    }
    customCallback(data) {
        this.data = data;
    }
    customFailure(status) { }
    handleResponse(response) {
        switch (response.status) {
            case 200:
                break;
            case 404:
                this.failed(404);
                break;
            default:
                console.log(response);
                console.error(`got a ${response.status}???`);
                this.failed(response.status);
                break;
        }
        return response;
    }
    verifyFilename(fn) {
        return fn.endsWith(".json");
    }
}
export let RoomHandler = (JSONHandler);
export let TileHandler = (JSONHandler);
export class ImageHandler extends Handler {
    constructor(fn) { super(fn); }
    blankData() {
        return new Image();
    }
    getData() {
        this.data = new Image();
        this.data.src = this.fileName;
        this.data.onload = () => this.defaultCallback(this.data);
    }
    customCallback(data) { }
    customFailure(status) { }
    verifyFilename(fn) {
        return fn.endsWith(".png");
    }
}
//# sourceMappingURL=Handlers.js.map