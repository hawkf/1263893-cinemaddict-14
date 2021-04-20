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


const FiLM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;


const films = new Array(FiLM_COUNT).fill().map(() => generateFilm());


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const footerElement = document.querySelector('footer');

const renderFilm = (filmListElement, film) => {
  const filmCardComponent = new FilmCard(film);
  const filmInformationComponent = new FilmDetailsInformation(film);
  const commentComponent = new Comment(film);
  const filmDetailsComponent = new FilmDetail();

  const addFilmPopup = () => {
    siteBodyElement.classList.add('hide-overflow');
    siteBodyElement.appendChild(filmDetailsComponent.getElement());
    const filmDetailsElement = document.querySelector('.film-details__inner');
    render(filmDetailsElement, filmInformationComponent, RenderPosition.BEFOREEND);
    render(filmDetailsElement, commentComponent, RenderPosition.BEFOREEND);
  };

  const removeFilmPopup = () => {
    siteBodyElement.removeChild(filmDetailsComponent.getElement());
    siteBodyElement.classList.remove('hide-overflow');
  };

  filmCardComponent.setClickHandler(() => addFilmPopup());

  filmInformationComponent.setClickHandler(() => removeFilmPopup());

  render(filmListElement, filmCardComponent, RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenu(films), RenderPosition.BEFOREEND);
render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);

const filmsComponent = new Films();

render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);

const filmsListComponent = new FilmsList();

render(filmsComponent, filmsListComponent, 'beforeend');

const filmsListContainerElement = filmsListComponent.getElement().querySelector('.films-list__container');

for(let i  = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmsListContainerElement, films[i]);
}
if(films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButton();

  render(filmsListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);


  showMoreButtonComponent.setClickHandler(() => {
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListContainerElement, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if(renderedFilmCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
    }
  });
}

render(footerElement, new FooterStatistics(films.length), 'beforeend');
