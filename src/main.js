import Profile from './view/profile';
import FooterStatistics from './view/footer-statistics';
import {generateFilm} from './mock/film';
import {render, RenderPosition} from './utils/render';
import MovieListPresenter from './presenter/movie-list-presenter';
import Movies from './model/movies';
import Filter from './model/filter';
import FilterPresenter from './presenter/filter-presenter';
import Stats from './view/stats';
import {MenuItem} from './const';


const FiLM_COUNT = 20;

const films = new Array(FiLM_COUNT).fill().map(() => generateFilm());

const moviesModel = new Movies();
moviesModel.set(films);

const filterModel = new Filter();


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const footerElement = document.querySelector('footer');
const statisticsElement = new Stats();


const movieListPresenter = new MovieListPresenter(siteMainElement, siteBodyElement, moviesModel, filterModel);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.STATISTICS :
      statisticsElement.show();
      movieListPresenter.hide();
      break;
    case MenuItem.FILTER:
      statisticsElement.hide();
      movieListPresenter.show();
  }
};

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel, handleSiteMenuClick);

render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);

filterPresenter.init();
movieListPresenter.init();

render(siteMainElement, statisticsElement, RenderPosition.BEFOREEND);

render(footerElement, new FooterStatistics(films.length), 'beforeend');
