import {AbstractView} from './abstract';

const createSiteMenuTemplate = (films) => {
  let watchListCount = 0;
  let historyCount = 0;
  let favoritesCount = 0;

  films.forEach((film) => {
    if(film.watchList) {
      watchListCount++;
    }
    if(film.isWatched) {
      historyCount++;
    }
    if(film.isFavorite) {
      favoritesCount++;
    }
  });


  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchListCount}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._films);
  }
}
