export class copyLink {
    buttonCopy: HTMLSelectElement;
    constructor(){
        this.buttonCopy = document.querySelector('.copy__btn') as HTMLSelectElement;
    }

    async addEventListenerToCopyBtn(){
        this.buttonCopy.addEventListener('click', function(e) {
            window.navigator.clipboard.writeText(window.location.href)
            const btn = (document.querySelector('.copy__btn') as HTMLButtonElement);
            btn.innerHTML = 'Copied!'
            setTimeout(function(){
                btn.innerHTML = 'Copy Link'
            }, 500);
        });
    }
}