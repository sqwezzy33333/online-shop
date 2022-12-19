import { Loader } from '../loader/loader';

interface IProduct {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
}

export class DrawElements {
    loadData: Loader;

    constructor() {
        this.loadData = new Loader('./assets/data/data.json');
    }

    async drawCartGoods() {
        const products: IProduct[] = await this.loadData.load();
        const product: IProduct = products[0];
        console.log(product);
        return products;
    } 
}