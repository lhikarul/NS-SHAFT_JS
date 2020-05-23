import { DataStore } from "./base/DataStore";
import {Ladder} from './runtime/Ladder';
import { Vector } from "./base/Vector";

export class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.ladders = [];
    }
    get ctx () {
        return this.dataStore.ctx;
    }
    createLadders() {
        const {gameWidth} = this.dataStore;

        for (let i=0; i < this.dataStore.wh/150; i++) {
            this.ladders.push(new Ladder({
                p: new Vector(Math.random() * gameWidth, i * 150 + 100)
            }))
        }
    }
    run () {
        this.dataStore.get('background').draw();
        this.createLadders();   
        this.draw();   
    }   
    draw () {
        const {ww,gameWidth} = this.dataStore;
        this.ctx.save();
            this.ctx.translate((ww-gameWidth)/2,0);
            this.ladders.forEach(ladder => ladder.draw());
        this.ctx.restore();
    }
}