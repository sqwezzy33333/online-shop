import { AllFiltersType } from '../types/types';

export const allFilters: AllFiltersType = {
  category: '',
  brand: '',
  price: 0,
  stock: 0,
  search: '',
  type: '',
};
<<<<<<< HEAD

export const allTypeSort: ITypeOfSort = {
  type: '',
};
=======
let category = localStorage.getItem('category');
if(category !== null){
  allFilters.category = category;
}
>>>>>>> db5adb8 (fix: solve bugs with cards)
