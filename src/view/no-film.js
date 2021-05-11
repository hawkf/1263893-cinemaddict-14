import {AbstractView} from './abstract';


const createNoFilmTemplate = () => {
  return `
          <h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class noFilmComponent extends AbstractView {

  getTemplate() {
    return createNoFilmTemplate();
  }
}
