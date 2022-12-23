import './libs/normalize.css';
import './libs/index.scss';

import { Loader } from './components/loader/loader';
import { DrawElements } from './components/draw/draw';

class App {
  draw: DrawElements;
  loader: Loader;
  constructor() {
    this.draw = new DrawElements();
    this.loader = new Loader('assets/data/data.json');
  }
  async start() {
    const data = await this.loader.load();
    await this.draw.drawCartGoods(data)
  }
}
const app = new App();
app.start();