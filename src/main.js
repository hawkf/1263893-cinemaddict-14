import SiteMenu from './view/site-menu';
import {createSortTemplate} from './view/sort';
import {createFilmsTemplate} from './view/films';
import {createFilmsListTemplate} from './view/films-list';
import FilmCard from './view/film-card';
import Profile from './view/profile';
import {createShowMoreButtonTemplate} from './view/show-more-button';
import {createFooterStatisticsTemplate} from './view/footer-statistics';
import {createFilmDetailTemplate} from './view/film-details';
import {createFilmDetailsInformationTemplate} from './view/film-details-information';
import {createCommentsTemplate} from './view/comments';
import {generateFilm} from './mock/film';
import {renderTemplate, renderElement, RenderPosition} from './util';


const FiLM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;


const films = new Array(FiLM_COUNT).fill().map(() => generateFilm());


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const footerElement = document.querySelector('footer');

renderElement(siteHeaderElement, new Profile().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenu(films).getElement(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), 'beforeend');
renderTemplate(siteMainElement, createFilmsTemplate(), 'beforeend');

const filmsElement = document.querySelector('.films');
renderTemplate(filmsElement, createFilmsListTemplate(), 'beforeend');

const filmsListElement = filmsElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for(let i  = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderElement(filmsListContainerElement, new FilmCard(films[i]).getElement(), RenderPosition.BEFOREEND);
}
if(films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  renderTemplate(filmsListElement, createShowMoreButtonTemplate(), 'beforeend');

  const loadMoreButton = filmsListElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmsListContainerElement, createFilmCardTemplate(film), 'beforeend'));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if(renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}


//renderTemplate(siteBodyElement, createFilmDetailTemplate(), 'beforeend');

//const filmDetailsElement = document.querySelector('.film-details__inner');

//renderTemplate(filmDetailsElement, createFilmDetailsInformationTemplate(films[0]), 'beforeend');
//renderTemplate(filmDetailsElement, createCommentsTemplate(films[0]), 'beforeend');


//renderTemplate(footerElement, createFooterStatisticsTemplate(films.length), 'beforeend');
