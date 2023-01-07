import { Main } from "./pages/main/main";
import './libs/normalize.css';
import './libs/index.scss';

class App {
  mainPage : Main;
  bodyPage: HTMLElement;
  constructor(){
    this.mainPage = new Main('main-page');
    this.bodyPage = document.body;
  }

  run(){
    this.bodyPage.innerHTML = '';
    this.mainPage.init();
  }
}

const app = new App();
app.start();
