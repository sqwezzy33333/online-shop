import './libs/normalize.css';
import './libs/index.scss';

import { Loader } from './components/loader/loader';
import { MainPage } from './pages/main';
import { Filter } from './components/filters/filter';
import { IProduct } from './types/types';
import { Sort } from './components/sort/sort';
import { AllFiltersType } from './types/types';
import { allFilters } from './components/forQueryParam/forQueryParam';
import { Search } from './components/search/search';
import { copyLink } from './components/copyLink/copyLink';
import { typeOfView } from './components/typeOfView/typeOfView';
import { Cart } from './components/cart/cart';
import { Clear } from './components/clear/clear';
import { HeaderInfo } from './components/headerInfo/headerInfo';

class App {
  buttonClear = document.querySelector('.clear-btn') as HTMLSelectElement;
  mainPage: MainPage;
  loader: Loader;
  filter: Filter;
  filtredData: IProduct[];
  allFilters: AllFiltersType;
  sort: Sort;
  data: IProduct[];
  search: Search;
  copyLink: copyLink;
  typeOfView: typeOfView;
  clear: Clear;
  cart: Cart;
  headerInfo: HeaderInfo;

  constructor() {
    this.loader = new Loader('assets/data/data.json');
    this.filter = new Filter();
    this.mainPage = new MainPage();
    this.filtredData = [];
    this.sort = new Sort();
    this.search = new Search();
    this.copyLink = new copyLink();
    this.typeOfView = new typeOfView();
    this.allFilters = allFilters;
    this.data = [];
    this.clear = new Clear();
    this.cart = new Cart();
    this.headerInfo = new HeaderInfo();
  }

  async start(): Promise<void> {
    let data = await this.loader.load();
    if (
      window.location.href !== 'http://localhost:4200/' &&
      window.location.href !== 'http://localhost:4200/index.html'
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
    await this.mainPage.draw(data);
    this.headerInfo.showCount(data);
    await this.sort.addSortEventListeners();
    await this.search.addSearchEventListeners();
    await this.copyLink.addEventListenerToCopyBtn();
    await this.typeOfView.addEventListenerButtonView();
    
    this.filter.filter();
    this.buttonClear.addEventListener('click', () => {
      this.clear.clearFilters();
      this.filter.start(data, this.filtredData);
      this.mainPage.draw(data);
      this.sort.addSortEventListeners();
      this.search.addSearchEventListeners();
      this.copyLink.addEventListenerToCopyBtn();
      this.typeOfView.addEventListenerButtonView();
      this.filter.filter();
    });
  }

  async render(): Promise<void> {
    const data: IProduct[] = await this.loader.load();
    let filtredData: IProduct[] = data;
    window.addEventListener('popstate', (event) => {
      if (event.state.category) {
        filtredData = this.filter.filterArrayByCategory(data, event.state.category);
        filtredData = this.filter.filterArrayByBrand(filtredData, event.state.brand);
      } else filtredData = data;

      if (event.state.brand) {
        filtredData = this.filter.filterArrayByBrand(filtredData, event.state.brand);
        filtredData = this.sort.sort(event.state.type, filtredData);
      }
      if (event.state.type) {
        filtredData = this.sort.sort(event.state.type, filtredData);
      }

      if (event.state.price) filtredData = this.filter.filterByPrice(filtredData, event.state.price);
      if (event.state.stock) filtredData = this.filter.filterByStock(filtredData, event.state.stock);
      if (event.state.type && this.filtredData.length > 0 && event.state.category) {
        event.state.category = localStorage.getItem('category');
        filtredData = this.filter.filterArrayByCategory(this.data, event.state.category);
        filtredData = this.sort.sort(event.state.type, filtredData);
      }

      if (event.state.search) filtredData = this.search.searchProducts(filtredData, event.state.search);
      if (filtredData.length === 0 && event.state.search === '') filtredData = data;
      this.filter.checkRangeFilters(filtredData);
      this.mainPage.draw(filtredData);
      this.headerInfo.showCount(filtredData);
      this.filter.start(this.data, filtredData, event.state);
      this.filter.filter(event.state);
    });
  }

  async onload(): Promise<void> {
    const data: IProduct[] = await this.loader.load();
    this.data = data;
    let filtredData: IProduct[];
    localStorage.setItem('clearFilters', 'false');
    if (
      window.location.href !== 'http://localhost:4200/' &&
      window.location.href !== 'http://localhost:4200/index.html'
    ) {
      const searchClear = location.search.split('');
      searchClear.shift();
      const queryParamsString = searchClear.join('').toString();
      const paramsObject = JSON.parse(
        '{"' + decodeURI(queryParamsString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
      );
      localStorage.setItem('category', paramsObject.category);
      filtredData = data;
      if (paramsObject.category) filtredData = this.filterByCategoryOnload(paramsObject.category, data, paramsObject);
      if (paramsObject.brand) filtredData = this.filter.filterArrayByBrand(data, paramsObject.brand);
      if (paramsObject.category) filtredData = this.filter.filterArrayByBrand(filtredData, paramsObject.brand);
      if (paramsObject.type) filtredData = this.sort.sort(paramsObject.type, filtredData);
      if (paramsObject.price) filtredData = this.filter.filterByPrice(filtredData, paramsObject.price);
      if (paramsObject.stock) filtredData = this.filter.filterByStock(filtredData, paramsObject.stock);
      if (paramsObject.search) filtredData = this.search.searchProducts(filtredData, paramsObject.search);
      this.filtredData = filtredData;
      if (filtredData !== undefined) {
        this.headerInfo.showCount(filtredData);
        this.mainPage.draw(filtredData);
        this.filter.start(data, filtredData, this.allFilters);
        this.filter.filter(this.allFilters);
      } else this.mainPage.draw(data);
    }
  }

  async init() {
    await this.start();
    await this.onload();
    await this.render();
    this.cart.makeArrayOfProducts(this.data);
    this.cart.drawCart();
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
const app = new App();
app.init();
