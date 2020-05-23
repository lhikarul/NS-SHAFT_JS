export class DataStore {
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
    constructor() {
        this.map = new Map();
    }
    set(key,value) {
        if (value && typeof value === "function") {
            value = new value();
        }
        this.map.set(key,value);
        return this;
    }
    get(key) {
        return this.map.get(key);
    }
}