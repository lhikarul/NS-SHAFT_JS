import {Vector} from '../base/Vector';
import { DataStore } from '../base/DataStore';

export class Ladders {
    constructor(args) {
        const def = {
            p: new Vector(0,0),
            v: new Vector(0,-3),
            a: new Vector(0,0),
            width: 150,
            height: 20,
            extraHeight: 0,
            type: "normal",
            active: true
        }
        Object.assign(def,args);
        Object.assign(this,def);
    }
    get ctx () {
        return DataStore.getInstance().ctx;
    }
    update () {
        // 更新樓梯的 Y 值, y = -3, 樓梯向上 3 像素

        this.p = this.p.add(this.v) // 樓梯的位置
        this.v = this.v.add(this.a) // 樓梯的移動速度

        if (this.p.y < -20) {
            this.active = false;
        }
    }

    draw () {
        this.update();
        this.ctx.save();
            this.ctx.translate(this.p.x - this.width/2, this.p.y - this.extraHeight);
            this.ctx.fillStyle = "#888";
            this.ctx.fillRect(0,0,this.width,this.height / 2);

        this.ctx.restore();
    }
}