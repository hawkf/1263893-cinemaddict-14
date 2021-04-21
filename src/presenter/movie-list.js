import Sort from '../view/sort';
import Films from '../view/films';
import FilmsList from '../view/films-list';
import SiteMenu from '../view/site-menu';
import ShowMoreButton from '../view/show-more-button';
import {remove, render, RenderPosition} from '../utils/render';
import Movie from './movie';

const FILM_COUNT_PER_STEP = 5;

export default class MovieList {

  constructor(movieContainer, popupContainer) {
    this._movieContainer = movieContainer;
    this._popupContainer = popupContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._sortComponent = new Sort();
    this._filmsComponent = new Films();
    this._filmsListComponent = new FilmsList();
    this._showMoreButtonComponent = new ShowMoreButton();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._siteMenuComponent = new SiteMenu(this._films);

    this._renderSiteMenu();
    this._renderSort();
    this._renderFilmsContainer();
    this._renderMovieList();
  }

  _renderSiteMenu() {
    render(this._movieContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._movieContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderMovieList() {
    this._filmsListContainerElement = this._filmsListComponent.getElement().querySelector('.films-list__container');

    for(let i  = 0; i < Math.min(this._films.length, this._renderedFilmCount); i++) {
      this._renderFilm(this._films[i]);
    }

    if(this._films.length > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _renderFilm (film) {
    const movie = new Movie(this._filmsListContainerElement, this._popupContainer);
    movie.init(film);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderFilmsContainer() {
    render(this._movieContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    /*this._showMoreButtonComponent.setClickHandler(() => {
      films
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsListContainerElement, film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if(renderedFilmCount >= films.length) {
        showMoreButtonComponent.getElement().remove();
      }
    });*/
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);

    this._renderedFilmCount += FILM_COUNT_PER_STEP;
    if(this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

}
