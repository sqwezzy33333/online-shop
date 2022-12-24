import './libs/normalize.css';
import './libs/index.scss';

import { Loader } from './components/loader/loader';
import { DrawElements } from './components/draw/draw';
import { Filter } from './components/filters/filter';
import { IProduct } from './components/types/types';

class App {
  draw: DrawElements;
  loader: Loader;
  filter: Filter;
  constructor() {
    this.loader = new Loader('assets/data/data.json');
    this.filter = new Filter();
    this.draw = new DrawElements();
  }

  async start() {
    const data = await this.loader.load();
    await this.draw.drawCartGoods(data);
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
      this.draw.drawCartGoods(filtredData);
    });
  }
}
const app = new App();
app.start();
<<<<<<< HEAD
=======
app.render();
>>>>>>> 93660f4 (feat: add filter by category)
