import { Loader } from "../main/components/loader/loader";
import { IProduct } from "../types/types";

export class ProductPage {
    productBlock: HTMLElement;
    loader: Loader;
    constructor(){
        this.loader = new Loader('assets/data/data.json');
        this.productBlock = document.body;
    }

    async createPage(id: string){
      const infOfProduct = location.search.split('/');
      const data: IProduct[] = await this.loader.load();
      const product = data.find(o => o.id.toString() === infOfProduct[1]);
      console.log(product)
      this.productBlock.id = id;
      this.productBlock.innerHTML = `<header class="header">
        <div class="header__container container">
          <div class="container__logo logo">
            <div class="logo__pict">&nbsp;</div>
            <h1 class="logo__caption"><a class="logo__home" href="./index.html">Online Store</a></h1>
          </div>
          <div class="container__price-basket price-basket">
            <p class="price-basket__name">Cart total: <span class="price-basket__name_count">0</span>$</p>
          </div>
          <div class="container__to-basket to-basket">
            <div class="to-basket__pict">&nbsp;</div>
          </div>
        </div>
      </header>
      <main class="main">
        <div class="container">
          <div class="main__wrapper" style="align-items: center; flex-direction: column;">
            <div class="main__path path">
                <p class="path__text">STORE >> ${product?.category.toUpperCase()} >> ${product?.brand.toUpperCase()} >> ${product?.title.toUpperCase()}</p>
            </div>
            <div class="main__product product">
              <div class="product__title">${product?.title}</div>
              <div class="product__inf">
                <div class="product__pictures pictures"></div>
                <div class="product__bidpict">
                  <img src="${product?.images[0]}" alt="picture"></img>
                </div>
                <div class="product__about about">
                  <div class="about__description">
                    <p class="about__title">Description:</p>
                    <p class="about__text">${product?.description}</p>
                  </div>
                  <div class="about__discount">
                    <p class="about__title">Discount:</p>
                    <p class="about__text">${product?.discountPercentage}%</p>
                  </div>
                  <div class="about__rating">
                    <p class="about__title">Rating:</p>
                    <p class="about__text">★${product?.rating}</p>
                  </div>
                  <div class="about__stock">
                    <p class="about__title">Stock:</p>
                    <p class="about__text">${product?.stock}</p>
                  </div>
                  <div class="about__brand">
                    <p class="about__title">Brand:</p>
                    <p class="about__text">${product?.brand}</p>
                  </div>
                  <div class="about__category">
                    <p class="about__title">Category:</p>
                    <p class="about__text">${product?.category}</p>
                  </div>
                </div>
                <div class="product__panel panel">
                  <div class="panel__price">${product?.price}$</div>
                  <button class="panel__add">ADD TO CART</button>
                  <button class="panel__buy">BUY NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer class="footer">
        <div class="footer__container container">
          <div class="container__github github">
            <a class="github__link" href="https://github.com/ich-kirich" target="_blank">
              <div class="github__pict author1">&nbsp;</div>
            </a>
            <a class="github__link" href="https://github.com/sqwezzy33333" target="_blank">
              <div class="github__pict author2">&nbsp;</div>
            </a>
          </div>
          <div class="container__year year">
            <p class="year__caption">2022</p>
          </div>
          <div class="container__course course">
            <a
              class="course__link"
              href="https://github.com/rolling-scopes-school/tasks/tree/master/stage2"
              target="_blank"
            >
              <div class="course__pict">&nbsp;</div>
            </a>
          </div>
        </div>
      </footer>`;
      this.addPictures(product?.images as string[]);
      this.addEventListenersToPAge();
    }

    addPictures(pictures: Array<string>){
      const blockPict = this.productBlock.querySelector('.pictures');
      pictures.forEach(function(item) {
        const imgTag = createDivPict();
        imgTag.src = item;
        blockPict?.append(imgTag);
      });
    }

    addEventListenersToPAge(){
      const blockPict = (this.productBlock.querySelector('.pictures') as HTMLElement).getElementsByTagName('img');
      const blockPictArr = Array.prototype.slice.call(blockPict)
      const bigImg = (this.productBlock.querySelector('.product__bidpict') as HTMLElement).getElementsByTagName('img')
      blockPictArr.forEach(function(item) {
        item.addEventListener('click', ()=> {
          bigImg[0].src = item.src;
        });
      });
    }
}

function createDivPict(){
  const block = document.createElement("img");
  block.alt = 'picture';
  return block
}