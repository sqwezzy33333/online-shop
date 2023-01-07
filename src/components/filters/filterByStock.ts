import { AllFiltersType } from '../../types/types';
import 'nouislider/dist/nouislider.css';
import '../../style/range.scss';
const wNumb = require('wnumb');
import * as noUiSlider from 'nouislider';

export class FilterStock {
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
    counters.innerHTML = `<span class="range-counter" id="left-stock">${leftValue}$</span>
    <span class="range-counter" id="right-stock">${rightValue}$</span>`;

    const rangeWrapper = document.createElement('div') as noUiSlider.target;
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
}
