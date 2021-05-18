import {getComment} from './comment';
import dayjs from 'dayjs';
import {getRandomArrayElement, getRandomFloat, getRandomInteger, shuffle} from '../utils/common';
import {nanoid} from 'nanoid';


const TITLES = ['The man with golden arm', 'Spider man', 'Sherlock Holms', 'Mister Robinzon'];
const POSTERS = ['./images/posters/made-for-each-other.png', './images/posters/popeye-meets-sinbad.png', './images/posters/sagebrush-trail.jpg'];
const DESCRIPTIONS  = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
const GENRES = ['Drama', 'Film-Noir', 'Mystery'];
const runtimes = ['30m', '1h 10m', '1h'];
const YEARS = ['2000', '1999', '2021', '2011'];
const AGES = ['12', '16', '18+'];
const DIRECTORS = ['Anthony Mann', 'Robert Anro', 'Sain Bell'];
const WRITERS = ['Anne Wigton', 'Heinz Herald', 'Richard Weil', 'Chris Abani', 'Chinua Achebe', 'Abimbola Adelakun', 'Akin Adesokan' ];
const ACTORS = ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea', 'Hiam Abbass', 'Becky Ann Baker', 'Bill Camp', 'Jennifer Coolidge', 'Dale Dickey'];
const COUNTRIES = ['USA', 'Russia', 'FRG'];

const СharactersEnum = {
  ACTORS_MIN: 3,
  ACTORS_MAX: 8,
  WRITERS_MIN: 2,
  WRITERS_MAX: 7,
};

const getDescription = () => {
  const length = getRandomInteger(1, 5);
  const resultDescriptions = shuffle(DESCRIPTIONS.slice()).slice(0, length + 1);
  return resultDescriptions.join(' ');
};

const getGenres = () => {
  const length = getRandomInteger(1, 3);
  const resultGenres = shuffle(GENRES.slice()).slice(0, length + 1);
  return resultGenres;
};

const getWriters = () => {
  const length = getRandomInteger(СharactersEnum.WRITERS_MIN, СharactersEnum.WRITERS_MAX);
  const resultDescriptions = shuffle(WRITERS.slice()).slice(0, length + 1);
  return resultDescriptions.join(' ');
};

const getActors = () => {
  const length = getRandomInteger(СharactersEnum.ACTORS_MIN, СharactersEnum.ACTORS_MAX);
  const resultDescriptions = shuffle(ACTORS.slice()).slice(0, length + 1);
  return resultDescriptions.join(' ');
};

const generateReleaseDate = () => {
  const dayGap = getRandomInteger(-1000, -1);

  const date = dayjs().add(dayGap, 'day').toDate();
  return date;
};

export const generateFilm = () => {
  const commentsCount = getRandomInteger(0, 5);
  return {
    id: nanoid(),
    title: getRandomArrayElement(TITLES),
    poster:  getRandomArrayElement(POSTERS),
    rating: getRandomFloat(0, 10).toFixed(1),
    year: getRandomArrayElement(YEARS),
    description: getDescription(),
    comments: new Array(commentsCount).fill().map(() => getComment()),
    //commentsCount: commentsCount,
    genres: getGenres(),
    duration: getRandomArrayElement(runtimes),
    age: getRandomArrayElement(AGES),
    director: getRandomArrayElement(DIRECTORS),
    writers: getWriters(),
    actors: getActors(),
    releaseDate: generateReleaseDate(),
    country: getRandomArrayElement(COUNTRIES),
    watchList: Boolean(getRandomInteger(0,1)),
    isWatched: Boolean(getRandomInteger(0,1)),
    isFavorite: Boolean(getRandomInteger(0,1)),
  };
};
