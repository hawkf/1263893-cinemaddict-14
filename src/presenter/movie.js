import FilmCard from '../view/film-card';
import FilmDetailsInformation from '../view/film-details-information';
import FilmDetail from '../view/film-details';
import {render, RenderPosition} from '../utils/render';

export default class Movie {
  constructor(filmListElement, popupContainer) {
    this._filmListElement = filmListElement;
    this._popupContainer = popupContainer;
    this._filmDetailsComponent = new FilmDetail();
    this._setFilmCardClickHandler = this._setFilmCardClickHandler.bind(this);
    this._setFilmInformationClickHandler = this._setFilmInformationClickHandler.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmCardComponent = new FilmCard(this._film);
    this._filmInformationComponent = new FilmDetailsInformation(this._film);
    this._commentComponent = new Comment(this._film);
    this._renderFilm();
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

  _renderFilm () {
    render(this._filmListElement, this._filmCardComponent, RenderPosition.BEFOREEND);
    this._setFilmCardClickHandler();
  }
}
