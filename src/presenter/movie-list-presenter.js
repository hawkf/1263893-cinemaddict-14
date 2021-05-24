import Sort from '../view/sort';
import Films from '../view/films';
import FilmsList from '../view/films-list';
import ShowMoreButton from '../view/show-more-button';
import {remove, render, RenderPosition, replace} from '../utils/render';
import MoviePresenter from './movie-presenter';
import FilmDetail from '../view/film-details';
import {SortType, UpdateType, UserAction} from '../const';
import {sortByDate, sortByRating} from '../utils/film';
import NoFilmComponent from '../view/no-film';
import {filter} from '../utils/filter';
import PopupPresenter from './popup';
import Loading from '../view/loading';
import Profile from '../view/profile';


const FILM_COUNT_PER_STEP = 5;

export default class MovieListPresenter {

  constructor(profileContainer, movieContainer, popupContainer, moviesModel, commentsModel, filterModel, api) {
    this._profileContainer = profileContainer;
    this._movieContainer = movieContainer;
    this._popupContainer = popupContainer;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._api = api;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._isLoading = true;

    this._profileComponent = null;
    this._loadingComponent = new Loading();
    this._sortComponent = null;
    this._showMoreButtonComponent = null;
    this._filmsComponent = new Films();
    this._filmsListComponent = new FilmsList();
    this._noFilmsComponent = new NoFilmComponent();
    this._filmDetailsComponent = null;
    this._moviePresenter = {};
    this._renderedMovieInformationPresenter = null;

    this._movieInformationPresenter = {};
    this._currentSortType = SortType.DEFAULT;


    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleAddFilmPopup = this._handleAddFilmPopup.bind(this);
    this._handleRemoveFilmPopup = this._handleRemoveFilmPopup.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    if(!this._isLoading) {
      this._renderSort();
    }

    this._renderProfile(null);
    this._renderFilmsContainer();
    this._renderMovieList();


    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  hide() {
    this._filmsComponent.hide();
    this._sortComponent.hide();
  }

  show() {
    this._sortComponent.show();
    this._filmsComponent.show();
    this._clearMovieList({resetRenderedFilmCount: true, resetSortType: false});
    this._renderMovieList();
  }

  _getMovies() {
    const filterType = this._filterModel.get();
    const movies = this._moviesModel.get();
    this._createMovieInformationPresenters(movies);
    const filteredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredMovies.slice().sort(sortByDate);
      case SortType.RATING:
        return filteredMovies.slice().sort(sortByRating);
    }
    return filteredMovies.slice();
  }

  _createMovieInformationPresenters (movies) {
    movies.forEach((movie) => {
      this._movieInformationPresenter[movie.id] = new PopupPresenter(movie, this._handleViewAction, this._handleRemoveFilmPopup);
    });
  }

  _renderProfile(films) {
    if(this._profileComponent !== null) {
      remove(this._profileComponent);
    }
    this._profileComponent = new Profile(films);
    render(this._profileContainer, this._profileComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    this._filmsListContainerElement = this._filmsListComponent.getElement().querySelector('.films-list__container');
    render(this._filmsListContainerElement, this._loadingComponent, RenderPosition.BEFOREEND);
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
    remove(this._filmsComponent);
    remove(this._filmsListComponent);
    remove(this._noFilmsComponent);
    remove(this._loadingComponent);
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
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if(!this._isLoading) {
      this._renderSort();
    }

    this._renderProfile(this._moviesModel.get());
    this._renderFilmsContainer();

    const filmCount = this._getMovies().length;
    this._filmsListContainerElement = this._filmsListComponent.getElement().querySelector('.films-list__container');
    const films = this._getMovies();

    if(this._renderedMovieInformationPresenter !== null) {
      const popupFilm = this._moviesModel.get().find((film) => film.id === this._renderedMovieInformationPresenter.getFilmId());
      this._renderedMovieInformationPresenter.update(popupFilm);
      this._renderedMovieInformationPresenter.init(this._filmDetailsComponent, this._commentsModel.get());
    }
    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

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

    this._clearMovieList({resetRenderedFilmCount: true, resetSortType: false});
    this._renderMovieList();
  }

  _renderSort() {
    const prevSortComponent = this._sortComponent;
    this._sortComponent = new Sort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    if (prevSortComponent === null) {
      render(this._movieContainer, this._sortComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._movieContainer.contains(prevSortComponent.getElement())) {
      replace(this._sortComponent, prevSortComponent);
    }

    remove(prevSortComponent);
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
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._api.updateMovie(update).then((response) => {
          this._moviesModel.update(updateType, response);
        });
        break;
      case  UserAction.ADD_COMMENT:
        this._renderedMovieInformationPresenter.setSaving();
        this._api.addComment(update.comment, update.filmId).then((response) => {
          this._commentsModel.set(response.comments);
          this._moviesModel.update(updateType, response.movie);
        })
          .catch(() => {
            this._renderedMovieInformationPresenter.resetFormState();
          });
        break;
      case UserAction.DELETE_COMMENT:
        this._renderedMovieInformationPresenter.setDeleting(update.commentId);
        this._api.deleteComment(update.commentId).then(() => {
          this._commentsModel.delete(update.commentId);
          this._moviesModel.deleteComment(updateType, update.filmId, update.commentId);
        })
          .catch(() => {
            this._renderedMovieInformationPresenter.resetDeleteState(update.commentId);
          });
    }

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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderMovieList();
        break;
    }
  }

  _handleAddFilmPopup(filmId) {
    if(this._renderedMovieInformationPresenter !== null) {
      this._handleRemoveFilmPopup();
      this._renderedMovieInformationPresenter = null;
    }
    if (this._filmDetailsComponent ===null) {
      this._filmDetailsComponent = new FilmDetail();
    }
    if (this._popupContainer.contains(this._filmDetailsComponent.getElement())) {
      remove(this._filmDetailsComponent);
      this._filmDetailsComponent = new FilmDetail();
    }

    this._popupContainer.classList.add('hide-overflow');
    this._popupContainer.appendChild(this._filmDetailsComponent.getElement());
    this._api.getComments(filmId).then((response) => {
      this._movieInformationPresenter[filmId].init(this._filmDetailsComponent, response);
      this._commentsModel.set(response);
    });

    this._renderedMovieInformationPresenter = this._movieInformationPresenter[filmId];
  }

  _handleRemoveFilmPopup() {
    this._renderedMovieInformationPresenter.destroy();
    this._popupContainer.removeChild(this._filmDetailsComponent.getElement());
    this._popupContainer.classList.remove('hide-overflow');
    remove(this._filmDetailsComponent);
    this._renderedMovieInformationPresenter = null;
  }
}
