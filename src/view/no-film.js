import {AbstractView} from './abstract';

export default class NoFilmComponent extends AbstractView {

  getTemplate() {
    return `
           <h2 class="films-list__title">There are no movies in our database</h2>`;
  }
}
