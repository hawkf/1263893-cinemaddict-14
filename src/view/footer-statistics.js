import {createElement} from '../util';

const createFooterStatisticsTemplate = (filmsNumber) => {
  return `<section class="footer__statistics">
    <p>${filmsNumber} movies inside</p>
  </section>`;
};

export default class FooterStatistics {
  constructor(filmsNumber) {
    this._element = null;
    this._filmsNumber = filmsNumber;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsNumber);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
