import Sort from '../view/sort';
import Films from '../view/films';
import FilmsList from '../view/films-list';
import ShowMoreButton from '../view/show-more-button';
import {remove, render, RenderPosition, replace} from '../utils/render';
import MoviePresenter from './moviePresenter';
import FilmDetail from '../view/film-details';
import {SortType, UpdateType} from '../const';
import {sortByDate, sortByRating} from '../utils/film';
import NoFilmComponent from '../view/no-film';
import {filter} from '../utils/filter';


const FILM_COUNT_PER_STEP = 5;

export default class MovieListPresenter {

  constructor(movieContainer, popupContainer, moviesModel, filterModel) {
    this._movieContainer = movieContainer;
    this._popupContainer = popupContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;

    this._sortComponent = null;
    this._showMoreButtonComponent = null;
    this._filmsComponent = new Films();
    this._filmsListComponent = new FilmsList();
    this._noFilmsComponent = new NoFilmComponent();
    this._filmDetailsComponent = null;
    this._moviePresenter = {};
    this._currentSortType = SortType.DEFAULT;


    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleAddFilmPopup = this._handleAddFilmPopup.bind(this);
    this._handleRemoveFilmPopup = this._handleRemoveFilmPopup.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderSort();
    this._renderFilmsContainer();
    this._renderMovieList();

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }


  _getMovies() {
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filteredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortByDate);
      case SortType.RATING:
        return filteredMovies.sort(sortByRating);
    }
    return filteredMovies;
  }

  _renderNoFilms() {
    this._filmsListContainerElement = this._filmsListComponent.getElement().querySelector('.films-list__container');
    render(this._filmsListContainerElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _clearMovieList({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getMovies().length;

    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._sortComponent);
    remove(this._noFilmsComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderMovieList() {
    const filmCount = this._getMovies().length;
    this._filmsListContainerElement = this._filmsListComponent.getElement().querySelector('.films-list__container');
    const films = this._getMovies();

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }


  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;

    this._clearMovieList({resetRenderedTaskCount: true});
    this._renderMovieList();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new Sort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._movieContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm (film) {
    const movie = new MoviePresenter(this._filmsListContainerElement, this._popupContainer, this._handleViewAction, this._handleAddFilmPopup, this._handleRemoveFilmPopup);
    movie.init(film);
    this._moviePresenter[film.id] = movie;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderFilmsContainer() {
    render(this._movieContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    if(this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButton();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getMovies().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getMovies().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleViewAction(actionType, updateType, update) {
    this._moviesModel.updateMovie(updateType, update);
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._moviePresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearMovieList();
        this._renderMovieList();
        break;
      case UpdateType.MAJOR:
        this._clearMovieList({resetRenderedFilmCount: true, resetSortType: true});
        this._renderMovieList();
        break;
    }
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