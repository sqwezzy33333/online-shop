import './libs/normalize.css';
import './libs/index.scss';
import { Loader } from './components/loader/loader';
const loader = new Loader('./assets/data/data.json');
console.log(loader.load());
