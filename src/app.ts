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
    this.mainPage = new Main('main-page');
    this.productPage = new ProductPage('product-page');
    this.bodyPage = document.body;
  }

  run(){
    this.bodyPage.innerHTML = '';
    this.renderNewPage(PageIds.MainPage);
    this.enableRouteChange();
  }

  renderNewPage(idPage: string){
    document.body.innerHTML = '';
    if(idPage === PageIds.MainPage){
      this.mainPage.init();
    }
    else if(idPage === PageIds.ProductPage){
     this.productPage.createPage();
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
app.start();
