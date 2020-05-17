
import { DataStore } from "../base/DataStore";

export class Background {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }
    draw () {
        const ww = this.dataStore.get('ww');
        const wh = this.dataStore.get('wh');
        this.dataStore.ctx.fillStyle = "black";
        this.dataStore.ctx.fillRect(0,0,ww,wh) ;
    }
}