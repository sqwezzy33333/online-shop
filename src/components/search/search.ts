import { AllFiltersType, IProduct } from '../../types/types';
import { allFilters } from '../forQueryParam/objOfQueryParam';

export class Search {
    searchInput: HTMLSelectElement;
    constructor(){
        this.searchInput = document.querySelector('.search__input') as HTMLSelectElement;
    }

    async addSearchEventListeners(): Promise<void>{ 
        this.updateSearch();
        this.searchInput.addEventListener('input', ()=>{
            const searchClear = location.search.split('');
            searchClear.shift();
            const queryParamsString = searchClear.join('').toString();
            let paramsObject;
            if(queryParamsString !== '') {
                paramsObject = JSON.parse(
                    '{"' + decodeURI(queryParamsString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
                  );
            }
            if(paramsObject !== undefined){
                if(paramsObject.search !== undefined){
                    paramsObject.search = this.searchInput.value;
                    syncURL(paramsObject);
                }
            }
        })
    }

    updateSearch(){
        const searchClear = location.search.split('');
        searchClear.shift();
        const queryParamsString = searchClear.join('').toString();
        let paramsObject;
        console.log(queryParamsString)
        if(queryParamsString !== '') {
            paramsObject = JSON.parse(
                '{"' + decodeURI(queryParamsString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
              );
        }
        if(paramsObject !== undefined){
            if(paramsObject.search !== undefined){
                this.searchInput.value = paramsObject.search;
                syncURL(paramsObject);
            }
        }
        else {
            syncURL(allFilters);
        }
    }

    searchProducts (data: IProduct[], searchText: string){
        const searchData: IProduct[] = [];
        if(searchText === ''){
            return data;
        }
        data.forEach((item) => {
            if(item.title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.description.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.price.toString().indexOf(searchText.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.rating.toString().indexOf(searchText.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.stock.toString().indexOf(searchText.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.brand.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.category.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
                searchData.push(item)
            }
        });
        return searchData;
    }
}

function transformToURLParams(filters: AllFiltersType) {
    const query = Object.entries(filters)
        .map(([key, value]) => {
        return `${key}=${value}`;
        })
        .join('&');
    return `?${query}`;
}
function syncURL(filters: AllFiltersType) {
    const path = document.location.pathname;
    const query = transformToURLParams(filters);
    window.history.pushState(filters, '', `${path}${query}`);
    window.history.pushState(filters, '', `${path}${query}`);
    history.back();
}