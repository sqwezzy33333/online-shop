import { AllFiltersType } from '../../types/types';
import { syncURL } from '../../components/forQueryParam/forQueryParam';
export class Clear {
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
    syncURL(clearObject);
  }
}
