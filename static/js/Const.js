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
    for (const i in iterable) {
        const I = parseInt(i);
        for (const j in iterable[I]) {
            const J = parseInt(j);
            for (const k in iterable[I][J]) {
                const K = parseInt(k);
                callback(I, J, K, iterable[I][J][K]);
            }
        }
    }
}
//# sourceMappingURL=Const.js.map