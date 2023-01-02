import { IProduct } from '../../types/types';
import { allFilters } from '../forQueryParam/objOfQueryParam';

export class Search {
    searchInput: HTMLSelectElement;
    constructor(){
        this.searchInput = document.querySelector('.search__input') as HTMLSelectElement;
    }

    async addSearchEventListeners(): Promise<void>{ 
        this.searchInput.addEventListener('input', ()=>{
            allFilters.search = this.searchInput.value;
            const href = new URL(document.URL);
            let resPath = '';
            if(location.href.match(/(\?|&)search($|&|=)/)){
                href.searchParams.set('search', allFilters.search);
                resPath = href.toString();
            }
            else{
                href.searchParams.append('search', allFilters.search);
                resPath = href.toString();
            }
            window.history.pushState(allFilters, '', resPath);
            window.history.pushState(allFilters, '', resPath);
            history.back();
        })
    }

    searchProducts (data: IProduct[]){
        const searchData: IProduct[] = [];
        // const searchClear = location.search.split('');
        // searchClear.shift();
        // const queryParamsString = searchClear.join('').toString();
        // let paramsObject;
        // if(queryParamsString !== '') {
        //     paramsObject = JSON.parse(
        //         '{"' + decodeURI(queryParamsString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
        //       );
        // }
        // else {
        //     paramsObject = { search: ''}
        // }
        // allFilters.search = paramsObject.search;
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
        // const href = new URL(document.URL);
        // let resPath = '';
        // if(location.href.match(/(\?|&)search($|&|=)/)){
        //     href.searchParams.set('search', allFilters.search);
        //     resPath = href.toString();
        // }
        // else{
        //     href.searchParams.append('search', allFilters.search);
        //     resPath = href.toString();
        // }
        // window.history.pushState(allFilters, '', resPath);
        // window.history.pushState(allFilters, '', resPath);
        // history.back();
        return searchData;
    }
}