import './styles.css';
import debounce from 'lodash.debounce';
import template from './templates/template.hbs';
import refs from './js/refs';
import { show, hide, catchInput, getResults } from './js/functions';
import api from './js/API';

refs.input.addEventListener('input', debounce(catchInput, 700));

refs.button.addEventListener('click', () => {
  api.pageNum++;
  getResults(refs.input.value, api.pageNum);
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth',
  });
});

console.log(document.documentElement.clientHeight);
