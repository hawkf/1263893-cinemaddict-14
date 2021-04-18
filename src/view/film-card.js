import {AbstractView} from './abstract';

const createFilmCardTemplate = (film) => {
  const {title, rating, year, duration, genres, poster, description, commentsCount, watchList, isWatched, favorites} = film;
  const resultDescription = description.length > 140 ? description.substring(0, 139) + '...' : description;


  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genres.join(' ')}</span>
          </p>
          <img src=${poster} alt="" class="film-card__poster">
          <p class="film-card__description">${resultDescription}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchList ? 'film-card__controls-item--active' : '' }" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active ${isWatched ? 'film-card__controls-item--active' : '' }" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favorites ? 'film-card__controls-item--active' : '' }" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
  }
}
