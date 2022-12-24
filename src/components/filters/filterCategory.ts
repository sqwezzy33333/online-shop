import { IProduct } from '../types/types';

export class FilterCategory {
  async drawFilter(data: [IProduct]) {
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
    filter.append(title);
    categoryArray.forEach((category) => {
      let inputRow = document.createElement('div') as HTMLElement;
      inputRow.className = 'filters__input-row';
      let countOfProducts = productsArray.filter((item) => item.category === category);
      inputRow.innerHTML = `
      <input type="checkbox" id="${category}">
      <label for="${category}">${category}
      </label><span class="filters__counter">${countOfProducts.length}/${countOfProducts.length}</span>`;
      filter?.append(inputRow);
    });
    filters?.append(filter);
  }

  checkFilter() {
    const filter = document.querySelectorAll('.filters__input-row');
    filter.forEach((item) => {
      const input = item.children[0] as HTMLInputElement;
      input.addEventListener('change', function () {
        if (input.checked) {
          window.location.hash = `${input.id}`;
        }
      });
    });
  }
}
