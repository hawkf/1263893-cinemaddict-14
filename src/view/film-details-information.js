import {AbstractView} from './abstract';
import {humanizeFilmRealeaseDate} from '../utils/film';

const createFilmDetailsInformationTemplate = (film) => {
  const {title, rating, duration, genres, poster, description, age, director, writers, actors, releaseDate, country, watchList, isWatched, isFavorite} = film;

  const date = humanizeFilmRealeaseDate(releaseDate);
  const genreName = genres.length > 1 ? 'Genres' : 'Genre';
  const createGenreTemplate = (genresList) => {
    return genresList.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
  };

  const genreElement = createGenreTemplate(genres);

  return `<div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${poster} alt="">

          <p class="film-details__age">${age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreName}</td>
              <td class="film-details__cell">${genreElement}</td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchList ? 'checked' : ''}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? 'checked' : ''}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? 'checked' : ''}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>`;
};

export default class FilmDetailsInformation extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._addWatchListHandler = this._addWatchListHandler.bind(this);
    this._addIsWatchedHandler = this._addIsWatchedHandler.bind(this);
    this._addIsFavoriteHandler = this._addIsFavoriteHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsInformationTemplate(this._film);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
  }

  setAddWatchListHandler(callback) {
    this._callback.addWathList = callback;
    this.getElement().querySelector('#watchlist').addEventListener('click', this._addWatchListHandler);
  }

  setAddIsWatchedHandler(callback) {
    this._callback.addIsWatched = callback;
    this.getElement().querySelector('#watched').addEventListener('click', this._addIsWatchedHandler);
  }

  setAddIsFavoriteHandler(callback) {
    this._callback.addIsFavorite = callback;
    this.getElement().querySelector('#favorite').addEventListener('click', this._addIsFavoriteHandler);
  }


  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }


  _addWatchListHandler(evt) {
    evt.preventDefault();
    this._callback.addWathList();
  }

  _addIsWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.addIsWatched();
  }


  _addIsFavoriteHandler(evt) {
    evt.preventDefault();
    this._callback.addIsFavorite();
  }
}
