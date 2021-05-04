import {AbstractView} from './abstract';

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._dataState = {};
  }

  updateData(updateData, justDataUpdating) {
    if (!updateData) {
      return;
    }

    this._dataState = Object.assign(
      {},
      this._dataState,
      updateData,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
