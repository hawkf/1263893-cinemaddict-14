import {createSiteMenuTemplate} from './view/site-menu';
import {createSortTemplate} from './view/sort';
import {createFilmsTemplate} from './view/films';
import {createFilmsListTemplate} from './view/films-list';
import {createFilmCardTemplate} from './view/film-card';
import {createProfileTemplate} from './view/profile';
import {createShowMoreButtonTemplate} from './view/show-more-button';
import {createFooterStatisticsTemplate} from './view/footer-statistics';
import {createFilmDetailTemplate} from './view/film-details';
import {createFilmDetailsInformationTemplate} from './view/film-details-information';
import {createCommentsTemplate} from './view/comments';
import {generateFilm} from './mock/film';


const FiLM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const films = new Array(FiLM_COUNT).fill().map(() => generateFilm());


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const footerElement = document.querySelector('footer');

render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(films), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');

const filmsElement = document.querySelector('.films');
render(filmsElement, createFilmsListTemplate(), 'beforeend');

const filmsListElement = filmsElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for(let i  = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsListContainerElement, createFilmCardTemplate(films[i]), 'beforeend');
}
if(films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  render(filmsListElement, createShowMoreButtonTemplate(), 'beforeend');

  const loadMoreButton = filmsListElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), 'beforeend'));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if(renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}


render(siteBodyElement, createFilmDetailTemplate(), 'beforeend');

const filmDetailsElement = document.querySelector('.film-details__inner');

render(filmDetailsElement, createFilmDetailsInformationTemplate(films[0]), 'beforeend');
render(filmDetailsElement, createCommentsTemplate(films[0]), 'beforeend');


render(footerElement, createFooterStatisticsTemplate(films.length), 'beforeend');
