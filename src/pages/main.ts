import { IProduct } from '../types/types';

export class MainPage {
  async draw(data: IProduct[]) {
    const products: IProduct[] = data;
    let typeView = 'blocks';
    const searchClear = location.search.split('');
    searchClear.shift();
    const queryParamsString = searchClear.join('').toString();
    let paramsObject;
    if(queryParamsString !== '') {
        paramsObject = JSON.parse(
            '{"' + decodeURI(queryParamsString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
        );
    }
    if(paramsObject !== undefined){
      if(paramsObject.view !== undefined){
        typeView = paramsObject.view;
        this.drawCards(products, typeView);
      }
    }
    else {
      this.drawCards(products, typeView);
    }
    
  }

  drawCards(products: IProduct[], typeView: string){
    const catalog = document.querySelector('.catalog__products') as HTMLElement;
    const productsSpace = document.querySelector('.catalog__products') as HTMLElement;
    catalog.innerHTML = '';
    if(typeView === 'blocks'){
      productsSpace.style.display = 'grid';
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
    }
    else {
      productsSpace.style.display = 'flex';
      productsSpace.style.flexDirection = 'column';
      for (let i = 0; i < products.length; i++) {
        const product: IProduct = products[i];
        const div = document.createElement('div') as HTMLElement;
        div.classList.add('catalog__product_line');
        div.classList.add('product_line');
        const cart: string = `
              <div class="product_line__img-wrap">
                <div class="product_line__image">
                  <img src="${product.thumbnail}" alt="picture"></img>
                </div>
              </div>
              <div class="product_line__inf-wrap">
                <div class="product_line__discount-wrap">
                  <p class="product_line__discount">-${product.discountPercentage}%</p>
                </div>
                <div class="product__title-wrap">
                  <p class="product__title">${product.title}</p>
                </div>
                <div class="product_line__rating-wrap">
                  <p class="product_line__rating">★${product.rating}</p>
                </div>
                <div class="product_line__description-wrap">
                  <p class="product_line__description">${product.description}</p>
                </div>
              </div>
              <div class="product_line__add-wrap">
                <div class="product_line__price-wrap">
                  <p class="product_line__price price">${product.price}$ 
                      <span class="price__old">${Math.round(
                        product.price * (product.discountPercentage / 100) + product.price
                      )}$</span>
                      <span class="price__discount">${Math.round(
                        product.price - (product.price * (product.discountPercentage / 100) + product.price)
                      )}$</span>
                  </p>
                </div>
                <div class="product_line__add-wrap">
                  <button class="product_line__add">Add to cart</button>
                </div>
              </div>`;
        div.innerHTML = cart;
        catalog.appendChild(div);
      }
    }
  }
}