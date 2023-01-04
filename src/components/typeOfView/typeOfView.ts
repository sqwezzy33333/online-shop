import { allFilters, syncURL } from "../forQueryParam/forQueryParam";

export class typeOfView {
    buttonView: HTMLSelectElement;
    constructor(){
        this.buttonView = document.querySelector('.typeView__icon') as HTMLSelectElement;
    }

    async addEventListenerButtonView(){
        this.buttonView.addEventListener('click', function(e) {
            let typeView: string;
            const btn = (document.querySelector('.typeView__icon') as HTMLButtonElement);
            if(btn.innerHTML === '≡'){
                btn.innerHTML = '⊞';
                typeView = 'lines';
            }
            else {
                btn.innerHTML = '≡';
                typeView = 'blocks'
            }
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
                if(paramsObject.view !== undefined){
                    paramsObject.view = typeView;
                    syncURL(paramsObject);
                }
            }
            else {
                syncURL(allFilters);
            }
        });
    }
}