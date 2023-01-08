export class Clear {

  async clearFilters(){
    const buttonClear = document.querySelector('.clear-btn') as HTMLSelectElement;
      buttonClear.addEventListener('click', ()=> {
        localStorage.clear();
      });
  }
}