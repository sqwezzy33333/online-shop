import { AllFiltersType } from '../../types/types';
import { allFilters, syncURL } from '../forQueryParam/forQueryParam';
import 'nouislider/dist/nouislider.css';
import '../../style/range.scss';
const wNumb = require('wnumb');
import * as noUiSlider from 'nouislider';

export class FilterStock {
  stockFilterSlider = document.querySelector('.filters__range-wrapper') as noUiSlider.target;
  drawFilter() {
    const filters = document.querySelector('.filters') as HTMLElement;
    const filter = document.createElement('div') as HTMLElement;
    const title = document.createElement('div') as HTMLElement;
    const counters = document.createElement('div') as HTMLElement;
    counters.className = 'counters';
    let leftValue: string | null = '2';
    let rightValue: string | null = '150';
    if (localStorage.getItem('leftStockValue') !== null) leftValue = localStorage.getItem('leftStockValue');
    if (localStorage.getItem('rightStockValue') !== null) rightValue = localStorage.getItem('rightStockValue');
    counters.innerHTML = `<span class="range-counter" id="left-stock">${leftValue}</span>
    <span class="range-counter" id="right-stock">{rightValue}$</span>`;

    const rangeWrapper = document.createElement('div') as noUiSlider.target;
    this.stockFilterSlider = rangeWrapper;
    rangeWrapper.className = 'filters__range-wrapper';
    rangeWrapper.id = 'range-stock';
    if (rangeWrapper) {
      noUiSlider.create(rangeWrapper, {
        start: [
          parseInt(localStorage.getItem('leftStockValue') as string) || 2,
          parseInt(localStorage.getItem('rightStockValue') as string) || 150,
        ],
        connect: true,
        step: 1,
        range: {
          min: 2,
          max: 150,
        },
        format: wNumb({
          decimals: 0,
        }),
      });
      rangeWrapper.noUiSlider?.on('update', function (values) {
        let leftValue: string | number = values[0];
        let rightValue: string | number = values[1];

        localStorage.setItem('leftStockValue', leftValue.toString());
        localStorage.setItem('rightStockValue', rightValue.toString());

        counters.innerHTML = `<span class="range-counter" id="left-stock">${leftValue}$</span>
                          <span class="range-counter" id="right-stock">${rightValue}$</span>`;
      });
    }
    filter.className = 'filters__filter';
    filter.classList.add('filters__stock');
    title.className = 'filters__title';
    title.innerHTML = 'Stock';
    filter.append(title);
    filter.append(rangeWrapper);
    filter.append(counters);
    filters.append(filter);
  }
  checkFilter(allFiltersOnload?: AllFiltersType) {
    this.stockFilterSlider?.noUiSlider?.on('set', () => {
      const filterValues = [this.stockFilterSlider.noUiSlider?.get()][0] as number[];
      let leftCount: string | number = filterValues[0];
      let rightCount: string | number = filterValues[1];
      const searchClear = location.search.split('');
      searchClear.shift();
      const queryParamsString = searchClear.join('').toString();
      let paramsObject = JSON.parse(
        '{"' + decodeURI(queryParamsString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
      );
      paramsObject.stock = `${leftCount},${rightCount}`;
      syncURL(paramsObject);
      console.log(paramsObject);
    });
  }
}
