import { AllFiltersType } from '../../types/types';
import { syncURL } from '../../components/forQueryParam/forQueryParam';
export class Clear {
  cartHeaderTotal = document.querySelector('.price-basket__name_count') as HTMLElement;
  async clearFilters() {
    localStorage.clear();
    let search = document.querySelector('.search__input') as HTMLInputElement;
    search.value = '';
    let clearObject: AllFiltersType = {
      category: '',
      brand: '',
      price: '',
      stock: '',
      search: '',
      type: 'priceUp',
      view: 'blocks',
    };
    this.cartHeaderTotal.innerHTML = '0';
    syncURL(clearObject);
  }
}
