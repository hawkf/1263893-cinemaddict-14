import Profile from './view/profile';
import FooterStatistics from './view/footer-statistics';
import {generateFilm} from './mock/film';
import {render, RenderPosition} from './utils/render';
import MovieList from './presenter/movie-list';


const FiLM_COUNT = 20;

const films = new Array(FiLM_COUNT).fill().map(() => generateFilm());


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const footerElement = document.querySelector('footer');

const movieList = new MovieList(siteMainElement, siteBodyElement);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);

movieList.init(films);
render(footerElement, new FooterStatistics(films.length), 'beforeend');
