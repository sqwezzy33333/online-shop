import { Loader } from '../main/components/loader/loader';
import { IProduct, CartObject } from '../types/types';

export class CartPage {
  mainWrapper = document.querySelector('.main') as HTMLElement;
  cartIcoBtn = document.querySelector('.to-basket__pict') as HTMLElement;
  headerFound = document.querySelector('.header__found') as HTMLElement;
  cartHeaderTotal = document.querySelector('.price-basket__name_count') as HTMLElement;
  loader: Loader;
  cartBlock: HTMLElement;

  constructor(){
    this.loader = new Loader('assets/data/data.json');
    this.cartBlock = document.body;
  }

  async createPage(id: string){
    this.cartBlock.id = id;
    const data: IProduct[] = await this.loader.load();
    this.drawCart(data);
  }

  drawCart(arr: IProduct[]) {
    this.cartHeaderTotal = document.querySelector('.price-basket__name_count') as HTMLElement;
    this.cartHeaderTotal.innerHTML = localStorage.getItem('total-header') as string
    const currentPay: string | null = this.cartHeaderTotal.textContent;
    const idsFormLocal: string | null = localStorage.getItem('arrayOfId');
    let arrayIdFromLocal: string[] = [];
    if (idsFormLocal) {
      arrayIdFromLocal = idsFormLocal.split(',');
    }

    const filtredArray: IProduct[] = arr.filter((el) => {
      let isitem: boolean = false;
      for (let i = 0; i < arrayIdFromLocal.length; i++) {
        const itemNum: string = arrayIdFromLocal[i].toString();
        if (Number(el.id) === Number(itemNum)) {
          isitem = true;
        }
      }
      if (isitem) return true;
    });
    this.headerFound.innerHTML = '';

    this.mainWrapper.innerHTML =`
    <div class="main__cart cart">
    <div class="cart__wrapper">
      <div class="cart__list-products list-products">
        <div class="list-products__header">
          <h2 class="list-products__title">All products:</h2>
          <div class="list-products__limit">
            <span class="list-products__limit-info">Limit:</span>
            <input min="1" class="list-products__input" id="count-prod-on-cart" value="1" type="number"/>
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
    let arrayFromSorage: CartObject[] = [];
    const stringProdFromLS: string | null = localStorage.getItem('storeBuyList');
    const wrapper = document.querySelector('.list-products');
    filtredArray.forEach((el) => {
      if (stringProdFromLS) arrayFromSorage = JSON.parse(stringProdFromLS);
      const item = document.createElement('div');
      const index: number = filtredArray.findIndex((i) => i === el) + 1;
      arrayFromSorage = arrayFromSorage.filter((itemFromLS) => {
        return Number(itemFromLS.price) === Number(el.price);
      });
      console.log(arrayFromSorage);
      let countOfCard: string = '1';

      if (arrayFromSorage.length > 0) countOfCard = arrayFromSorage[0].count.toString();
      item.className = 'cart-item';
      item.innerHTML =`
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
        <div  class="stock-and-price-block__stock stock-and-price-block__base">Stock: <span id="cart-stock">${el.stock}</span></div>
        <div id="arr_${index}" class="stock-and-price-block__count-of-prod">
          <div class="stock-and-price-block__add stock-and-price-block__btn">+</div>
          <span id="cart-count-of-prod">${countOfCard}</span>
          <div class="stock-and-price-block__delete stock-and-price-block__btn">-</div>
        </div>
        <span id="cart-price-one-prod">${el.price}$</span>
      </div>
      `;
      wrapper?.append(item);
    });
    this.makeDiscount();
    this.addMoreProd(filtredArray);
  }

  makeDiscount(): void {
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
              const newPriceBlock = document.querySelector('.newPriceBlock') as HTMLAnchorElement;
              const discount = document.getElementById('discount-block-P5683L');
              discount?.remove();
              const newPrice: number = Math.round(
                Number(this.cartHeaderTotal.textContent) - Number(this.cartHeaderTotal.textContent) / 15
              );
              newPriceBlock.innerHTML = `Total: <span class="newPriceSpan">${newPrice}$</span>`;
              if (document.getElementById('added-btn-BL7DOF22') === null) {
                newPriceBlock.remove();
                titalWrapperBlock.style.textDecoration = 'none';
                const headerPrice = this.cartHeaderTotal.textContent;
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

            const discount = document.createElement('div');
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
              const discount = document.getElementById('discount-block-BL7DOF22');
              const newPriceBlock = document.querySelector('.newPriceBlock') as HTMLAnchorElement;
              discount?.remove();
              const newPrice: number = Math.round(
                Number(this.cartHeaderTotal.textContent) - Number(this.cartHeaderTotal.textContent) / 10
              );
              newPriceBlock.innerHTML = `Total: <span class="newPriceSpan">${newPrice}$</span>`;
              if (document.getElementById('added-btn-P5683L') === null) {
                titalWrapperBlock.style.textDecoration = 'none';
                newPriceBlock.remove();
                const headerPrice = this.cartHeaderTotal.textContent;
                if (headerPrice !== null) localStorage.setItem('newPrice', headerPrice);
              }
            });
          }
        });
      }

      if (inputPromo.value === 'P5683L' && document.getElementById('BL7DOF22')) {
        const deleteBlock = document.getElementById('BL7DOF22') as HTMLElement;
        deleteBlock.remove();
      } else if (inputPromo.value === 'BL7DOF22' && document.getElementById('P5683L')) {
        const deleteBlock = document.getElementById('P5683L') as HTMLElement;
        deleteBlock.remove();
      }
    });
  }

  addMoreProd(filtredArray: IProduct[]): void {
    const collection = document.querySelectorAll('.stock-and-price-block__count-of-prod');
    const cartTotal = document.getElementById('cart-total') as HTMLElement;
    let arrayOfValues: CartObject[] = [];
    let arrayFromSorage: CartObject[] = [];
    const stringProdFromLS: string | null = localStorage.getItem('storeBuyList');
    if (stringProdFromLS) {
      arrayFromSorage = JSON.parse(stringProdFromLS);
      arrayOfValues = arrayFromSorage;
    }
    collection.forEach((el) => {
      const addProdBtn = el.children[0] as HTMLElement;
      const countOfProdBlock = el.children[1] as HTMLElement;
      const lessProdBtn = el.children[2] as HTMLElement;
      let countOfProd: number = 1;

      lessProdBtn.addEventListener('click', () => {
        const stockString: string | undefined = el.previousSibling?.previousSibling?.textContent?.split(' ')[1];
        const id: string = el.id.split('_')[1];
        countOfProd--;
        let stockNumber: number = 0;
        if (stockString) stockNumber = Number(stockString);
        countOfProdBlock.innerHTML = `${countOfProd}`;
        const infoObj: CartObject = {
          id: id,
          stock: stockString,
          price: filtredArray[Number(id) - 1].price,
          count: countOfProd,
        };
        arrayOfValues = arrayOfValues.filter((el) => {
          return el.id !== infoObj.id;
        });
        this.cartHeaderTotal.innerText = (
          Number(this.cartHeaderTotal.innerText) - filtredArray[Number(id) - 1].price
        ).toString();
        cartTotal.innerHTML = this.cartHeaderTotal.innerText;
        arrayOfValues.push(infoObj);
        localStorage.setItem('total-header', cartTotal.innerHTML);
        localStorage.setItem('storeBuyList', JSON.stringify(arrayOfValues));
      });

      addProdBtn.addEventListener('click', () => {
        const stockString: string | undefined = el.previousSibling?.previousSibling?.textContent?.split(' ')[1];
        const id: string = el.id.split('_')[1];
        const agg: number = Number(id);
        console.log(arrayFromSorage)
        console.log(id)
        if (arrayFromSorage?.length > 0) countOfProd = Number(arrayFromSorage[Number(id) - 1].count);
        let stockNumber: number = 0;
        console.log(countOfProd)
        if (stockString) stockNumber = Number(stockString);
        countOfProd++;
        console.log(countOfProd)
        countOfProdBlock.innerHTML = `${countOfProd}`;
        console.log(countOfProd)
        const infoObj: CartObject = {
          id: id,
          stock: stockString,
          price: filtredArray[Number(id) - 1].price,
          count: countOfProd,
        };
        arrayOfValues = arrayOfValues.filter((el) => {
          return el.id !== infoObj.id;
        });
        this.cartHeaderTotal.innerText = (
          Number(this.cartHeaderTotal.innerText) + filtredArray[Number(id) - 1].price
        ).toString();
        cartTotal.innerHTML = this.cartHeaderTotal.innerText;
        localStorage.setItem('total-header', cartTotal.innerHTML);
        arrayOfValues.push(infoObj);
        localStorage.setItem('storeBuyList', JSON.stringify(arrayOfValues));
      });
    });
  }
}
