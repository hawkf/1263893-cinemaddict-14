import Observer from '../utils/observer';

export default class Movies extends Observer {
  constructor() {
    super();
    this._comment = [];
  }

  set(updateType, comments) {
    this._comments = comments.slice();
    this._notify(updateType);
  }

  get() {
    return this._comments;
  }
}
