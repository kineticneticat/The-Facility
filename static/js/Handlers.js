import { Vec2 } from "./Maths.js";
/**what handlers are currently doing stuff */
export let Queue = {};
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
        if (!extCallback) {
            extCallback = () => { };
        }
        this.firstLoad = true;
        this.fileName = fn;
        this.assetName = name;
        this.data = this.blankData();
        this.extCallback = extCallback;
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
        // add asset so data can be accessed later
        Assets[this.assetName] = {
            loaded: false,
            file: this.fileName,
            name: this.assetName,
            data: this.data
        };
        // add queuer so other stuff can check for completion
        Queue[this.assetName] = {
            name: this.assetName,
            done: false,
            status: "Started!",
            failed: false
        };
        this.getData();
    }
    /**call once asset loaded */
    defaultCallback(data) {
        Queue[this.assetName].done = true;
        Queue[this.assetName].status = "Done!";
        Assets[this.assetName].loaded = true;
        Assets[this.assetName].data = data;
        this.data = data;
        this.intCallback(data);
        this.extCallback();
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
let dataCanvas = document.getElementById("datacanvas");
let dataCtx = dataCanvas.getContext("2d", { willReadFrequently: true });
/** doesnt really follow the other handlers, but it literally handles animations
 so it would be dumb to call it something else */
export class AnimHandler {
    name;
    meta;
    constructor(name) {
        this.name = name;
        // why the fuck do i need a lambda and why doesnt .bind work??????
        new ImageHandler(`static/img/char/${this.name}.char.png`, this.assetName, () => { this.extractData(); });
        this.meta = [];
    }
    get asset() { return Assets[this.assetName]; }
    get assetName() { return `${this.name}.char.img`; }
    get img() { return this.asset.data; }
    getImageData(x, y, w, h) {
        //make the canvas the right size, put then pull the image
        //why is this so weird
        dataCanvas.width = this.img.width;
        dataCanvas.height = this.img.height;
        dataCtx.drawImage(this.img, 0, 0);
        return dataCtx.getImageData(x, y, w, h);
    }
    extractData() {
        let rawMeta = this.getImageData(0, 0, this.img.width, 1);
        let runningmax = -1;
        for (let i = 0; i < rawMeta.data.length; i += 12) {
            let chunk = rawMeta.data.slice(i, i + 12);
            // if width is not a multiple of 3 (12 rgba values) then final chunk will be short, therefore invalid, so skip
            if (chunk.length != 12) {
                continue;
            }
            // metums must be in order to filter out invalid ones
            if (chunk[1] < runningmax) {
                continue;
            }
            runningmax = chunk[1];
            this.meta.push({
                framePos: new Vec2(chunk[0], chunk[1]),
                frameSize: new Vec2(chunk[4], chunk[5]),
                frameCount: chunk[8],
            });
        }
    }
    /** returns the specified frame
     * @param {number} u which frame row in the sheet
     * @param {number} v which frame in the row
    */
    frameImg(id, t) {
        let pos = this.meta[id].framePos.add([this.meta[id].frameSize.x * (t % this.meta[id].frameCount), 0]);
        return this.getImageData(...pos.add([0, 1]).xy, ...this.meta[id].frameSize.xy);
    }
}
//# sourceMappingURL=Handlers.js.map