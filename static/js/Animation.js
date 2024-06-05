import { Vec2 } from "./Maths.js";
import { ImageHandler, Assets, JSONHandler } from "./Handlers.js";
let dataCanvas = document.getElementById("datacanvas");
export let dataCtx = dataCanvas.getContext("2d", { willReadFrequently: true });
/** doesnt really follow the other handlers, but it literally handles animations
 so it would be dumb to call it something else */
export class AnimHandler {
    name;
    meta;
    alias;
    imgdata;
    dataLoaded = false;
    imgLoaded = false;
    /**
     *
     * @param name name of animation, used for asset & file
     * @constructor
     * */
    constructor(name) {
        this.name = name;
        this.meta = [];
        this.alias = {};
        if (Object.keys(Assets).includes(this.assetName)) {
            return;
        }
        new JSONHandler(`static/anim/data/${this.name}.data.json`, this.dataAssetName, () => { this.dataCallback(); });
        new ImageHandler(`static/anim/img/${this.name}.anim.png`, this.imgAssetName, () => { this.imgCallback(); });
        Assets[this.assetName] = {
            loaded: false,
            data: this
        };
    }
    get assetName() { return `${this.name},anim`; }
    get imgAssetName() { return `${this.name},anim.img`; }
    get imgAsset() { return Assets[this.imgAssetName]; }
    get img() { return this.imgAsset.data; }
    get dataAssetName() { return `${this.name},anim.data`; }
    get dataAsset() { return Assets[this.dataAssetName]; }
    get data() { return this.dataAsset.data; }
    dataCallback() {
        this.dataLoaded = true;
        this.alias = this.data.alias;
        for (const idx in this.data.meta) {
            this.meta.push({
                framePos: Vec2.list(this.data.meta[idx].topleft),
                frameSize: Vec2.list(this.data.meta[idx].size),
                frameCount: this.data.meta[idx].frames
            });
        }
        if (this.dataLoaded && this.imgLoaded) {
            this.finish();
        }
    }
    imgCallback() {
        this.imgLoaded = true;
        if (this.dataLoaded && this.imgLoaded) {
            this.finish();
        }
    }
    finish() {
        Assets[this.assetName].loaded = true;
    }
    getImageData(x, y, w, h, s) {
        if (this.imgdata) {
            return this.imgdata;
        } // imgdata might be cached
        s = s ? s : 1;
        //make the canvas the right size, put then pull the image
        //why is this so weird
        dataCanvas.width = this.img.width * s;
        dataCanvas.height = this.img.height * s;
        dataCtx.imageSmoothingEnabled = false;
        dataCtx.scale(s, s);
        dataCtx.drawImage(this.img, 0, 0);
        return dataCtx.getImageData(x * s, y * s, w * s, h * s);
    }
    // extractData() {
    // let rawMeta = this.getImageData(0, 0, this.img.width, 1);
    // let runningmax = -1;
    // for (let i = 0; i < rawMeta.data.length; i += 12) {
    //     let chunk = rawMeta.data.slice(i, i + 12);
    //     // if width is not a multiple of 3 (12 rgba values) then final chunk will be short, therefore invalid, so skip
    //     if (chunk.length != 12) { continue; }
    //     // metums must be in order to filter out invalid ones
    //     if (chunk[1] < runningmax) { continue; }
    //     runningmax = chunk[1];
    //     this.meta.push({
    //         framePos: new Vec2(chunk[0], chunk[1]),
    //         frameSize: new Vec2(chunk[4], chunk[5]),
    //         frameCount: chunk[8],
    //     } as RowMetum);
    // }
    // }
    /**
     *
     * @param id id of frame
     * @param f frame
     * @param s scale
     * @returns imageData of frame
     */
    frameImgID(id, f, s) {
        s = s ? s : 1;
        let pos = this.meta[id].framePos.add([this.meta[id].frameSize.x * (f % this.meta[id].frameCount), 0]);
        return this.getImageData(...pos.xy, ...this.meta[id].frameSize.xy, s);
    }
    /**
     * returns the specified frame
     * @param name name w/ respect to alias
     * @param f frame
     * @param s scale
     * @returns imageData of frame
     */
    frameImgName(name, f, s) {
        return this.frameImgID(this.alias[name], f, s);
    }
}
export function drawLoopingAnimFrame(ctx, asset, name, frame, scale, pos, corner) {
    let img = Assets[asset].data.frameImgName(name, frame, scale);
    ctx.putImageData(img, ...corner(pos, Vec2.fromImgData(img)).xy);
}
//# sourceMappingURL=Animation.js.map