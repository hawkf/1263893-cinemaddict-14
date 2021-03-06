import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {FilterType, MenuItem, UpdateType} from '../const.js';
import Filter from '../view/filter';

export default class FilterPresenter {
  constructor(filterContainer, filterModel, moviesModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._menuItemClickHandler = null;
    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._get();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new Filter(filters, this._filterModel.get());

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setMenuItemClickHandler(this._menuItemClickHandler);


    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  setMainMenuClickHandler(callback) {
    this._menuItemClickHandler = callback;
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setMenuItemClickHandler(callback);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    this._filterComponent.setMenuItemClickHandler(this._menuItemClickHandler);
    this._menuItemClickHandler(MenuItem.FILTER);
    if (this._filterModel.get() === filterType) {
      return;
    }

    this._filterModel.set(UpdateType.MAJOR, filterType);
  }

  _get() {
    const films = this._moviesModel.get();

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
