import Profile from './view/profile';
import {render, RenderPosition} from './utils/render';
import MovieListPresenter from './presenter/movie-list-presenter';
import Movies from './model/movies';
import Filter from './model/filter';
import FilterPresenter from './presenter/filter-presenter';
import Stats from './view/stats';
import FooterStatistics from './view/footer-statistics';
import {MenuItem, UpdateType} from './const';
import Api from './api';
import Comments from './model/comments';

const AUTHORIZATION = 'Basic Agromat20.';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);
const filterModel = new Filter();


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const footerElement = document.querySelector('footer');


const moviesModel = new Movies();
const commentsModel = new Comments();
const movieListPresenter = new MovieListPresenter(siteMainElement, siteBodyElement, moviesModel, commentsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

let statisticsElement = null;

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


render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);



api.getMovies()
  .then((movies) => {
    moviesModel.set(UpdateType.INIT, movies);
    statisticsElement = new Stats(moviesModel.get());
    console.log(moviesModel.get());
    render(siteMainElement, statisticsElement, RenderPosition.BEFOREEND);
    filterPresenter.setMainMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    moviesModel.set(UpdateType.INIT, []);
    filterPresenter.setMainMenuClickHandler(handleSiteMenuClick);
  });
filterPresenter.init();
movieListPresenter.init();

render(footerElement, new FooterStatistics(20), 'beforeend');
