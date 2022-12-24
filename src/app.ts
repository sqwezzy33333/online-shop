import './libs/normalize.css';
import './libs/index.scss';
import { DrawElements } from './components/draw/draw';
import { Sort } from './components/sort/sort';
const draw = new DrawElements();
const sortObj = new Sort();
console.log(draw.drawCartGoods());


const sortClick = document.querySelector<HTMLElement>('.search__button');
const sortText = document.querySelector<HTMLElement>('.search__text');
const txt: string = sortText?.outerHTML || '';

sortClick?.addEventListener('click', (e) => {
    sortObj.sort(txt);
});