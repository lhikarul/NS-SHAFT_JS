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
        this.laddersType = [
            "normal","jump","slideLeft","slideRight",
            "hurt","fade"
        ]
    }

    createLadders() {
       const wh = this.dataStore.get('wh');
       const ladders = this.dataStore.get('ladders');

        // wh/150 --> 每個階梯的間隔為 150
        for (let i=0; i < wh/150; i++) {
            ladders.push(new Ladders({
                p: new Vector(Math.random() * this.width, i * 150 + 100), // i=0, 樓梯 Y 為100, i=1, Y 為 250, 不停的向下增加樓梯
                type: this.laddersType[parseInt(Math.random() * this.laddersType.length)]
            }))
        }
    }

    run () {
        this.dataStore.get('background').draw();
        this.dataStore.get('ladders').forEach(ladder => ladder.draw());

        const timer = requestAnimationFrame(() => this.run());
        this.dataStore.set('timer ',timer)
    }
}