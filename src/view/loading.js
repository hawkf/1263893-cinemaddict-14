import {AbstractView} from './abstract.js';

const createNoMoviesTemplate = () => {
  return `<p class="list__no-movies">
    Loading...
  </p>`;
};

export default class Loading extends AbstractView {
  getTemplate() {
    return createNoMoviesTemplate();
  }
}
