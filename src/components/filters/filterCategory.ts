import { IProduct, AllFiltersType } from '../../types/types';
import { allFilters } from '../forQueryParam/objOfQueryParam';

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

  checkFilter(allFiltersOnload?: AllFiltersType): void {
    const filterRow = document.querySelectorAll('.filters__input-row');
    function transformToURLParams(filters: AllFiltersType) {
      const query = Object.entries(filters)
        .map(([key, value]) => {
          return `${key}=${value}`;
        })
        .join('&');
      return `?${query}`;
    }
    function syncURL(filters: AllFiltersType) {
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
          if (allFilters.category.indexOf(input.id) === -1) {
            allFilters.category += `%2C${input.id}`;
          }
          localStorage.setItem('category', allFilters.category);
          syncURL(allFilters);
          if (allFiltersOnload !== undefined) {
            allFilters.category = allFiltersOnload.category + `%2C${input.id}`;
            syncURL(allFilters);
          }
          item.children[1].classList.toggle('cheked');
        } else {
          let arrayFromCategory = allFilters.category.split('%2C');
          if (allFiltersOnload !== undefined) {
            arrayFromCategory = allFiltersOnload.category.split('%2C');
          }
          const filtredArrayOfCategory = arrayFromCategory.filter((element) => {
            return element !== input.id && element !== '';
          });
          allFilters.category = '%2C' + filtredArrayOfCategory.toString().replace(/,/g, '%2C');
          if (allFilters.category === '%2C') allFilters.category = '';
          syncURL(allFilters);
          localStorage.setItem('category', allFilters.category);
          item.children[1].classList.toggle('cheked');
        }
      });
    });
  }

  drawChekedInput(allFiltersOnload?: AllFiltersType): void {
    const filterRow = document.querySelectorAll('.filters__input-row');
    let arrayFromCategory;
    if(allFilters.category !== ''){
      arrayFromCategory = allFilters.category.split('%2C');
      if (allFiltersOnload !== undefined) {
        arrayFromCategory = allFiltersOnload.category.split('%2C');
      }
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
