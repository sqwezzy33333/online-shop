import { Loader } from '../loader/loader';

export class DrawElements {
    loadData: Loader;

    constructor() {
        this.loadData = new Loader('./assets/data/data.json');
    }

    async drawCartGoods() {
        const data = this.loadData.load();
        return data;
    } 
}