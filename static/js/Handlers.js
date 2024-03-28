/**how many handlers should be loaded */
export let TargetHandlers = 0;
/**how many handlers are loaded*/
export let HandlersLoaded = 0;
/** if a handler has failed */
export let Failed = false;
/** stores assets for use */
export let Assets = {};
/** basic handler */
class Handler {
    data;
    assetName;
    fileName;
    firstLoad;
    constructor(fn, name) {
        if (!this.verifyFilename(fn)) {
            throw TypeError(`File ${fn} is not valid for this Handler}`);
        }
        this.firstLoad = true;
        this.fileName = fn;
        this.assetName = name;
        this.data = this.blankData();
        // make sure asset hasnt already been loaded
        for (const k of Object.keys(Assets)) {
            let asset = Assets[k];
            if (asset.file == fn) {
                this.firstLoad = false;
                this.data = asset.data;
                return;
            }
        }
        //if first load; do normal stuff
        Assets[this.assetName] = {
            "loaded": false,
            "file": this.fileName,
            "name": this.assetName,
            "data": undefined
        };
        TargetHandlers += 1;
        this.getData();
    }
    /**call once asset loaded */
    defaultCallback(data) {
        HandlersLoaded += 1;
        Assets[this.assetName].loaded = true;
        Assets[this.assetName].data = data;
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
    constructor(fileName, name) { super(fileName, name); }
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
    constructor(fn, name) { super(fn, name); }
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