import { DataStore } from "./base/DataStore";
import { Ladders } from "./runtime/Ladders";
import { Vector } from "./base/Vector";
import { Player } from "./Player/Player";

export class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director()
        }
        return Director.instance;
    }
    constructor() {
        this.width = 700;
        this.dataStore = DataStore.getInstance();
        this.player = Player.getInstance(this.width);
        this.dataStore.set('time',0);
        this.time = this.dataStore.get('time');
        this.laddersType = [
            "normal","jump","slideLeft","slideRight",
            "hurt","fade"
        ]
        this.keyStatus = {
            left: false,
            right: false
        }
    }

    get ctx () {
        return this.dataStore.ctx;
    }

    createLadders(inner = true) {
       const wh = this.dataStore.get('wh');

       let ladders = this.dataStore.get('ladders');
        if (inner) {
            // wh/150 --> 每個階梯的間隔為 150
            for (let i=0; i < wh/150; i++) {
                ladders.push(new Ladders({
                    p: new Vector(Math.random() * this.width, i * 150 + 100), // i=0, 樓梯 Y 為100, i=1, Y 為 250, 不停的向下增加樓梯
                    type: this.laddersType[parseInt(Math.random() * this.laddersType.length)]
                }))
            }
        }else {
            ladders.push(new Ladders({
                p: new Vector(Math.random() * this.width, wh),
                type: this.laddersType[parseInt(Math.random() * this.laddersType.length)]
            }))
        }

        // remove ladders
        ladders = ladders.filter(ladder => ladder.active);

        this.dataStore.set('ladders',ladders);
    }

    checkTouching (ladder) {
        let touching = false;

        if (ladder.p.x - ladder.width/2 < this.player.p.x + this.player.width / 2 
                && ladder.p.x + ladder.width/2 > this.player.p.x - this.player.width / 2
                    && this.player.p.y > ladder.p.y
                        && this.player.p.y < ladder.p.y + ladder.height + 10) {
            touching = true;
            ladder.step(this.player);
        }
    }

    playerMoving() {
        if (this.keyStatus.left) {
            this.player.p.x -= 4;
        }
        if (this.keyStatus.right) {
            this.player.p.x += 4;
        }
    }

    run () {
        this.time += 1;
        this.dataStore.set('time',this.time);
        if (this.time % 40 === 0) {
            this.createLadders(false);
        }

        this.playerMoving();
        this.dataStore.get('background').draw();
        this.draw();

        const timer = requestAnimationFrame(() => this.run());
        this.dataStore.set('timer ',timer)
    }

    draw () {
        const wh = this.dataStore.get('wh');
        const ww = this.dataStore.get('ww');
        this.ctx.save();
            this.ctx.translate(ww/2 - this.width/2,0);

            this.dataStore.get('ladders').forEach(ladder => {
                this.checkTouching(ladder);
                ladder.draw();
            });

            this.player.draw();

            this.ctx.beginPath();
                this.ctx.moveTo(0,0);
                this.ctx.lineTo(0,wh);
                this.ctx.moveTo(this.width,0)
                this.ctx.lineTo(this.width,wh)
                this.ctx.strokeStyle = "rgba(255,255,255,0.3)"
                this.ctx.stroke()

        this.ctx.restore();
    }
}