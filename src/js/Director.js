import { DataStore } from "./base/DataStore";

export class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    constructor() {
        this.dataStore = DataStore.getInstance();
    }
    run () {
        this.dataStore.get('background').draw();
    }
    draw () {

    }
}