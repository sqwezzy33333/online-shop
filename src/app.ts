import './libs/normalize.css';
import './libs/index.scss';

import { Loader } from './components/loader/loader';
import { MainPage } from './pages/main';
import { Filter } from './components/filters/filter';
import { IProduct } from './components/types/types';
import { Sort } from './components/sort/sort';

class App {
  mainPage: MainPage;
  loader: Loader;
  filter: Filter;
  filtredData: IProduct[];
  sort: Sort;
  constructor() {
    this.loader = new Loader('assets/data/data.json');
    this.filter = new Filter();
    this.mainPage = new MainPage();
    this.filtredData = [];
    this.sort = new Sort();
  }
  async start(): Promise<void> {
    const data = await this.loader.load();
    await this.mainPage.draw(data);
    await this.filter.start(data, this.filtredData);
    await this.sort.addSortEventListeners();
    this.filter.filter();
  }
  async render(): Promise<void> {
    const data: IProduct[] = await this.loader.load();
    let filtredData: IProduct[];
    window.addEventListener('popstate', (event) => {
      if(event.state.category !== undefined){
        const filterByCategoryArr: string[] = event.state.category.split(',').filter((el: string) => {
          return el !== '';
        });
        const filtredArrayOfProd = data.filter((item) => {
          let haveItemCategory: boolean = false;
          for (let i = 0; i < filterByCategoryArr.length; i++) {
            if (item.category === filterByCategoryArr[i]) {
              haveItemCategory = true;
            }
          }
          if (haveItemCategory) return true;
        });
        if (filtredArrayOfProd.length !== 0) {
          filtredData = filtredArrayOfProd;
          this.filtredData = filtredData;
          this.mainPage.draw(filtredData);
          this.filter.start(data, this.filtredData);
          this.filter.filter();
        } else {
          this.mainPage.draw(data);
          this.filter.start(data);
          this.filter.filter();
        }
      }
    });
  }
  async onload(): Promise<void> {
    const data: IProduct[] = await this.loader.load();
    window.addEventListener('load', () => {
      let filtredData: IProduct[];
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
        if(paramsObject.category !== undefined){
          // отрисовка по фильру category
          const filterByParamsObject: string[] = paramsObject.category.split(',').filter((el: string) => {
            return el !== '';
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
          if (filtredArrayOfProd.length !== 0) {
            filtredData = filtredArrayOfProd;
            this.mainPage.draw(filtredData);
          } else this.mainPage.draw(data);
        }
      }
    });
  }
  async init() {
    await this.start();
    await this.render();
    await this.onload();
    const btn = document.querySelector('.logo__home');
    btn?.addEventListener('click', () => {
      localStorage.clear();
    });
  }
}
const app = new App();
app.init();