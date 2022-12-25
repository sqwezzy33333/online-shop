import { IProduct } from '../types/types';

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
    filterRow.forEach((item) => {
      const input = item.children[0] as HTMLInputElement;
      input.addEventListener('change', function () {
        let searchArray: (string | null)[] = [`category?=`];
        if (input.checked) {
          if (localStorage.getItem('category') !== null) {
            let arrayFromLocalStorage = localStorage.getItem('category')?.split(',');
            if (arrayFromLocalStorage) searchArray = searchArray.concat(arrayFromLocalStorage);
          }
          if (localStorage.getItem('category') === '') searchArray = [`category?=`];
          let searchArrayFromString: string[] = `${searchArray.toString()},${input.id}`.split('');
          searchArrayFromString.splice(10, 1);
          let serchParams = searchArrayFromString.join('');
          window.history.pushState({'gg':'dd'}, '', serchParams);
          searchArray.shift();
          searchArray.push(`${input.id}`);
          localStorage.setItem('category', `${searchArray}`);
        } else {
          let searchArray: (string | null)[] = [`category?=`];
          let url: string = window.location.href;
          let serchParams: string[] = url.split('=');
          let arrayCategories: string[] | undefined = serchParams[1].split(',');
          if (localStorage.getItem('category')) arrayCategories = localStorage.getItem('category')?.split(',');
          let filtredArrayOfCategories;
          let urlToString: string[];
          let serchParamsForHistory: string;
          if (arrayCategories !== undefined) {
            filtredArrayOfCategories = arrayCategories.filter((el) => {
              return el !== input.id;
            });
            localStorage.setItem('category', filtredArrayOfCategories.toString());
            urlToString = searchArray.concat(filtredArrayOfCategories).toString().split('');
            urlToString.splice(10, 1);
            serchParamsForHistory = urlToString.join('');
            window.history.replaceState({'gg':'dd'}, '', serchParamsForHistory);
          }
        }
      });
    });
  }
}
