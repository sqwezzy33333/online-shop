import { FilterCategory } from './filterCategory';
import { IProduct } from '../types/types';

export class Filter {
  filterCategory: FilterCategory;
  constructor() {
    this.filterCategory = new FilterCategory();
  }
  async start(data: IProduct[], filtredData?: IProduct[]) {
    this.filterCategory.drawFilter(data, filtredData);
    this.filterCategory.openAllFilters();
    this.filterCategory.drawChekedInput();
  }
  filter() {
    this.filterCategory.checkFilter();
  }
}
