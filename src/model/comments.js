import Observer from '../utils/observer';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comment = [];
  }

  set(comments) {
    this._comments = comments.slice();
  }

  get() {
    return this._comments;
  }
}
