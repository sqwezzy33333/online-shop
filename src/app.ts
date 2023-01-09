import { Main } from "./pages/main/main";
import './libs/normalize.css';
import './libs/index.scss';
import { ProductPage } from "./pages/productPage/productPage";
import { ErrorPage } from "./pages/404/error";

export enum PageIds {
  MainPage = 'main-page',
  ProductPage = 'product-page',
  ErrorPage = 'error-page'
}

class App {
  mainPage : Main;
  productPage: ProductPage;
  errorPage: ErrorPage;
  bodyPage: HTMLElement;
  constructor(){
    this.mainPage = new Main();
    this.productPage = new ProductPage();
    this.errorPage = new ErrorPage();
    this.bodyPage = document.body;
  }

  run(){
    this.bodyPage.innerHTML = '';
    this.renderNewPage(window.location.hash.slice(1));
    this.enableRouteChange();
  }

  renderNewPage(idPage: string){
    document.body.innerHTML = '';
    if(idPage === PageIds.MainPage || idPage === ''){
      console.log(location.hash)
      this.mainPage.init();
    }
    else if(idPage === PageIds.ProductPage){
      this.productPage.createPage(PageIds.ProductPage);
    }
    else {
      this.errorPage.createPage(PageIds.ErrorPage);
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
