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
            this.ctx.fillStyle = "white";
            this.ctx.font="20px Ariel"
            this.ctx.fillText(this.type,0,30);

            if (["normal","hurt"].includes(this.type)) {
                this.ctx.fillStyle = "#888";
                this.ctx.fillRect(0,0,this.width,this.height / 2);
            }

            if (this.type === "hurt") {
                this.ctx.beginPath();
                    let span = this.width / 16;
                    for (let i=0; i<=this.width/span; i++) {
                        this.ctx.lineTo(i * span, -(i%2) * 15);
                    }
                this.ctx.fillStyle = "#ddd";
                this.ctx.fill();
            }

            if (this.type === "jump") {
                this.ctx.fillStyle = "#53d337";
                this.ctx.fillRect(0,0,this.width,5);
                this.ctx.fillRect(0,this.height + this.extraHeight, this.width, 5)
            }

            if (this.type === "fade") {
                this.ctx.fillStyle = "#ffd428";
                this.ctx.fillRect(0,0,this.width,this.height);
            }

            if (this.type === "slideLeft" || this.type === "slideRight") {
                const moveDirection = this.type === "slideLeft" ? -1 : 1;
                for (let i=0; i < this.width/20; i++) {
                    let x = i * 20 + (DataStore.getInstance().get('time') % 20) * moveDirection;
                    if (x < 0) {
                       x= 0;
                    }
                    let width = 10;
                    if (x + width > this.width) {
                        width = this.width - x < 0 ? 0 : (this.width - x);
                    }
                    this.ctx.fillStyle = "red";
                    this.ctx.save();
                        this.ctx.transform(1,0,0.5,1,0,0);
                        this.ctx.fillRect(x,0,width,this.height)
                    this.ctx.restore();
                }
            }

        this.ctx.restore();
    }
    step(player) {
        player.v.y = 0;

        if (player.lastLadder !== this) {
            player.bloodDelta(1);
        }

        if (this.type !== 'fade') {
            player.p.y = this.p.y;
        }
        
        if (this.type === "hurt") {
            if (player.lastLadder !== this) {
                player.bloodDelta(-2);
            }
        }

        if (this.type === "jump") {
            player.v.y -= 13;
        }

        if (this.type === "slideLeft"){
            player.p.x -= 1;
        }

        if (this.type === "slideRight") {
            player.p.x += 1;
        }

        if (this.type === "fade") {
            player.p.y -= 1.5;
        }
    }
}