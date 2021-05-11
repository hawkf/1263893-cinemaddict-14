import {AbstractView} from './abstract';
import {SortType} from '../const.js';

const createSortTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type=${SortType.DEFAULT}>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SortType.DATE}>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SortType.RATING}>Sort by rating</a></li>
  </ul>`;
};

export default class Sort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this.getElement().querySelector('.sort__button--active').classList.toggle('sort__button--active');
    evt.target.classList.toggle('sort__button--active');
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
