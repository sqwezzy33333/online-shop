import { FilterCategory } from './filterCategory';
import { IProduct } from '../types/types';

export class Filter {
  filterCategory: FilterCategory;
  constructor() {
    this.filterCategory = new FilterCategory();
  }
  async start(data: [IProduct]) {
    this.filterCategory.drawFilter(data);
  }
  async filter() {
    this.filterCategory.checkFilter();
  }
}
