import { IProduct } from '../../types/types';

export class Cart {
  mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  cartIcoBtn = document.querySelector('.to-basket__pict') as HTMLElement;
  headerFound = document.querySelector('.header__found') as HTMLElement;
  cartHeaderTotal = document.querySelector('.price-basket__name_count') as HTMLElement;
  constructor() {}

  makeArrayOfProducts(arr: IProduct[]) {
    const btns = document.querySelectorAll('.product__add');
    let arrayOfProdForCart: string[] = [];
    let filtredArray: IProduct[] = [];
    let sum: number;
    btns.forEach((el) => {
      el.addEventListener('click', () => {
        arrayOfProdForCart.push(el.id);
        localStorage.setItem('arrayOfId', arrayOfProdForCart.toString());

        filtredArray = arr.filter((el) => {
          let isitem: boolean = false;
          for (let i = 0; i < arrayOfProdForCart.length; i++) {
            let itemNum: string = arrayOfProdForCart[i].toString();
            if (Number(el.id) === Number(itemNum)) {
              isitem = true;
            }
          }
          if (isitem) return true;
        });
        sum = filtredArray.map((el) => el.price).reduce((partialSum, a) => partialSum + a, 0);
        localStorage.setItem('total-header', `${sum}`);
        
        this.cartHeaderTotal.innerHTML = `${sum}`;
        
       
      });
    });
  }

  drawCart(arr: IProduct[]) {
    this.cartIcoBtn.addEventListener('click', () => {
      const numberPage = document.getElementById('number-page-incart');
      const inputItemOnePage = document.getElementById('count-prod-on-cart');

      const lessItemInCardBtn = document.querySelector('.list-products__left-btn');
      const moreItemInCardBtn = document.querySelector('.list-products__right-btn');

      const countOneProdInCart = document.getElementById('cart-count-of-prod');

      const addProdInCart = document.querySelector('.stock-and-price-block__add');
      const deleteProdInCart = document.querySelector('.stock-and-price-block__delete');

      const sumOfOneProdInCart = document.getElementById('cart-price-one-prod');
      const countOfProdAll = document.getElementById('cart-prod');
      const allPriceOfProductsInCart = document.getElementById('cart-total');

      let idsFormLocal: string | null = localStorage.getItem('arrayOfId');
      let filtredArray: IProduct[];
      let arrayIdFromLocal: string[] = [];
      if (idsFormLocal) {
        arrayIdFromLocal = idsFormLocal.split(',');
      }

      filtredArray = arr.filter((el) => {
        let isitem: boolean = false;
        for (let i = 0; i < arrayIdFromLocal.length; i++) {
          let itemNum: string = arrayIdFromLocal[i].toString();
          if (Number(el.id) === Number(itemNum)) {
            isitem = true;
          }
        }
        if (isitem) return true;
      });
      this.headerFound.innerHTML = '';

      this.mainWrapper.innerHTML =
        /*html*/
        `
      <div class="main__cart cart">
      <div class="cart__wrapper">
        <div class="cart__list-products list-products">
          <div class="list-products__header">
            <h2 class="list-products__title">All products:</h2>
            <div class="list-products__limit">
              <span class="list-products__limit-info">Limit:</span>
              <input class="list-products__input" id="count-prod-on-cart" value="1" type="number"/>
            </div>
            <div class="list-products__page-caunt">
              <span class="list-products__page-title">Page:</span>
              <div class="list-products__left-btn cart-btn">←</div>
              <span id="number-page-incart" class="list-products__page-number">1</span>
              <div class="list-products__right-btn cart-btn">→</div>
            </div>
          </div>
          
        </div>
        <div class="cart__summary summary">
         <div class="summary__wrapper">
          <h2 class="summary__title">Summary</h2>
            <div class="summary__products">Products: <span id="cart-prod">${filtredArray.length}</span></div>
            <div class="summary__total">Total: <span id="cart-total">${this.cartHeaderTotal.textContent}$</span></div>
            <form action="#" class="summary__form">
              <input type="text" placeholder="Enter promo" class="summary__input">
              <div class="summary__promo-info">Promo - 'rolling-scopes-school'</div>
              <button class="summary__buy-btn">BUY NOW</button>
            </form>
         </div>
        </div>
      </div>
    </div>
    `;
      let wrapper = document.querySelector('.list-products');
      filtredArray.forEach((el) => {
        let item = document.createElement('div');
        let index: number = filtredArray.findIndex((i) => i === el) + 1;
        item.className = 'cart-item';
        item.innerHTML =
          /*html*/
          `
        <span class="cart-item__number">${index}.</span>
        <div class="cart-item__img">
          <img src="${el.images[0]}" alt="">
        </div>
        <div class="cart-item__info-block info-block">
          <h2 class="info-block__title">${el.title}</h2>
          <span class="info-block__information">${el.description}</span>
          <div class="info-block__rat-discount">
            <div class="info-block__rating stock-and-price-block__base">Rating: <span id="cart-rating">${el.rating}</span></div>
            <div class="info-block__discount stock-and-price-block__base">Discount: <span id="cart-discount">${el.discountPercentage}</span></div>
          </div>
        </div>
        <div class="cart-item__stock-and-price-block stock-and-price-block">
          <div class="stock-and-price-block__stock stock-and-price-block__base">Stock: <span id="cart-stock">${el.stock}</span></div>
          <div class="stock-and-price-block__count-of-prod">
            <div class="stock-and-price-block__add stock-and-price-block__btn">+</div>
            <span id="cart-count-of-prod">1</span>
            <div class="stock-and-price-block__delete stock-and-price-block__btn">-</div>
          </div>
          <span id="cart-price-one-prod">${el.price}$</span>
        </div>
        `;
        wrapper?.append(item);
      });
    });
  }
}
