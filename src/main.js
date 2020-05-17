import { DataStore } from "./js/base/DataStore";
import { Director } from "./js/Director";
import { Background } from "./js/runtime/Background";
import { Player } from "./js/Player/Player";

export class Main {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();

        this.init();
    }
    init () {
         const ww = this.canvas.width = window.innerWidth;
         const wh = this.canvas.height = window.innerHeight;
       
        this.dataStore.ctx = this.ctx;

        this.dataStore
                    .set('ww',ww)
                    .set('wh',wh)
                    .set('background',Background)
                    .set('ladders',[])
                    .set('player',Player)

        this.resisgerEvent();
        this.director.createLadders();

        this.director.run();

    }
    resisgerEvent () {
        window.addEventListener('keydown',(evt) => {
            let key = evt.key.replace("Arrow","").toLowerCase();
            this.director.keyStatus[key] = true;
        })
        window.addEventListener('keyup',(evt) => {
            let key = evt.key.replace("Arrow","").toLowerCase();
            this.director.keyStatus[key] = false;
        })
    }
}