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
  filterArrayByCategory(data: IProduct[], eventStateCategory: string): IProduct[] {
    if (eventStateCategory !== undefined) {
      const filterByCategoryArr: string[] = eventStateCategory.split('%2C').filter((el: string) => {
        return el !== '';
      });
      const filtredArrayOfProd = data.filter((item) => {
        let haveItemCategory: boolean = false;
        for (let i = 0; i < filterByCategoryArr.length; i++) {
          if (item.category === filterByCategoryArr[i]) {
            haveItemCategory = true;
          }
        }
        if (haveItemCategory) return true;
      });
      return filtredArrayOfProd;
    }
    return data;
  }
}