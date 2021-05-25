import {AbstractView} from './abstract';
import {FilterType, MenuItem} from '../const';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `<a
            href="#${type}"
            class="main-navigation__item ${currentFilterType === type ? 'main-navigation__item--active' : ''}"
            data-filter-type=${type}>
            ${name}${type === FilterType.ALL ? '' : `<span class="main-navigation__item-count" data-filter-type=${type}>${count}`}</span></a>`;
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._menuItemClickHandler = this._menuItemClickHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((element) => {
      element.addEventListener('click', this._filterTypeChangeHandler);
    });
  }

  setMenuItemClickHandler(callback)
  {
    this._callback.menuItemClick = callback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((element) => {
      element.addEventListener('click', this._menuItemClickHandler);
    });
    this.getElement().querySelector('.main-navigation__additional').addEventListener('click', this._menuItemClickHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  _menuItemClickHandler(evt) {
    evt.preventDefault();
    if(evt.target.classList.contains('main-navigation__item')) {
      this.getElement().querySelector('.main-navigation__item--active').classList.remove('main-navigation__item--active');
      evt.target.classList.add('main-navigation__item--active');
      this._callback.menuItemClick(MenuItem.FILTER);
    } else if (evt.target.classList.contains('main-navigation__additional')) {
      this.getElement().querySelector('.main-navigation__item--active').classList.remove('main-navigation__item--active');
      evt.target.classList.add('main-navigation__item--active');
      this._callback.menuItemClick(MenuItem.STATISTICS);
    }
  }
}
