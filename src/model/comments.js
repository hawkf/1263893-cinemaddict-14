import Observer from '../utils/observer';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  set(comments) {
    this._comments = comments.slice();
  }

  get() {
    return this._comments;
  }

  delete(commentId) {
    this._comments = this._comments.filter((comment) => comment.id !== commentId);
  }
}
