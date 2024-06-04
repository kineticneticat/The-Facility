export const gridDim = 5;
export const underView = 10;
export const blankSubsetLayer = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
];
export const blankSubset = [
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer
];
export const dt = 0.01;
export const walkSpeed = 7;
export function tripleLoop(iterable, callback) {
    let output = [];
    for (const i in iterable) {
        const I = parseInt(i);
        for (const j in iterable[I]) {
            const J = parseInt(j);
            for (const k in iterable[I][J]) {
                const K = parseInt(k);
                output.push(callback(I, J, K, iterable[I][J][K]));
            }
        }
    }
    return output;
}
export function doubleLoop(iterable, callback) {
    let output = [];
    for (const i in iterable) {
        const I = parseInt(i);
        for (const j in iterable[I]) {
            const J = parseInt(j);
            output.push(callback(I, J, iterable[I][J]));
        }
    }
    return output;
}
export let drawPos = {
    CENTRE: (topleft, size) => { return topleft.sub(size.div(2)); },
    TOPLEFT: (topleft, size) => { return topleft; }
};
export function f(obj) { return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k])); }
//# sourceMappingURL=Const.js.map