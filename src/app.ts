import { Main } from "./pages/main/main";
import './libs/normalize.css';
import './libs/index.scss';
import { ProductPage } from "./pages/productPage/productPage";

export enum PageIds {
  MainPage = 'main-page',
  ProductPage = 'product-page',
}

class App {
  mainPage : Main;
  productPage: ProductPage;
  bodyPage: HTMLElement;
  constructor(){
    this.mainPage = new Main();
    this.productPage = new ProductPage();
    this.bodyPage = document.body;
  }

  run(){
    this.bodyPage.innerHTML = '';
    this.renderNewPage(window.location.hash.slice(1));
    this.enableRouteChange();
  }

  renderNewPage(idPage: string){
    document.body.innerHTML = '';
    console.log(idPage)
    if(idPage === PageIds.MainPage){
      this.mainPage.init();
    }
    else if(idPage === PageIds.ProductPage){
      this.productPage.createPage('product-page');
    }
    else {
      this.mainPage.init();
    }
  }

  enableRouteChange(){
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });
  }
}

const app = new App();
app.run();