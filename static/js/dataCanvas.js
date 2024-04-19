import { Vec2 } from "./Maths.js";
import { ImageHandler, Assets } from "./Handlers.js";
let dataCanvas = document.getElementById("datacanvas");
export let dataCtx = dataCanvas.getContext("2d", { willReadFrequently: true });
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
        // for good measure lol
    }
    get asset() { return Assets[this.assetName]; }
    get assetName() { return `${this.name}.char.img`; }
    get img() { return this.asset.data; }
    getImageData(x, y, w, h, s) {
        if (!s) {
            s = 1;
        }
        //make the canvas the right size, put then pull the image
        //why is this so weird
        dataCanvas.width = this.img.width * s;
        dataCanvas.height = this.img.height * s;
        dataCtx.imageSmoothingEnabled = false;
        dataCtx.scale(s, s);
        dataCtx.drawImage(this.img, 0, 0);
        return dataCtx.getImageData(x * s, y * s, w * s, h * s);
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
    frameImg(id, t, s) {
        if (!s) {
            s = 1;
        }
        let pos = this.meta[id].framePos.add([this.meta[id].frameSize.x * (t % this.meta[id].frameCount), 0]);
        return this.getImageData(...pos.add([0, 1]).xy, ...this.meta[id].frameSize.xy, s);
    }
}
//# sourceMappingURL=dataCanvas.js.map