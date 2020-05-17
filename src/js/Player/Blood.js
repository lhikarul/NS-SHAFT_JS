import { DataStore } from "../base/DataStore";

export class Blood {
    constructor(blood,maxBlood) {
        this.blood = blood;
        this.maxBlood = maxBlood;
    }
    get ctx () {
        return DataStore.getInstance().ctx;
    }
    bloodDelta(delta){
        if (this.blood > this.maxBlood) {
            this.blood = this.maxBlood;
        }
        if (this.blood < 0) {
            this.blood = 0;
            console.log('end game')
        }
    }
    draw () {
        for (let i=0; i<10; i++) {
            this.ctx.fillStyle = i < this.blood ? "red" : "rgba(255,255,255,0.2)";
            this.ctx.fillRect(30 + i * 15 + (i-1)*4,30,10,30);
        }
    }
}