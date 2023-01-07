import { Loader } from './components/loader/loader';
import { DrawMain } from './components/draw/draw';
import { Filter } from './components/filters/filter';
import { IProduct } from '../types/types';
import { Sort } from './components/sort/sort';
import { AllFiltersType } from '../types/types';
import { allFilters } from './components/forQueryParam/forQueryParam';
import { Search } from './components/search/search';
import { copyLink } from './components/copyLink/copyLink';
import { typeOfView } from './components/typeOfView/typeOfView';

export class Main {
  drawMain: DrawMain;
  loader: Loader;
  filter: Filter;
  filtredData: IProduct[];
  allFilters: AllFiltersType;
  sort: Sort;
  data: IProduct[];
  search: Search;
  copyLink: copyLink;
  typeOfView: typeOfView;
  mainBlock: HTMLElement;

  constructor(id: string) {
    this.loader = new Loader('assets/data/data.json');
    this.filter = new Filter();
    this.drawMain = new DrawMain();
    this.filtredData = [];
    this.sort = new Sort();
    this.search = new Search();
    this.copyLink = new copyLink();
    this.typeOfView = new typeOfView();
    this.allFilters = allFilters;
    this.data = [];
    this.mainBlock = document.body;
    this.mainBlock.id = id;
  }

  async createPage(){
    this.mainBlock.innerHTML = `
    <header class="header">
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
        <div class="main__wrapper">
          <div class="main__aside aside">
            <div class="aside__filters filters">
            </div>
          </div>
          <div class="main__catalog catalog">
            <div class="catalog__panel">
              <div class="catalog__search search">
                <form class="search__form">
                  <input maxlength="15" type="search" placeholder="Search product" value="" class="search__input">
                </form>
              </div>
              <div class="catalog__copy copy">
                <button class="copy__btn">Copy Link</button>
              </div>
              <div class="catalog__sort sort">
                <button class="sort__button">
                  <p class="sort__text">Choose Sort</p>
                </button>
              </div>
              <div class="catalog__typeView typeView">
                <button class="typeView__icon">≡</button>
              </div>
              <div class="sort__chooseList chooseList">
                <form class="chooseList__form">
                  <div class="chooseList__typeSort">
                    <input type="radio" id="popularityUp" name="sortList">
                    <label for="popularityUp">By popularity(Ascending)</label>
                  </div>
                  <div class="chooseList__typeSort">
                    <input type="radio" id="popularityLow" name="sortList">
                    <label for="popularityLow">By popularity(Descending)</label>
                  </div>
                  <div class="chooseList__typeSort">
                    <input type="radio" id="priceUp" name="sortList">
                    <label for="priceUp">By price(Ascending)</label>
                  </div>
                  <div class="chooseList__typeSort">
                    <input type="radio" id="priceLow" name="sortList">
                    <label for="priceLow">By price(Descending)</label>
                  </div>
                </form>
              </div>
            </div>
            <div class="catalog__products"></div>
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
  }

  async start(): Promise<void> {
    const data = await this.loader.load();
    if (
<<<<<<< HEAD
<<<<<<< HEAD
      window.location.href !== `http://localhost:4200/` &&
      window.location.href !== `http://localhost:4200/index.html`
=======
      window.location.href !== 'http://localhost:4200/' &&
      window.location.href !== 'http://localhost:4200/index.html'
>>>>>>> d7e5436 (feat: add class of draw pages)
    ) {
      const searchClear = location.search.split('');
      searchClear.shift();
      const queryParamsString = searchClear.join('').toString();
      const paramsObject: AllFiltersType = JSON.parse(
        '{"' + decodeURI(queryParamsString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
      );
      this.allFilters = paramsObject;
    }
    await this.filter.start(data, this.filtredData);
    await this.drawMain.draw(data);
    await this.sort.addSortEventListeners();
    await this.search.addSearchEventListeners();
    await this.copyLink.addEventListenerToCopyBtn();
    await this.typeOfView.addEventListenerButtonView();
    this.filter.filter();
  }

