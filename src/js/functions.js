import refs from './refs';
import template from '../templates/template.hbs';
import api from './API';

function show() {
  refs.button.classList.remove('is-hidden');
}

function hide() {
  refs.button.classList.add('is-hidden');
}

async function catchInput() {
  if (refs.list.innerHTML !== '') {
    refs.list.innerHTML = '';
  }
  api.pageNum = 1;
  await getResults(refs.input.value, api.pageNum);
  refs.list.innerHTML === '' ? hide() : show();
}

function getResults(querySearch, apiPageNum) {
  if (querySearch.length > 0) {
    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${querySearch}&page=${apiPageNum}&per_page=12&key=${api.key}`,
    )
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(
          `${response.status} error while your search has occured`,
        );
      })
      .then(pic => {
        const markup = pic.hits.map(item => template(item)).join('');
        refs.list.insertAdjacentHTML('beforeend', markup);
      })
      .catch(err => {
        throw err;
      });
  }
}

export { show, hide, catchInput, getResults };
