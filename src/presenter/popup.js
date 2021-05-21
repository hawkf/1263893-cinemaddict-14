import FilmDetailsInformation from '../view/film-details-information';
import {render, replace, RenderPosition, remove} from '../utils/render';
import Comment from '../view/comments';
import {UpdateType, UserAction} from '../const';

export default class PopupPresenter {
  constructor(film, changeData, removeFilmPopup) {
    this._film = film;
    this._comments = null;
    this._changeData = changeData;
    this._removeFilmPopup = removeFilmPopup;
    this._filmInformationComponent = null;
    this._commentComponent = null;
    this._filmDetailsComponent = null;
    this._addWatchListHandler = this._addWatchListHandler.bind(this);
    this._addIsWatchedHandler = this._addIsWatchedHandler.bind(this);
    this._addIsFavoriteHandler = this._addIsFavoriteHandler.bind(this);
    this._removeFilmPopupHandler = this._removeFilmPopupHandler.bind(this);
    this._addCommentHandler = this._addCommentHandler.bind(this);
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
  }

  init(filmDetailsComponent, comments) {
    this._comments = comments;
    const prevFilmInformationComponent = this._filmInformationComponent;
    const prevCommentComponent = this._commentComponent;
    this._filmDetailsComponent = filmDetailsComponent;
    this._filmInformationComponent = new FilmDetailsInformation(this._film);
    this._filmInformationComponent.setClickHandler(this._removeFilmPopup);
    this._filmInformationComponent.setAddWatchListHandler(this._addWatchListHandler);
    this._filmInformationComponent.setAddIsWatchedHandler(this._addIsWatchedHandler);
    this._filmInformationComponent.setAddIsFavoriteHandler(this._addIsFavoriteHandler);
    this._commentComponent = new Comment(this._comments);
    this._commentComponent.setFormSubmitHandler(this._addCommentHandler);
    this._commentComponent.setCommentDelateHandler(this._deleteCommentHandler);
    if (prevFilmInformationComponent === null) {
      this._renderFilmPopup();
      return;
    }

    if(this._filmDetailsComponent.getElement().querySelector('.film-details__inner').contains(prevFilmInformationComponent.getElement())) {
      replace(this._filmInformationComponent, prevFilmInformationComponent);
      replace(this._commentComponent, prevCommentComponent);
    } else {
      this._renderFilmPopup();
    }
    prevCommentComponent.removeFormSubmitHandler();
    remove(prevFilmInformationComponent);
    remove(prevCommentComponent);

  }

  update(film) {
    this._film = film;
  }

  getFilmId() {
    return this._film.id;
  }

  setSaving() {
    this._commentComponent.updateData({
      isSaving: true,
    });
  }

  setDeleting(commentId) {
    this._commentComponent.updateData({
      isDeleting: true,
      deletingCommentId: commentId,
    });
  }

  resetFormState() {
    this._commentComponent.shakeForm(() => {
      this._commentComponent.updateData({
        isSaving: false,
        newEmoji: null,
        newEmojiText: '',
      });
    });
  }

  resetDeleteState(commentId) {
    this._commentComponent.shakeComment(() => {
      this._commentComponent.updateData({
        isDeleting: false,
      });
    }, commentId);
  }

  _renderFilmPopup() {
    const filmDetailsElement = document.querySelector('.film-details__inner');
    render(filmDetailsElement, this._filmInformationComponent, RenderPosition.BEFOREEND);
    render(filmDetailsElement, this._commentComponent, RenderPosition.BEFOREEND);
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

  _removeFilmPopupHandler() {
    this._removeFilmPopup();
  }

  _addCommentHandler(newComment) {
    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.MINOR,
      Object.assign(
        {},
        {
          comment: newComment,
        },
        {
          filmId: this._film.id,
        },
      ),
    );
  }

  _deleteCommentHandler(commentId) {
    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.MINOR,
      Object.assign(
        {},
        {
          commentId: commentId,
        },
        {
          filmId: this._film.id,
        },
      ),
    );
  }
}
