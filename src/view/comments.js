import dayjs from 'dayjs';
import Smart from './smart';
import {isCtrlEnterKey} from '../utils/common';
import he from 'he';

const SHAKE_ANIMATION_TIMEOUT = 600;

const createCommentsTemplate = (dataState) => {
  const EMOJIS_LIST = ['smile', 'sleeping', 'puke', 'angry'];
  const {comments, newEmoji, newEmojiText, isSaving, isDeleting, deletingCommentId} = dataState;

  const createCommentListTemplate = (commetsArray, isDeleting) => {
    return commetsArray.map((comment) => `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/MM/DD hh:mm')}</span>
                <button class="film-details__comment-delete" data-comment-id=${comment.id} ${isDeleting && comment.id === deletingCommentId ? 'disabled' : ''}>${isDeleting && comment.id === deletingCommentId ? 'Deleting...' : 'Delete'}</button>
              </p>
            </div>
          </li>`).join('');
  };

  const creteEmojiTemplate = (emojisArray, isSaving) => {
    return emojisArray.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value=${emoji} ${isSaving ? 'disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-${emoji}">
              <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
            </label>`).join('');
  };

  const getNewEmoji = (emoji) => {
    if(emoji === null){
      return '';
    }

    return `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji">`;
  };

  const commentElement = createCommentListTemplate(comments, isDeleting);

  return `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${dataState.comments.length}</span></h3>

        <ul class="film-details__comments-list">${commentElement}</ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${getNewEmoji(newEmoji)}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isSaving ? 'disabled' : ''}>${he.encode(newEmojiText)}</textarea>
          </label>

          <div class="film-details__emoji-list">${creteEmojiTemplate(EMOJIS_LIST, isSaving)}</div>
        </div>
      </section>
    </div>`;
};

export default class Comment extends Smart {
  constructor(comments) {
    super();
    this._dataState = Comment.parseCommentToData(comments);
    this._addNewEmojiHandler = this._addNewEmojiHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._commentDelateHandler = this._commentDelateHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createCommentsTemplate(this._dataState);
  }

  static parseCommentToData(comments) {
    return Object.assign(
      {},
      {
        comments: comments,
      },
      {
        newEmoji: null,
        newEmojiText: '',
        isSaving: false,
        isDeleting: false,
        deletingCommentId: null,
      },
    );
  }

  static parseDataToNewComment(data) {
    return {
      comment: data.newEmojiText,
      emotion: data.newEmoji,
    };
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    document.addEventListener('keydown', this._formSubmitHandler);
  }

  removeFormSubmitHandler() {
    document.removeEventListener('keydown', this._formSubmitHandler);
  }

  setCommentDelateHandler(callback) {
    this._callback.commentDelate = callback;
    const delateButtons = this.getElement().querySelectorAll('.film-details__comment-delete');
    delateButtons.forEach((element) => {
      element.addEventListener('click', this._commentDelateHandler);
    });
  }

  shakeForm(callback) {
    this.getElement().querySelector('.film-details__new-comment').style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().querySelector('.film-details__new-comment').style.animation = '';
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shakeComment(callback, deletingCommentId) {
    const deletingElement = Array.from(this.getElement().querySelectorAll('.film-details__comment')).find((element) => {
      return element.querySelector('.film-details__comment-delete').dataset.commentId === deletingCommentId;
    });
    deletingElement.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      deletingElement.style.animation = '';
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll('.film-details__emoji-item')
      .forEach((element) => {
        element.addEventListener('change', this._addNewEmojiHandler);
      });
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._commentInputHandler);
  }

  _addNewEmojiHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newEmoji: `${evt.target.value}`,
    });
  }

  _commentInputHandler(evt) {
    debugger;
    this.updateData({
      newEmojiText: evt.target.value,
    }, true);
  }

  _formSubmitHandler(evt) {
    if (isCtrlEnterKey(evt)) {
      evt.preventDefault();
      if (this._dataState.newEmoji === null || this._dataState.newEmojiText === '') {
        return;
      }
      this._callback.formSubmit(Comment.parseDataToNewComment(this._dataState));
    }
  }

  _commentDelateHandler(evt) {
    evt.preventDefault();
    this._callback.commentDelate(evt.target.dataset.commentId);
  }
}
