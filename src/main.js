import {createSiteMenuTemplate} from './view/site-menu';
import {createSortTemplate} from './view/sort';
import {createFilmsTemplate} from './view/films';
import {createFilmsListTemplate} from './view/films-list';
import {createFilmCardTemplate} from './view/film-card';
import {createProfileTemplate} from './view/profile';
import {createTopRatedFilmsTemplate} from './view/top-rated-films';
import {createMostCommentedFilmsTemplate} from './view/most-commented-films';
import {createShowMoreButtonTemplate} from './view/show-more-button';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');

const filmsElement = document.querySelector('.films');
render(filmsElement, createFilmsListTemplate(), 'beforeend');

const filmsListElement = filmsElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for(let i  = 0; i < 5; i++) {
  render(filmsListContainerElement, createFilmCardTemplate(), 'beforeend');
}

render(filmsListElement, createShowMoreButtonTemplate(), 'beforeend');
render(filmsElement, createTopRatedFilmsTemplate(), 'beforeend');
render(filmsElement, createMostCommentedFilmsTemplate(), 'beforeend');

const extraFilms = filmsElement.querySelectorAll('.films-list--extra');

const topRatedFilmsListContainer = extraFilms[0].querySelector('.films-list__container');

for (let i = 0; i < 2; i++) {
  render(topRatedFilmsListContainer, createFilmCardTemplate(), 'beforeend');
}

const mostCommentedFilmsListContainer = extraFilms[1].querySelector('.films-list__container');

for (let i = 0; i < 2; i++) {
  render(mostCommentedFilmsListContainer, createFilmCardTemplate(), 'beforeend');
}
