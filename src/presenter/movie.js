import FilmCard from '../view/film-card';
import FilmDetailsInformation from '../view/film-details-information';
import {render, replace, RenderPosition, remove} from '../utils/render';

export default class Movie {
  constructor(filmListElement, popupContainer, changeData, addPopup, removeFilmPopup) {
    this._filmListElement = filmListElement;
    this._popupContainer = popupContainer;
    this._changeData = changeData;
    this._addPopup = addPopup;
    this._removeFilmPopup = removeFilmPopup;
    this._filmCardComponent  = null;
    this._filmInformationComponent = null;
    this._addFilmPopup = this._addFilmPopup.bind(this);
    this._addWatchListHandler = this._addWatchListHandler.bind(this);
    this._addIsWatchedHandler = this._addIsWatchedHandler.bind(this);
    this._addIsFavoriteHandler = this._addIsFavoriteHandler.bind(this);
  }

  init(film) {
    const prevMovieComponent = this._filmCardComponent;
    const prevFilmInformationComponent = this._filmInformationComponent;
    this._film = film;
    this._filmCardComponent = new FilmCard(this._film);
    this._filmCardComponent.setClickHandler(this._addFilmPopup);
    this._filmCardComponent.setAddWatchListHandler(this._addWatchListHandler);
    this._filmCardComponent.setAddIsWatchedHandler(this._addIsWatchedHandler);
    this._filmCardComponent.setAddIsFavoriteHandler(this._addIsFavoriteHandler);
    this._filmInformationComponent = new FilmDetailsInformation(this._film);
    this._filmInformationComponent.setClickHandler(this._removeFilmPopup);
    this._filmInformationComponent.setAddWatchListHandler(this._addWatchListHandler);
    this._filmInformationComponent.setAddIsWatchedHandler(this._addIsWatchedHandler);
    this._filmInformationComponent.setAddIsFavoriteHandler(this._addIsFavoriteHandler);
    this._commentComponent = new Comment(this._film);
    if(prevMovieComponent === null) {
      render(this._filmListElement, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }


    if(this._filmListElement.contains(prevMovieComponent.getElement())) {
      replace(this._filmCardComponent, prevMovieComponent);
    }

    if(this._popupContainer.contains(prevFilmInformationComponent.getElement())) {
      replace(this._filmInformationComponent, prevFilmInformationComponent);
    }

    remove(prevMovieComponent);
    remove(prevFilmInformationComponent);

  }

  _addFilmPopup() {
    this._addPopup();
    const filmDetailsElement = document.querySelector('.film-details__inner');
    render(filmDetailsElement, this._filmInformationComponent, RenderPosition.BEFOREEND);
    render(filmDetailsElement, this._commentComponent, RenderPosition.BEFOREEND);
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
