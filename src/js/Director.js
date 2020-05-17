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
        this.dataStore.set('time',0);
        this.time = this.dataStore.get('time');
        this.laddersType = [
            "normal","jump","slideLeft","slideRight",
            "hurt","fade"
        ]
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
        const player = Player.getInstance();

        if (ladder.p.x - ladder.width/2 < player.p.x + player.width / 2 
                && ladder.p.x + ladder.width/2 > player.p.x - player.width / 2
                    && player.p.y > ladder.p.y
                        && player.p.y < ladder.p.y + ladder.height + 10) {
            touching = true;
            ladder.step(player);
        }
    }

    run () {
        this.time += 1;
        this.dataStore.set('time',this.time);
        if (this.time % 40 === 0) {
            this.createLadders(false);
        }
        this.dataStore.get('background').draw();

        this.dataStore.get('ladders').forEach(ladder => {
            this.checkTouching(ladder);
            ladder.draw();
        });
        this.dataStore.get('player').getInstance(this.width).draw();

        const timer = requestAnimationFrame(() => this.run());
        this.dataStore.set('timer ',timer)
    }
}