  async render(): Promise<void> {
    const data: IProduct[] = await this.loader.load();
    let filtredData: IProduct[] = data;
    window.addEventListener('popstate', (event) => {
      if(event.state !== null){
        if (event.state.category) {
          filtredData = this.filter.filterArrayByCategory(data, event.state.category);
          filtredData = this.filter.filterArrayByBrand(filtredData, event.state.brand);
        } else filtredData = data;
  
        if (event.state.brand) {
          filtredData = this.filter.filterArrayByBrand(data, event.state.brand);
          filtredData = this.sort.sort(event.state.type, filtredData);
        }
        if (event.state.type === '') {
          filtredData = this.sort.sort('By popularity(Ascending)', filtredData);
        } else filtredData = this.sort.sort(event.state.type, filtredData);
  
        if (event.state.price) filtredData = this.filter.filterByPrice(filtredData, event.state.price);
        if (event.state.stock) filtredData = this.filter.filterByStock(filtredData, event.state.stock);
        if (event.state.type && this.filtredData.length > 0 && event.state.category) {
          event.state.category = localStorage.getItem('category');
          filtredData = this.filter.filterArrayByCategory(this.data, event.state.category);
          filtredData = this.sort.sort(event.state.type, filtredData);
        }
  
        if (event.state.search) filtredData = this.search.searchProducts(filtredData, event.state.search);
        if (filtredData.length === 0 && event.state.search === '') filtredData = data;
        this.drawMain.draw(filtredData);
        this.filter.start(this.data, filtredData, event.state);
        this.filter.filter(event.state);
      }
    });
  }

  async onload(): Promise<void> {
    const data: IProduct[] = await this.loader.load();
    this.data = data;
    let filtredData: IProduct[];
    if (
      window.location.href !== `http://localhost:4200/` &&
      window.location.href !== `http://localhost:4200/index.html`
    ) {
      const searchClear = location.search.split('');
      searchClear.shift();
      const queryParamsString = searchClear.join('').toString();
      const paramsObject = JSON.parse(
        '{"' + decodeURI(queryParamsString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
      );
      localStorage.setItem('category', paramsObject.category);
      filtredData = data;
      if (paramsObject.category) {
        filtredData = this.filterByCategoryOnload(paramsObject.category, data, paramsObject);
      }
      if (paramsObject.brand) {
        filtredData = this.filter.filterArrayByBrand(data, paramsObject.brand);
      }
      if (paramsObject.category) {
        filtredData = this.filter.filterArrayByBrand(filtredData, paramsObject.brand);
      }
      if (paramsObject.type) {
        filtredData = this.sort.sort(paramsObject.type, filtredData);
      }
      if (paramsObject.search) {
        filtredData = this.search.searchProducts(filtredData, paramsObject.search);
      }
      this.filtredData = filtredData;
      if (filtredData !== undefined) {
        this.drawMain.draw(filtredData);
        this.filter.start(data, filtredData, this.allFilters);
        this.filter.filter(this.allFilters);
      } else this.drawMain.draw(data);
    }
  }

  async init() {
    await this.createPage();
    await this.start();
    await this.onload();
    await this.render();
    const btn = document.querySelector('.logo__home');
    btn?.addEventListener('click', () => {
      localStorage.clear();
    });
  }

  filterByCategoryOnload(category: string, data: IProduct[], paramsObject: AllFiltersType): IProduct[] {
    if (category !== undefined) {
      let categorySerch: string[] = location.search.split('&br');
      categorySerch = categorySerch[0].split('ory=');
      localStorage.setItem('category', categorySerch[1]);
      const filterByParamsObject: string[] = paramsObject.category.split('%2C').filter((el: string) => {
        return el;
      });
      const filtredArrayOfProd = data.filter((item) => {
        let haveItemCategory: boolean = false;
        for (let i = 0; i < filterByParamsObject.length; i++) {
          if (item.category === filterByParamsObject[i]) {
            haveItemCategory = true;
          }
        }
        if (haveItemCategory) return true;
      });
      return filtredArrayOfProd;
    }
    return data;
  }
}
