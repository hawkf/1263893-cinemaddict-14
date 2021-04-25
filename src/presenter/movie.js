import FilmCard from '../view/film-card';
import FilmDetailsInformation from '../view/film-details-information';
import FilmDetail from '../view/film-details';
import {render, replace, RenderPosition, remove} from '../utils/render';

export default class Movie {
  constructor(filmListElement, popupContainer, changeData) {
    this._filmListElement = filmListElement;
    this._popupContainer = popupContainer;
    this._changeData = changeData;
    this._filmDetailsComponent = new FilmDetail();

    this._filmCardComponent  = null;
    this._setFilmCardClickHandler = this._setFilmCardClickHandler.bind(this);
    this._setFilmInformationClickHandler = this._setFilmInformationClickHandler.bind(this);
    this._addWatchListHandler = this._addWatchListHandler.bind(this);
    this._addIsWatchedHandler = this._addIsWatchedHandler.bind(this);
    this._addIsFavoriteHandler = this._addIsFavoriteHandler.bind(this);
  }

  init(film) {
    const prevMovieComponent = this._filmCardComponent;
    this._film = film;
    this._filmCardComponent = new FilmCard(this._film);
    this._filmCardComponent.setAddWatchListHandler(this._addWatchListHandler);
    this._filmCardComponent.setAddIsWatchedHandler(this._addIsWatchedHandler);
    this._filmCardComponent.setAddIsFavoriteHandler(this._addIsFavoriteHandler);
    this._filmInformationComponent = new FilmDetailsInformation(this._film);
    this._commentComponent = new Comment(this._film);
    if(prevMovieComponent === null) {
      render(this._filmListElement, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if(this._filmListElement.contains(prevMovieComponent.getElement())) {
      replace(this._filmCardComponent, prevMovieComponent);
    }

    remove(prevMovieComponent);

  }
  _addFilmPopup() {
    this._popupContainer.classList.add('hide-overflow');
    this._popupContainer.appendChild(this._filmDetailsComponent.getElement());
    const filmDetailsElement = document.querySelector('.film-details__inner');
    render(filmDetailsElement, this._filmInformationComponent, RenderPosition.BEFOREEND);
    render(filmDetailsElement, this._commentComponent, RenderPosition.BEFOREEND);
    this._setFilmInformationClickHandler();
  }

  _removeFilmPopup() {
    this._popupContainer.removeChild(this._filmDetailsComponent.getElement());
    this._popupContainer.classList.remove('hide-overflow');
  }

  _setFilmCardClickHandler() {
    this._filmCardComponent.setClickHandler(() => this._addFilmPopup());
  }

  _setFilmInformationClickHandler() {
    this._filmInformationComponent.setClickHandler(() => this._removeFilmPopup());
  }

  _addWatchListHandler() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          watchList: !this._film.watchList,
        },
      ),
    );
  }

  _addIsWatchedHandler() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _addIsFavoriteHandler(){
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }
}
