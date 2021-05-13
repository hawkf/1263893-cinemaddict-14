import Profile from './view/profile';
import FooterStatistics from './view/footer-statistics';
import {generateFilm} from './mock/film';
import {render, RenderPosition} from './utils/render';
import MovieList from './presenter/movie-list';
import Movies from './model/movies';
import Filter from './model/filter';


const FiLM_COUNT = 20;

const films = new Array(FiLM_COUNT).fill().map(() => generateFilm());

const moviesModel = new Movies();
moviesModel.setMovies(films);

const filterModel = new Filter();


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const footerElement = document.querySelector('footer');

const movieList = new MovieList(siteMainElement, siteBodyElement, moviesModel);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);

movieList.init(films);
render(footerElement, new FooterStatistics(films.length), 'beforeend');
