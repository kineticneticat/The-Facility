export let Waiters;
export class Waiter {
    tray;
    constructor(name) {
        this.tray = [];
        Waiters[name] = this;
    }
    addMeal(callback) {
        this.tray.push(callback);
    }
    serve() {
        this.tray.forEach((x) => { x(); });
    }
}
//# sourceMappingURL=Waiter.js.map