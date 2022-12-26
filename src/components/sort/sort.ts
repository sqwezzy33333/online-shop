export class Sort {
    sortBlock: HTMLSelectElement;

    constructor(){
        this.sortBlock = document.querySelector('.catalog__search') as HTMLSelectElement;
    }

    async addSortEventListeners(){
        const chooseList = document.querySelector('.search__chooseList') as HTMLElement;
        const chooseOption = document.querySelectorAll('.chooseList__typeSort') as NodeListOf<Element>;
        this.sortBlock.addEventListener('click', (event) => {
            chooseList.style.display = 'block';
        });
        document.addEventListener('click', function(e) {
            if (e.target instanceof Element) { 
                if (!(document.querySelector('.catalog__search') as HTMLSelectElement).contains(e.target)) {
                    chooseList.style.display = 'none';
                }
            }
        });
        chooseOption.forEach((item) => {
            item.addEventListener('click', function (e) {
                if (e.target instanceof Element) { 
                    if(item.getElementsByTagName('input')[0].checked){
                        const updateSort = new Sort()
                        updateSort.sort(item.getElementsByTagName('label')[0].innerHTML);
                        (document.querySelector('.search__text') as HTMLElement).innerHTML = item.getElementsByTagName('label')[0].innerHTML;
                    }
                }
            });
        });
    }

    async sort(sortType: string, arrayProducts?: Element[]){
        let productsList: Element[];
        if(arrayProducts === undefined){
            productsList = [...document.querySelectorAll('.catalog__product')];
        }
        else {
            productsList = arrayProducts;
        }
        if(sortType === 'By popularity(Ascending)'){
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
        else if(sortType === 'By popularity(Descending)') {
            productsList = productsList.sort((i, j) => {
                const firstIem = parseFloat(i.querySelector('.product__rating')?.innerHTML.slice(1) as string)
                const secondItem = parseFloat(j.querySelector('.product__rating')?.innerHTML.slice(1) as string)
                if (firstIem > secondItem) {
                    return 1;
                }
                if (firstIem < secondItem) {
                    return -1;
                }
                 return 0;
            });
            const catalog = document.querySelector('.catalog__products') as HTMLElement;
            catalog.innerHTML = '';
            productsList.forEach(function(item){
                catalog.appendChild(item);
            });
        }
        else if(sortType === 'By price(Ascending)'){
            productsList = productsList.sort((i, j) => {
                const firstIem = parseFloat(i.querySelector('.product__price')?.innerHTML.replace(/<(.|\n)*?>/g, '') as string)
                const secondItem = parseFloat(j.querySelector('.product__price')?.innerHTML.replace(/<(.|\n)*?>/g, '') as string)
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
        else if(sortType === 'By price(Descending)'){
            productsList = productsList.sort((i, j) => {
                const firstIem = parseFloat(i.querySelector('.product__price')?.innerHTML.replace(/<(.|\n)*?>/g, '') as string)
                const secondItem = parseFloat(j.querySelector('.product__price')?.innerHTML.replace(/<(.|\n)*?>/g, '') as string)
                if (firstIem > secondItem) {
                    return 1;
                }
                if (firstIem < secondItem) {
                    return -1;
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