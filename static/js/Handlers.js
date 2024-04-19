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
    extCallback;
    constructor(fn, name, extCallback) {
        if (!this.verifyFilename(fn)) {
            throw TypeError(`File ${fn} is not valid for this Handler}`);
        }
        extCallback = extCallback ? extCallback : () => { };
        this.firstLoad = true;
        this.fileName = fn;
        this.assetName = name;
        this.data = this.blankData();
        this.extCallback = extCallback;
        // make sure asset hasnt already been loaded
        if (Object.keys(Assets).includes(this.assetName)) {
            this.firstLoad = false;
            this.data = Assets[this.assetName].data;
            return;
        }
        //if first load; do normal stuff
        // add asset so data can be accessed later
        Assets[this.assetName] = {
            loaded: false,
            file: this.fileName,
            name: this.assetName,
            data: this.data
        };
        this.getData();
    }
    /**call once asset loaded */
    defaultCallback(data) {
        Assets[this.assetName].data = data;
        this.data = data;
        this.intCallback(data);
        this.extCallback();
        Assets[this.assetName].loaded = true;
    }
    /** called internally w/in handler to finish up */
    intCallback(data) { }
    /**if handler fails */
    failed(status) {
        Failed = true;
        this.customFailure(status);
    }
}
/** for loading Generic JSON */
export class JSONHandler extends Handler {
    constructor(fileName, name, callback) { super(fileName, name, callback); }
    blankData() { return {}; }
    getData() {
        fetch(this.fileName)
            .then(response => this.handleResponse(response)?.json())
            .then(data => this.defaultCallback(data));
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
    constructor(fn, name, callback) { super(fn, name, callback); }
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