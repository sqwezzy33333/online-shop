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

    async getArrayProducts(){
        return await this.loadData.load();
    }

    async drawCartGoods() {
        const products: IProduct[] = await this.getArrayProducts();
        const product: IProduct = products[0];
        console.log(product);
        return products;
    } 
}