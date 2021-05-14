import Profile from './view/profile';
import FooterStatistics from './view/footer-statistics';
import {generateFilm} from './mock/film';
import {render, RenderPosition} from './utils/render';
import MovieListPresenter from './presenter/movie-list-presenter';
import Movies from './model/movies';
import Filter from './model/filter';
import FilterPresenter from './presenter/filter-presenter';


const FiLM_COUNT = 1;

const films = new Array(FiLM_COUNT).fill().map(() => generateFilm());

const moviesModel = new Movies();
moviesModel.set(films);

const filterModel = new Filter();


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const footerElement = document.querySelector('footer');

const movieListPresenter = new MovieListPresenter(siteMainElement, siteBodyElement, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);

filterPresenter.init();
movieListPresenter.init(films);

render(footerElement, new FooterStatistics(films.length), 'beforeend');
