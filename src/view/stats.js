import {AbstractView} from './abstract';

const createStatsTemplate = () => {


  return `<section class="statistic visually-hidden">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Movie buff</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Sci-Fi</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class Stats extends AbstractView {
  constructor() {
    super();

  }

  getTemplate() {
    return createStatsTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(this._film.id);

  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments').forEach((element) => {
      if(element.classList.contains('film-card__poster') || element.classList.contains('film-card__title') || element.classList.contains('film-card__comments')) {
        element.addEventListener('click', this._clickHandler);
      }
    });
  }

  setAddWatchListHandler(callback) {
    this._callback.addWathList = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._addWatchListHandler);
  }

  setAddIsWatchedHandler(callback) {
    this._callback.addIsWatched = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._addIsWatchedHandler);
  }


  setAddIsFavoriteHandler(callback) {
    this._callback.addIsFavorite = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._addIsFavoriteHandler);
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
