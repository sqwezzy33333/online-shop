export class Sort {
    sortBlock: HTMLSelectElement;
    constructor(){
        this.sortBlock = document.querySelector('.search__button') as HTMLSelectElement;
    }

    sort(sortType: string){
        console.log(document.querySelectorAll('.catalog__product'));
    }
}