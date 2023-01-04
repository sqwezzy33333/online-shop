export class typeOfView {
    buttonView: HTMLSelectElement;
    constructor(){
        this.buttonView = document.querySelector('.typeView__icon') as HTMLSelectElement;
    }

    async addEventListenerButtonView(){
        this.buttonView.addEventListener('click', function(e) {
            const btn = (document.querySelector('.typeView__icon') as HTMLButtonElement);
            if(btn.innerHTML === '≡'){
                btn.innerHTML = '⊞';
            }
            else {
                btn.innerHTML = '≡';
            }
        });
    }
}