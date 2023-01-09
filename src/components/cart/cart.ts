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

      let currentPay: string | null = this.cartHeaderTotal.textContent;

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
              <input min="1" class="list-products__input" id="count-prod-on-cart" value="1" type="number"/>
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
            <div class="summary__total"><div class="summary-wrapper-tot">Total: <span id="cart-total">${currentPay}$</span></div></div>
            <form action="#" class="summary__form">
              <input maxlength="8" type="text" placeholder="Enter promo" class="summary__input">
              <div class="summary__promo-info">Promo - 'P5683L', 'BL7DOF22'</div>
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
      this.makeDiscount();
      this.addMoreProd();
    });
  }

  makeDiscount():void {
    const formWrapper = document.querySelector('.summary__form') as HTMLElement;
    const totalPriceSpan = document.getElementById('cart-total') as HTMLElement;
    const totalWrapper = document.querySelector('.summary__total') as HTMLElement;
    const inputPromo = document.querySelector('.summary__input') as HTMLInputElement;
    const titalWrapperBlock = document.querySelector('.summary-wrapper-tot') as HTMLInputElement;

    inputPromo.addEventListener('input', () => {
      if (inputPromo.value === 'P5683L' && document.getElementById('P5683L') === null) {
        const promoBlock = document.createElement('div');
        promoBlock.id = `P5683L`;
        promoBlock.className = 'promo-block';
        /*html*/
        promoBlock.innerHTML = `<span>P5683L - 10%</span><div class="discount-btn" id="disc-P5683L">add</div>`;
        formWrapper.append(promoBlock);
        const btnAdd = document.getElementById('disc-P5683L') as HTMLElement;

        btnAdd?.addEventListener('click', () => {
          if (document.getElementById('added-btn-P5683L') === null) {
            let newPrice: number = 0;
            if (localStorage.getItem('newPrice') === null) {
              newPrice = Math.round(
                Number(this.cartHeaderTotal.textContent) - Number(this.cartHeaderTotal.textContent) / 10
              );
            } else {
              newPrice = Math.round(
                Number(localStorage.getItem('newPrice')) - Number(localStorage.getItem('newPrice')) / 10
              );
            }
            titalWrapperBlock.style.textDecoration = 'line-through';
            localStorage.setItem('newPrice', `${newPrice}`);

            const discount = document.createElement('div') as HTMLElement;
            discount.innerHTML = `<div class="added-discount" id="discount-block-P5683L"><span class="added-span">P5683L - 10%</span><div class="added-btn" id="added-btn-P5683L">delete</div></div>`;

            if (document.querySelector('.newPriceSpan') === null) {
              const newPriceBlock = document.createElement('div');
              newPriceBlock.className = 'newPriceBlock';
              newPriceBlock.innerHTML = `Total: <span class="newPriceSpan">${newPrice}$</span>`;
              totalWrapper.append(newPriceBlock);
            } else {
              const newPriceBlock = document.querySelector('.newPriceSpan') as HTMLElement;
              newPriceBlock.innerHTML = `<span class="newPriceSpan">${newPrice}$</span>`;
            }

            inputPromo.value = '';
            totalWrapper.append(discount);
            promoBlock.remove();
          }
          if (document.getElementById('added-btn-P5683L')) {
            const btn = document.getElementById('added-btn-P5683L') as HTMLElement;
            btn.addEventListener('click', () => {
              let newPriceBlock = document.querySelector('.newPriceBlock') as HTMLAnchorElement;
              let discount = document.getElementById('discount-block-P5683L');
              discount?.remove();
              let newPrice: number = Math.round(
                Number(this.cartHeaderTotal.textContent) - Number(this.cartHeaderTotal.textContent) / 15
              );
              newPriceBlock.innerHTML = `Total: <span class="newPriceSpan">${newPrice}$</span>`;
              if (document.getElementById('added-btn-BL7DOF22') === null) {
                newPriceBlock.remove();
                titalWrapperBlock.style.textDecoration = 'none';
                let headerPrice = this.cartHeaderTotal.textContent;
                if (headerPrice !== null) localStorage.setItem('newPrice', headerPrice);
              }
            });
          }
        });
      } else if (inputPromo.value === 'BL7DOF22' && document.getElementById('BL7DOF22') === null) {
        const promoBlock = document.createElement('div');
        promoBlock.id = `BL7DOF22`;
        promoBlock.className = 'promo-block';
        /*html*/
        promoBlock.innerHTML = `<span>BL7DOF22 - 15%</span><div class="discount-btn" id="disc-BL7DOF22">add</div>`;
        formWrapper.append(promoBlock);

        const btnAdd = document.getElementById('disc-BL7DOF22') as HTMLElement;

        btnAdd?.addEventListener('click', () => {
          if (document.getElementById('added-btn-BL7DOF22') === null) {
            let newPrice: number = 0;
            if (localStorage.getItem('newPrice') === null) {
              newPrice = Math.round(
                Number(this.cartHeaderTotal.textContent) - Number(this.cartHeaderTotal.textContent) / 15
              );
            } else {
              newPrice = Math.round(
                Number(localStorage.getItem('newPrice')) - Number(localStorage.getItem('newPrice')) / 15
              );
            }
            localStorage.setItem('newPrice', `${newPrice}`);
            titalWrapperBlock.style.textDecoration = 'line-through';

            let discount = document.createElement('div');
            discount.innerHTML = `<div class="added-discount" id='discount-block-BL7DOF22'><span class="added-span" >BL7DOF22 - 15%</span><div class="added-btn" id="added-btn-BL7DOF22">delete</div></div>`;

            if (document.querySelector('.newPriceSpan') === null) {
              const newPriceBlock = document.createElement('div');
              newPriceBlock.className = 'newPriceBlock';
              newPriceBlock.innerHTML = `Total: <span class="newPriceSpan">${newPrice}$</span>`;
              totalWrapper.append(newPriceBlock);
            } else {
              const newPriceBlock = document.querySelector('.newPriceSpan') as HTMLElement;
              newPriceBlock.innerHTML = `<span class="newPriceSpan">${newPrice}$</span>`;
            }

            totalWrapper.append(discount);

            inputPromo.value = '';
            promoBlock.remove();
          }
          if (document.getElementById('added-btn-BL7DOF22')) {
            const btn = document.getElementById('added-btn-BL7DOF22') as HTMLElement;
            btn.addEventListener('click', () => {
              let discount = document.getElementById('discount-block-BL7DOF22');
              let newPriceBlock = document.querySelector('.newPriceBlock') as HTMLAnchorElement;
              discount?.remove();
              let newPrice: number = Math.round(
                Number(this.cartHeaderTotal.textContent) - Number(this.cartHeaderTotal.textContent) / 10
              );
              newPriceBlock.innerHTML = `Total: <span class="newPriceSpan">${newPrice}$</span>`;
              if (document.getElementById('added-btn-P5683L') === null) {
                titalWrapperBlock.style.textDecoration = 'none';
                newPriceBlock.remove();
                let headerPrice = this.cartHeaderTotal.textContent;
                if (headerPrice !== null) localStorage.setItem('newPrice', headerPrice);
              }
            });
          }
        });
      }

      if (inputPromo.value === 'P5683L' && document.getElementById('BL7DOF22')) {
        let deleteBlock = document.getElementById('BL7DOF22') as HTMLElement;
        deleteBlock.remove();
      } else if (inputPromo.value === 'BL7DOF22' && document.getElementById('P5683L')) {
        let deleteBlock = document.getElementById('P5683L') as HTMLElement;
        deleteBlock.remove();
      }
    });
  }

  addMoreProd(){
    const g = document.querySelectorAll('.stock-and-price-block__count-of-prod');
    g.forEach((el)=>{
      let addProdBtn = el.children[0] as HTMLElement;
      let countOfProd = el.children[1] as HTMLElement;
      let lessProdBtn = el.children[2] as HTMLElement;
      lessProdBtn.addEventListener('click', ()=>{
        console.log(el.previousSibling?.previousSibling?.textContent)
      })
    })
  }
}
