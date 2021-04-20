import {AbstractView} from './abstract';

const createFilmDetailTemplate = () => {
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
  </form>
  </section>`;
};

export default class FilmDetail extends AbstractView {
  getTemplate() {
    return createFilmDetailTemplate();
  }
}
