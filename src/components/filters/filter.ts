import { FilterCategory } from './filterCategory';
import { IProduct } from '../types/types';
import { AllFiltersType } from '../types/types';

export class Filter {
  filterCategory: FilterCategory;
  constructor() {
    this.filterCategory = new FilterCategory();
  }
  async start(data: IProduct[], filtredData?: IProduct[], allFilters?:AllFiltersType) {
    this.filterCategory.drawFilter(data, filtredData);
    this.filterCategory.drawChekedInput(allFilters);
    
  }
  filter(allFiltersOnload?: AllFiltersType) {
    this.filterCategory.checkFilter(allFiltersOnload);
    this.filterCategory.openAllFilters();
  }
}