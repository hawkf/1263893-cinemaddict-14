import FilmCard from '../view/film-card';
import FilmDetailsInformation from '../view/film-details-information';
import {render, replace, RenderPosition, remove} from '../utils/render';
import Comment from '../view/comments';
import {UpdateType, UserAction} from '../const';

export default class PopupPresenter {
  constructor(popupContainer, film, changeData, addPopup, removeFilmPopup) {
    this._film = film;
    this._popupContainer = popupContainer;
    this._changeData = changeData;
    this._removeFilmPopup = removeFilmPopup;
    this._filmInformationComponent = null;
    this._addWatchListHandler = this._addWatchListHandler.bind(this);
    this._addIsWatchedHandler = this._addIsWatchedHandler.bind(this);
    this._addIsFavoriteHandler = this._addIsFavoriteHandler.bind(this);
    this._removeFilmPopupHandler = this._removeFilmPopupHandler.bind(this);
  }

  init() {
    const prevFilmInformationComponent = this._filmInformationComponent;
    this._filmInformationComponent = new FilmDetailsInformation(this._film);
    this._filmInformationComponent.setClickHandler(this._removeFilmPopup);
    this._filmInformationComponent.setAddWatchListHandler(this._addWatchListHandler);
    this._filmInformationComponent.setAddIsWatchedHandler(this._addIsWatchedHandler);
    this._filmInformationComponent.setAddIsFavoriteHandler(this._addIsFavoriteHandler);
    this._commentComponent = new Comment(this._film);
    if(prevFilmInformationComponent === null) {
      this._renderFilmPopup();
      return;
    }

    if(document.querySelector('.film-details__inner').contains(prevFilmInformationComponent.getElement())) {
      replace(this._filmInformationComponent, prevFilmInformationComponent);
    }

    remove(prevFilmInformationComponent);

  }

  update(film) {
    this._film = film;
  }

  getFilmId() {
    return this._film.id;
  }

  destroy() {
    remove(this._filmInformationComponent);
  }

  _renderFilmPopup() {
    const filmDetailsElement = document.querySelector('.film-details__inner');
    render(filmDetailsElement, this._filmInformationComponent, RenderPosition.BEFOREEND);
    render(filmDetailsElement, this._commentComponent, RenderPosition.BEFOREEND);
  }

  _addWatchListHandler() {
    this._changeData(
      UserAction.UPDATE_TASK,
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
      UserAction.UPDATE_TASK,
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
      UserAction.UPDATE_TASK,
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

  _removeFilmPopupHandler() {
    this._removeFilmPopup();
  }
}
