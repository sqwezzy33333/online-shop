export class ProductPage {
    productBlock: HTMLElement;
    constructor(){
        this.productBlock = document.body;
    }

    createPage(id: string){
        this.productBlock.id = id;
        this.productBlock.innerHTML = `Page`;
    }
}