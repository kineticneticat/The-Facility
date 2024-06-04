class Waiter {
    tray;
    constructor() {
        this.tray = [];
    }
    addMeal(callback) {
        this.tray.push(callback);
    }
    serve() {
        this.tray.forEach((x) => { x(); });
    }
}
export {};
//# sourceMappingURL=Events.js.map