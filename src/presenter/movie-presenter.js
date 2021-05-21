import FilmCard from '../view/film-card';
import {render, replace, RenderPosition, remove} from '../utils/render';
import {UpdateType, UserAction} from '../const';
import PopupPresenter from './popup';

export default class MoviePresenter {
  constructor(filmListElement, popupContainer, changeData, addPopup, removeFilmPopup) {
    this._filmListElement = filmListElement;
    this._popupContainer = popupContainer;
    this._changeData = changeData;
    this._addPopup = addPopup;
    this._removeFilmPopup = removeFilmPopup;
    this._filmCardComponent  = null;
    this._addFilmPopup = this._addFilmPopup.bind(this);
    this._addWatchListHandler = this._addWatchListHandler.bind(this);
    this._addIsWatchedHandler = this._addIsWatchedHandler.bind(this);
    this._addIsFavoriteHandler = this._addIsFavoriteHandler.bind(this);
  }

  init(film) {
    const prevMovieComponent = this._filmCardComponent;
    this._film = film;
    this._filmCardComponent = new FilmCard(this._film);
    this._filmCardComponent.setClickHandler(this._addPopup);
    this._filmCardComponent.setAddWatchListHandler(this._addWatchListHandler);
    this._filmCardComponent.setAddIsWatchedHandler(this._addIsWatchedHandler);
    this._filmCardComponent.setAddIsFavoriteHandler(this._addIsFavoriteHandler);
    if(prevMovieComponent === null) {
      render(this._filmListElement, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }


    if(this._filmListElement.contains(prevMovieComponent.getElement())) {
      replace(this._filmCardComponent, prevMovieComponent);
    }

    remove(prevMovieComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _addFilmPopup() {
    const filmInformation = new PopupPresenter(this._popupContainer, this._changeData, this._removeFilmPopup);
    this._addPopup();
    filmInformation.init(this._film);
  }

  _addWatchListHandler() {
    this._changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
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
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
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
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
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
