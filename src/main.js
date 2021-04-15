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
import {render, RenderPosition} from './util';


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
    render(filmDetailsElement, filmInformationComponent.getElement(), RenderPosition.BEFOREEND);
    render(filmDetailsElement, commentComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const removeFilmPopup = () => {
    siteBodyElement.removeChild(filmDetailsComponent.getElement());
    siteBodyElement.classList.remove('hide-overflow');
  };

  filmCardComponent.getElement().querySelector('.film-card__poster').addEventListener('click', (evt) => {
    evt.preventDefault();
    addFilmPopup();
  });
  filmCardComponent.getElement().querySelector('.film-card__title').addEventListener('click', (evt) => {
    evt.preventDefault();
    addFilmPopup();
  });
  filmCardComponent.getElement().querySelector('.film-card__comments').addEventListener('click', (evt) => {
    evt.preventDefault();
    addFilmPopup();
  });

  filmInformationComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    removeFilmPopup();
  });

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new Profile().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenu(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Sort().getElement(), RenderPosition.BEFOREEND);

const filmsComponent = new Films();

render(siteMainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);

const filmsListComponent = new FilmsList();

render(filmsComponent.getElement(), filmsListComponent.getElement(), 'beforeend');

const filmsListContainerElement = filmsListComponent.getElement().querySelector('.films-list__container');

for(let i  = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmsListContainerElement, films[i]);
}
if(films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButton();

  render(filmsListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);


  showMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListContainerElement, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if(renderedFilmCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
    }
  });
}

render(footerElement, new FooterStatistics(films.length).getElement(), 'beforeend');
