import './libs/normalize.css';
import './libs/index.scss';

import { Loader } from './components/loader/loader';
import { MainPage } from './pages/main';
import { Filter } from './components/filters/filter';
import { IProduct } from './components/types/types';
import { Filters } from './components/types/types';

class App {
  mainPage: MainPage;
  loader: Loader;
  filter: Filter;
  constructor() {
    this.loader = new Loader('assets/data/data.json');
    this.filter = new Filter();
    this.mainPage = new MainPage();
  }
  async start() {
    const data = await this.loader.load();
    await this.mainPage.draw(data);
    await this.filter.start(data);
    this.filter.filter();
  }
  async render(): Promise<void> {
    const data: IProduct[] = await this.loader.load();
    let filtredData: IProduct[];
    window.addEventListener('popstate', (event) => {
      let filterByCategoryArr: string[] = event.state.category.split(',').filter((el: string) => {
        return el !== '';
      });
      let filtredArrayOfProd = data.filter((item) => {
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
        this.mainPage.draw(filtredData);
      } else this.mainPage.draw(data);
    });
    window.addEventListener('load', () => {
      if (
        window.location.href !== 'http://localhost:4200/' &&
        window.location.href !== 'http://localhost:4200/index.html'
      ) {
        let searchClear = location.search.split('');
        searchClear.shift();
        let queryParamsString = searchClear.join('').toString();
        let paramsObject = JSON.parse(
          '{"' + decodeURI(queryParamsString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
        );
        // отрисовка по фильру category
        let filterByParamsObject: string[] = paramsObject.category.split(',').filter((el: string) => {
          return el !== '';
        });
        let filtredArrayOfProd = data.filter((item) => {
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
    });
  }
  async init() {
    await this.start();
    await this.render();
  }
}
const app = new App();
<<<<<<< HEAD
app.start();
<<<<<<< HEAD
=======
app.render();
>>>>>>> 93660f4 (feat: add filter by category)
=======
app.init();
>>>>>>> f06dba2 (feat: add filter by category in filterCategory.ts)
