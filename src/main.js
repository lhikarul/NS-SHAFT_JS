import { DataStore } from "./js/base/DataStore";
import { Director } from "./js/Director";
import { Background } from "./js/runtime/Background";

export class Main {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();

        this.firstLoaded();

    }
    firstLoaded () {
        const ww = this.canvas.width = window.innerWidth;
        const wh = this.canvas.height = window.innerHeight;
        this.dataStore.ctx = this.ctx;
        this.dataStore.ww = ww;
        this.dataStore.wh = wh;
        this.dataStore.gameWidth = 700;
        this.init();
    }
    init() {
        this.dataStore.set('background',Background);
        this.director.run();
    }
}