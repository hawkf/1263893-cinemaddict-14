import SiteMenu from './view/site-menu';
import Sort from './view/sort';
import Films from './view/films';
import FilmsList from './view/films-list';
import FilmCard from './view/film-card';
import Profile from './view/profile';
import ShowMoreButton from './view/show-more-button';
import FooterStatistics from './view/footer-statistics';
import FilmDetail from './view/film-details';
import FilmDetailsInformation from './view/film-details-information';
import Comment from './view/comments';
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
