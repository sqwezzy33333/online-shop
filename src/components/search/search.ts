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
            allFilters.search = this.searchInput.value;
            syncURL(allFilters);
        })
    }

    updateSearch(){
        syncURL(allFilters);
    }

    searchProducts (data: IProduct[]){
        const searchData: IProduct[] = [];
        if(allFilters.search === ''){
            return data;
        }
        data.forEach((item) => {
            if(item.title.toLowerCase().indexOf(allFilters.search.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.description.toLowerCase().indexOf(allFilters.search.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.price.toString().indexOf(allFilters.search.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.rating.toString().indexOf(allFilters.search.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.stock.toString().indexOf(allFilters.search.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.brand.toLowerCase().indexOf(allFilters.search.toLowerCase()) >= 0){
                searchData.push(item)
            }
            else if(item.category.toLowerCase().indexOf(allFilters.search.toLowerCase()) >= 0){
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