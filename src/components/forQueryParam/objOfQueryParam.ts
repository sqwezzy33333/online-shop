import { AllFiltersType } from '../../types/types';

export const allFilters: AllFiltersType = {
  category: '',
  brand: '',
  price: 0,
  stock: 0,
  search: '',
  type: '',
};
const category = localStorage.getItem('category');
if(category !== null){
  allFilters.category = category;
}