import { IProduct } from '../types/types';
import { allFilters } from '../forQueryParam/objOfQueryParam';
import { Filters } from '../types/types';

export class FilterCategory {
  uploadFilter(): void {
    const filters = document.querySelector('.filters') as HTMLElement;
    filters.innerHTML = '';
    const filtersTitle = document.createElement('div');
    filtersTitle.className = 'filters__main-title';
    filtersTitle.innerHTML = 'Filters:';
    filters.append(filtersTitle);
  }

  async drawFilter(data: IProduct[], filtredData?: IProduct[]): Promise<void> {
    let categoryArray: string[] = data.map((item) => item.category);
    const filters = document.querySelector('.filters') as HTMLElement;
    const filter = document.createElement('div') as HTMLElement;
    const title = document.createElement('div') as HTMLElement;
    const btnShowAll = document.createElement('div') as HTMLElement;
    const form = document.createElement('form') as HTMLFormElement;
    this.openAllFilters();
    categoryArray = categoryArray.filter((element, index) => {
      return categoryArray.indexOf(element) === index;
    });

    this.uploadFilter();
    filter.className = 'filters__filter';
    title.className = 'filters__title';
    title.innerHTML = 'Category';
    form.className = 'form';
    btnShowAll.className = 'filters__btn';
    btnShowAll.innerHTML = 'Show all';
    if (localStorage.getItem('showAllCategories') === 'true') {
      filter.style.height = 'auto';
      btnShowAll.classList.toggle('_active');
      localStorage.setItem('showAllCategories', 'true');
    }
    filter.append(title);
    filter.append(btnShowAll);
    filter.append(form);

    categoryArray.forEach((category) => {
      let counter: number = 0;
      const inputRow = document.createElement('div') as HTMLElement;
      inputRow.className = 'filters__input-row';
      if (filtredData !== undefined && filtredData.length < 1) {
        counter = 5;
      } else if (localStorage.getItem('category') === '') {
        counter = 5;
      } else if (localStorage.getItem('category') !== '') {
        filtredData?.forEach((el) => {
          if (el.category === category) {
            counter++;
          }
        });
      }
      inputRow.innerHTML = `
                            <input type="checkbox" id="${category}" name='category'>
                            <label for="${category}">${category}
                            </label><span class="filters__counter">${counter}/5</span>`;
      form?.append(inputRow);
    });
    filters?.append(filter);
  }

  checkFilter(): void {
    const filterRow = document.querySelectorAll('.filters__input-row');
    function transformToURLParams(filters: Filters) {
      const query = Object.entries(filters)
        .map(([key, value]) => {
          return `${key}=${value}`;
        })
        .join('&');
      return `?${query}`;
    }
    function syncURL(filters: Filters) {
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
          const localStorageCategory = localStorage.getItem('category');
          if (localStorageCategory) {
            allFilters.category = localStorageCategory;
          }
          allFilters.category += `,${input.id}`;
          localStorage.setItem('category', allFilters.category);
          syncURL(allFilters);
          item.children[1].classList.toggle('cheked');
        } else {
          const arrayFromCategory = allFilters.category.split(',');
          const filtredArrayOfCategory = arrayFromCategory.filter((element) => {
            return element !== input.id && element !== '';
          });
          allFilters.category = filtredArrayOfCategory.toString();
          syncURL(allFilters);
          localStorage.setItem('category', allFilters.category);
          item.children[1].classList.toggle('cheked');
        }
      });
    });
  }

  drawChekedInput(): void {
    const filterRow = document.querySelectorAll('.filters__input-row');
    const arrayFromCategory = allFilters.category.split(',');
    const filtredArrayOfCategory = arrayFromCategory.filter((element) => {
      return element !== '';
    });
    filterRow.forEach((item) => {
      const input = item.children[0] as HTMLInputElement;
      filtredArrayOfCategory.forEach((el) => {
        if (el === input.id) {
          item.children[1].classList.toggle('cheked');
          input.checked = true;
        }
      });
    });
  }

  openAllFilters() {
    const btn = document.querySelector('.filters__btn') as HTMLElement;
    const filter = document.querySelector('.filters__filter') as HTMLElement;
    btn?.addEventListener('click', () => {
      btn.classList.toggle('_active');
      if (btn.classList.contains('_active')) {
        filter.style.height = 'auto';
        localStorage.setItem('showAllCategories', 'true');
      } else {
        filter.style.height = '180px';
      }
    });
  }
}