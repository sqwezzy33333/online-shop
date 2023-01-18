import { IProduct } from '../types/types';

export class MainPage {
  async draw(data: IProduct[]) {
    const products: IProduct[] = data;
    const catalog = document.querySelector('.catalog__products') as HTMLElement;
    catalog.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
      const product: IProduct = products[i];
      const div = document.createElement('div') as HTMLElement;
      div.classList.add('catalog__product');
      div.classList.add('product');
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
                <span class="price__old">${Math.round(
                  product.price * (product.discountPercentage / 100) + product.price
                )}$</span>
                <span class="price__discount">${Math.round(
                  product.price - (product.price * (product.discountPercentage / 100) + product.price)
                )}$</span>
            </p>
            </div>
            <div class="product__add-wrap">
            <button class="product__add">Add to cart</button>
            </div>`;
      div.innerHTML = cart;
      catalog.appendChild(div);
    }
    const startSort: Sort = new Sort();
    const startTypeSort: string = 'rating';
    await startSort.sort(startTypeSort, listCardProducts);
  }
}