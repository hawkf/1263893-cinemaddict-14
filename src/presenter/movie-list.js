import Sort from '../view/sort';
import Films from '../view/films';
import FilmsList from '../view/films-list';
import SiteMenu from '../view/site-menu';
import ShowMoreButton from '../view/show-more-button';
import {remove, render, RenderPosition} from '../utils/render';
import Movie from './movie';
import {updateItem} from '../utils/common';
import FilmDetail from '../view/film-details';

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
    this._filmDetailsComponent = null;
    this._moviePresenter = {};

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._handleAddFilmPopup = this._handleAddFilmPopup.bind(this);
    this._handleRemoveFilmPopup = this._handleRemoveFilmPopup.bind(this);
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

  _clearMovieList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
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
    const movie = new Movie(this._filmsListContainerElement, this._popupContainer, this._handleMovieChange, this._handleAddFilmPopup, this._handleRemoveFilmPopup);
    movie.init(film);
    this._moviePresenter[film.id] = movie;
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
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);

    this._renderedFilmCount += FILM_COUNT_PER_STEP;
    if(this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleMovieChange(updatedMovie) {
    this._films = updateItem(this._films, updatedMovie);
    this._moviePresenter[updatedMovie.id].init(updatedMovie);
  }

  _handleAddFilmPopup() {
    if(this._filmDetailsComponent ===null) {
      this._filmDetailsComponent = new FilmDetail();
    }
    if(this._popupContainer.contains(this._filmDetailsComponent.getElement())) {
      remove(this._filmDetailsComponent);
      this._filmDetailsComponent = new FilmDetail();
    }

    this._popupContainer.classList.add('hide-overflow');
    this._popupContainer.appendChild(this._filmDetailsComponent.getElement());
  }

  _handleRemoveFilmPopup() {
    this._popupContainer.removeChild(this._filmDetailsComponent.getElement());
    this._popupContainer.classList.remove('hide-overflow');
    remove(this._filmDetailsComponent);
  }

}
