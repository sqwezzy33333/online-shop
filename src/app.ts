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
<<<<<<< HEAD
app.start();
<<<<<<< HEAD
=======
app.render();
>>>>>>> 93660f4 (feat: add filter by category)
=======
app.init();
>>>>>>> f06dba2 (feat: add filter by category in filterCategory.ts)
