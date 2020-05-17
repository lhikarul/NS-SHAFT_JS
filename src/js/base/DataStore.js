// 變數緩存器, 所有的數據統一由 DataStore 管理
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
        if (value && typeof value === "function" && !value.getInstance) {
            value = new value();
        }
        this.map.set(key,value);
        return this;
    }
    get(key) {
        return this.map.get(key);
    }
    destory() {
        for (let value of this.map.values()) {
            value = null;
        }
    }
}