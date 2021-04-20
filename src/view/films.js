import {AbstractView} from './abstract';

const createFilmsTemplate = () => {
  // eslint-disable-next-line quotes
  return  `<section class="films"></section>`;
};

export default class Films extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }
}
