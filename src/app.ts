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
  sort: Sort;
  constructor() {
    this.loader = new Loader('assets/data/data.json');
    this.filter = new Filter();
    this.mainPage = new MainPage();
    this.sort = new Sort();
  }
  async start() {
    const data = await this.loader.load();
    await this.mainPage.draw(data);
    await this.sort.addSortEventListeners();
    await this.filter.start(data);
    this.filter.filter();
  }
  async render(): Promise<void> {
    const data = await this.loader.load();
    window.addEventListener('popstate', (event) => {
      console.log(`Данные навигации: `)
    });
  }
  async init() {
    await this.start();
    await this.render();
  }
}
const app = new App();
app.init();