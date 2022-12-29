import { allFilters } from '../forQueryParam/objOfQueryParam';
import { IProduct } from '../types/types';

export class Sort {
    sortBlock: HTMLSelectElement;

    constructor(){
        this.sortBlock = document.querySelector('.catalog__search') as HTMLSelectElement;
    }

    async addSortEventListeners(): Promise<void>{
        const chooseList = document.querySelector('.search__chooseList') as HTMLElement;
        const chooseOption = document.querySelectorAll('.chooseList__typeSort') as NodeListOf<Element>;
        this.updateNameSort();
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
                        allFilters.type = item.getElementsByTagName('input')[0].getAttribute('id') as string;
                        const href = new URL(document.URL);
                        let resPath = '';
                        if(location.href.match(/(\?|&)type($|&|=)/)){
                            href.searchParams.set('type', allFilters.type);
                            resPath = href.toString();
                        }
                        else{
                            href.searchParams.append('type', allFilters.type);
                            resPath = href.toString();
                        }
                        window.history.pushState(allFilters, '', resPath);
                        window.history.pushState(allFilters, '', resPath);
                        history.back();
                        (document.querySelector('.search__text') as HTMLElement).innerHTML = item.getElementsByTagName('label')[0].innerHTML;
                    }
                }
            });
        });
    }

    updateNameSort(){
        const searchClear = location.search.split('');
        searchClear.shift();
        const queryParamsString = searchClear.join('').toString();
        let paramsObject;
        if(queryParamsString !== '') {
            paramsObject = JSON.parse(
                '{"' + decodeURI(queryParamsString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
              );
        }
        else {
            paramsObject = { type: 'popularityUp'}
        }
        if(paramsObject.type !== ''){
            if(paramsObject.type === 'popularityUp'){
                (document.querySelector('.search__text') as HTMLElement).innerHTML = 'By popularity(Ascending)';
            }
            else if(paramsObject.type === 'popularityLow'){
                (document.querySelector('.search__text') as HTMLElement).innerHTML = 'By popularity(Descending)';
            }
            else if(paramsObject.type === 'priceUp'){
                (document.querySelector('.search__text') as HTMLElement).innerHTML = 'By price(Ascending)';
            }
            else if(paramsObject.type === 'priceLow'){
                (document.querySelector('.search__text') as HTMLElement).innerHTML = 'By price(Descending)';
            }
        }
    }

    async sort(sortType: string, arrayProducts: IProduct[]){
        let productsList: IProduct[];
        productsList = arrayProducts;
        if(sortType === 'By popularity(Ascending)' || sortType === 'popularityUp'){
            productsList = productsList.sort((i, j) => {
                const firstIem = i.rating;
                const secondItem = j.rating;
                if (firstIem > secondItem) {
                    return -1;
                }
                if (firstIem < secondItem) {
                    return 1;
                }
                 return 0;
            });
            return productsList;
        }
        else if(sortType === 'By popularity(Descending)' || sortType === 'popularityLow') {
            productsList = productsList.sort((i, j) => {
                const firstIem = i.rating;
                const secondItem = j.rating;
                if (firstIem > secondItem) {
                    return 1;
                }
                if (firstIem < secondItem) {
                    return -1;
                }
                 return 0;
            });
            return productsList;
        }
        else if(sortType === 'By price(Ascending)' || sortType === 'priceUp'){
            productsList = productsList.sort((i, j) => {
                const firstIem = i.price;
                const secondItem = j.price;
                if (firstIem > secondItem) {
                    return -1;
                }
                if (firstIem < secondItem) {
                    return 1;
                }
                 return 0;
            });
            return productsList;
        }
        else if(sortType === 'By price(Descending)' || sortType === 'priceLow'){
            productsList = productsList.sort((i, j) => {
                const firstIem = i.price;
                const secondItem = j.price;
                if (firstIem > secondItem) {
                    return 1;
                }
                if (firstIem < secondItem) {
                    return -1;
                }
                 return 0;
            });
            return productsList;
        }
    }
}
