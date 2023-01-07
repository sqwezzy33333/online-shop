export class ProductPage {
    productBlock: HTMLElement;
    constructor(id: string){
        this.productBlock = document.body;
        this.productBlock.id = id;
    }

    createPage(){
        this.productBlock.innerHTML = `Page`;
    }
}