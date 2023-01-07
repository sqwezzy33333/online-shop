export class Clear {
  buttonClear: HTMLSelectElement;
  constructor(){
      this.buttonClear = document.querySelector('.clear-btn') as HTMLSelectElement;
  }

  async clearFilters(){
      this.buttonClear.addEventListener('click', ()=> {
        localStorage.clear();
        
      });
  }
}