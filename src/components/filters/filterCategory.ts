import { IProduct } from '../types/types';
import { allFilters } from './allFiltersObject';

export class FilterCategory {
  async drawFilter(data: [IProduct]): Promise<void> {
    let productsArray: [IProduct] = data;
    let categoryArray: string[] = productsArray.map((item) => item.category);
    categoryArray = categoryArray.filter((element, index) => {
      return categoryArray.indexOf(element) === index;
    });
    const filters = document.querySelector('.filters') as HTMLElement;
    const filter = document.createElement('div') as HTMLElement;
    filter.className = 'filters__filter';
    const title = document.createElement('div') as HTMLElement;
    title.className = 'filters__title';
    title.innerHTML = 'Category';
    const form = document.createElement('form') as HTMLFormElement;
    form.className = 'form';
    filter.append(title);
    filter.append(form);
    categoryArray.forEach((category) => {
      let inputRow = document.createElement('div') as HTMLElement;
      inputRow.className = 'filters__input-row';
      let countOfProducts = productsArray.filter((item) => item.category === category);
      inputRow.innerHTML = `
      <input type="checkbox" id="${category}" name='selfdestruct'>
      <label for="${category}">${category}
      </label><span class="filters__counter">${countOfProducts.length}/${countOfProducts.length}</span>`;
      form?.append(inputRow);
    });
    filters?.append(filter);
  }

  checkFilter(): void {
    const filterRow = document.querySelectorAll('.filters__input-row');
    function transformToURLParams(filters: Object) {
      const query = Object.entries(filters)
        .map(([key, value]) => {
          return `${key}=${value}`;
        })
        .join('&');
      return `?${query}`;
    }
    function syncURL(filters: Object) {
      const path = document.location.pathname;
      const query = transformToURLParams(filters);

      window.history.pushState(filters, '', `${path}${query}`);
      window.history.pushState(filters, '', `${path}${query}`);
      history.back();
    }
    filterRow.forEach((item) => {
      const input = item.children[0] as HTMLInputElement;
      input.addEventListener('change', function () {
        if (input.checked) {
          let localStorageCategory = localStorage.getItem('category');
          if (localStorageCategory) {
            allFilters.category = localStorageCategory;
          }
          allFilters.category += `${input.id},`;
          localStorage.setItem('category', allFilters.category);
          syncURL(allFilters);
        } else {
          let arrayFromCategory = allFilters.category.split(',');
          let filtredArrayOfCategory = arrayFromCategory.filter((element) => {
            return element !== input.id && element !== '';
          });
          allFilters.category = filtredArrayOfCategory.toString();
          syncURL(allFilters);
          localStorage.setItem('category', allFilters.category);
        }
      });
    });
  }
}
