import { DataStore } from "./base/DataStore";
import { Ladders } from "./runtime/Ladders";
import { Vector } from "./base/Vector";

export class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director()
        }
        return Director.instance;
    }
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.width = 700;
        this.time = 0;
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

    run () {
        this.time += 1;
        if (this.time % 40 === 0) {
            this.createLadders(false);
        }
        this.dataStore.get('background').draw();
        this.dataStore.get('ladders').forEach(ladder => ladder.draw());

        const timer = requestAnimationFrame(() => this.run());
        this.dataStore.set('timer ',timer)
    }
}