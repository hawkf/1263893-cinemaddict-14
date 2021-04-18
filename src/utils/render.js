import {AbstractView} from '../view/abstract';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};
const render = (container, template, place) => {
  if(container instanceof AbstractView) {
    container = container.getElement();
  }

  if(template instanceof AbstractView) {
    template = template.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(template);
      break;
    case RenderPosition.BEFOREEND:
      container.append(template);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};
export {createElement};
export {render};
export {RenderPosition};
