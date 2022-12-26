export class Sort {
    sortBlock: HTMLSelectElement;
    
    constructor(){
        this.sortBlock = document.querySelector('.search__button') as HTMLSelectElement;
    }

    async sort(sortType: string, arrayProducts?: Element[]){
        if(sortType == 'rating'){
            let productsList: Element[];
            if(arrayProducts === undefined){
                productsList = [...document.querySelectorAll('.catalog__product')];
            }
            else {
                productsList = arrayProducts;
            }
            productsList = productsList.sort((i, j) => {
                const firstIem = parseFloat(i.querySelector('.product__rating')?.innerHTML.slice(1) as string)
                const secondItem = parseFloat(j.querySelector('.product__rating')?.innerHTML.slice(1) as string)
                if (firstIem > secondItem) {
                    return -1;
                }
                if (firstIem < secondItem) {
                    return 1;
                }
                 return 0;
            });
            const catalog = document.querySelector('.catalog__products') as HTMLElement;
            catalog.innerHTML = '';
            productsList.forEach(function(item){
                catalog.appendChild(item);
            });
        }
    }
}