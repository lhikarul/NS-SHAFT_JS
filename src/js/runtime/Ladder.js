import { Vector } from "../base/Vector";
import { DataStore } from "../base/DataStore";

export class Ladder {
    constructor(args) {
        const def = {
            p: new Vector(0,0),
            v: new Vector(0,-3),
            a: new Vector(0,0),
            width: 150,
            height: 20,
            active: true
        }
        Object.assign(def,args);
        Object.assign(this,def);
    }
    get ctx () {
        return DataStore.getInstance().ctx;
    }
    update () {
        this.p = this.p.add(this.v);

        if (this.p.y < -20) {
            this.active = false;
        }
    }
    draw () {
        this.ctx.save()

        // 階梯以中心點向左一半的距離開始畫,階梯的中心點會交集邊界的垂直線
            this.ctx.translate(this.p.x - this.width/2,this.p.y);
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0,0,this.width,this.height);
        this.ctx.restore();
    }
    setPlayerStanding(player) {
        player.v.y = 0;
        player.p.y = this.p.y;
    }
}