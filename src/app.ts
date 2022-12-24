import './libs/normalize.css';
import './libs/index.scss';

import { Loader } from './components/loader/loader';
import { MainPage } from './pages/main';
import { Filter } from './components/filters/filter';
import { IProduct } from './components/types/types';

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
    await this.filter.filter();
  }
  async render() {
    const data = await this.loader.load();
    window.addEventListener('hashchange', () => {
      let queryParam: string = window.location.hash.substring(1);
      const filtredData: IProduct[] = data.filter((item: IProduct) => {
        return item.category == queryParam;
      });
      this.mainPage.draw(filtredData);
    });
  }
}
const app = new App();
app.start();
app.render();
