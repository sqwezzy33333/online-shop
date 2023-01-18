import { Loader } from '../loader/loader';
import { IProduct } from '../types/types';

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
        for(let i = 0; i < products.length; i++){
            const product: IProduct = products[i];
            const catalog = document.querySelector('.main__catalog') as HTMLElement;
            const div = document.createElement('div') as HTMLElement;
            div.classList.add("catalog__product");
            div.classList.add("product");
            const cart: string = `
                <div class="product__discount-wrap">
                <p class="product__discount">-${product.discountPercentage}%</p>
                </div>
                <div class="product__image">
                <img src="${product.thumbnail}" alt="picture"></img>
                </div>
                <div class="product__rating-wrap">
                <p class="product__rating">★${product.rating}</p>
                </div>
                <div class="product__title-wrap">
                <p class="product__title">${product.title}</p>
                </div>
                <div class="product__price-wrap">
                <p class="product__price price">${product.price}$ 
                    <span class="price__old">${Math.round(product.price * (product.discountPercentage / 100) + product.price)}$</span>
                    <span class="price__discount">${Math.round(product.price - (product.price * (product.discountPercentage / 100) + product.price))}$</span>
                </p>
                </div>
                <div class="product__add-wrap">
                <button class="product__add">Add to cart</button>
                </div>`;
            div.innerHTML = cart;
            catalog.appendChild(div);
        }
    }
}