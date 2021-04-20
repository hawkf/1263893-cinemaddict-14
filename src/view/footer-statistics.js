import {AbstractView} from './abstract';

const createFooterStatisticsTemplate = (filmsNumber) => {
  return `<section class="footer__statistics">
    <p>${filmsNumber} movies inside</p>
  </section>`;
};

export default class FooterStatistics extends AbstractView {
  constructor(filmsNumber) {
    super();
    this._filmsNumber = filmsNumber;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsNumber);
  }
}
