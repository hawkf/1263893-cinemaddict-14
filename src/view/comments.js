import dayjs from 'dayjs';
import Smart from './smart';


const createCommentsTemplate = (data) => {
  const {commentsCount, comments, newEmoji, newEmojiText} = data;

  const createCommentTemplate = (commetsArray) => {
    return commetsArray.map((comment) => `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src=${comment.emoji} width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.autor}</span>
                <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/MM/DD hh:mm')}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`).join('');
  };

  const getNewEmoji = (emoji) => {
    if(emoji === ''){
      return '';
    }

    return `
            <img src=${emoji} width="55" height="55" alt="emoji">`;
  };

  const commentElement = createCommentTemplate(comments);

  return `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

        <ul class="film-details__comments-list">${commentElement}</ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${getNewEmoji(newEmoji)}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newEmojiText}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label test" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>`;
};

export default class Comment extends Smart {
  constructor(film) {
    super();
    this._data = Comment.parseFilmToData(film);
    this._addNewEmojiHandler = this._addNewEmojiHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createCommentsTemplate(this._data);
  }

  static parseFilmToData(film) {
    return Object.assign(
      {},
      film,
      {
        newEmoji: '',
        newEmojiText: '',
      },
    );
  }

  static parseDataToFilm(data) {
    return Object.assign(
      {},
      data,
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll('.film-details__emoji-label img')
      .forEach((element) => {
        element.addEventListener('click', this._addNewEmojiHandler);
      });
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._commentInputHandler);
  }

  _addNewEmojiHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newEmoji: evt.target.attributes.src.nodeValue,
    });

    const inputId = evt.target.parentElement.attributes.for.nodeValue;

    this.getElement().querySelector('#' + inputId).setAttribute('checked', true);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newEmojiText: evt.target.value,
    }, true);
  }
}
