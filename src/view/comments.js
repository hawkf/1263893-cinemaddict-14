import dayjs from 'dayjs';
import Smart from './smart';


const createCommentsTemplate = (dataState) => {
  const EMOJIS_LIST = ['smile', 'sleeping', 'puke', 'angry'];
  const {commentsCount, comments, newEmoji, newEmojiText} = dataState;

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

  const creteEmojiTemplate = (emojisArray) => {
    return emojisArray.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value=${emoji}>
            <label class="film-details__emoji-label" for="emoji-${emoji}">
              <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
            </label>`).join('');
  };

  const getNewEmoji = (emoji) => {
    if(emoji === null){
      return '';
    }

    return `<img src=${emoji} width="55" height="55" alt="emoji">`;
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

          <div class="film-details__emoji-list">${creteEmojiTemplate(EMOJIS_LIST)}</div>
        </div>
      </section>
    </div>`;
};

export default class Comment extends Smart {
  constructor(film) {
    super();
    this._dataState = Comment.parseFilmToData(film);
    this._addNewEmojiHandler = this._addNewEmojiHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createCommentsTemplate(this._dataState);
  }

  static parseFilmToData(film) {
    return Object.assign(
      {},
      film,
      {
        newEmoji: null,
        newEmojiText: '',
      },
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
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
      newEmoji: `./images/emoji/${evt.target.value}.png`,
    });
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newEmojiText: evt.target.value,
    }, true);
  }
}
