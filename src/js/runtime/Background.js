import { DataStore } from "../base/DataStore";

export class Background {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }
    draw () {
        const {ctx,ww,wh} = this.dataStore;
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,ww,wh);
    }
}