import {getRandomArrayElement, getRandomFloat,  getRandomInteger, shuffle} from '../util';
import {getComment} from './comment';
import dayjs from 'dayjs';


const titles = ['The man with golden arm', 'Spider man', 'Sherlock Holms', 'Mister Robinzon'];

const  generateTitle  = () => {
  return getRandomArrayElement(titles);
};

const posters = ['./images/posters/made-for-each-other.png', './images/posters/popeye-meets-sinbad.png', './images/posters/sagebrush-trail.jpg'];

const generatePoster = () => {
  return getRandomArrayElement(posters);
};

const descriptions  = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];

const getDescription = () => {
  const length = getRandomInteger(1, 5);
  const resultDescriptions = shuffle(descriptions.slice()).slice(0, length + 1);
  return resultDescriptions.join(' ');
};

const genres = ['Drama', 'Film-Noir', 'Mystery'];

const getGenres = () => {
  const length = getRandomInteger(1, 3);
  const resultGenres = shuffle(genres.slice()).slice(0, length + 1);
  return resultGenres;
};

const runtimes = ['30m', '1h 10m', '1h'];
const years = ['2000', '1999', '2021', '2011'];
const ages = ['12', '16', '18+'];
const directors = ['Anthony Mann', 'Robert Anro', 'Sain Bell'];
const writers = ['Anne Wigton', 'Heinz Herald', 'Richard Weil', 'Chris Abani', 'Chinua Achebe', 'Abimbola Adelakun', 'Akin Adesokan' ];

const getWriters = () => {
  const length = getRandomInteger(2, 7);
  const resultDescriptions = shuffle(writers.slice()).slice(0, length + 1);
  return resultDescriptions.join(' ');
};

const actors = ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea', 'Hiam Abbass', 'Becky Ann Baker', 'Bill Camp', 'Jennifer Coolidge', 'Dale Dickey'];

const getActors = () => {
  const length = getRandomInteger(3, 8);
  const resultDescriptions = shuffle(actors.slice()).slice(0, length + 1);
  return resultDescriptions.join(' ');
};

const generateReleaseDate = () => {
  const dayGap = getRandomInteger(-1000, -1);

  const date = dayjs().add(dayGap, 'day').toDate();
  return date;
};

const countrys = ['USA', 'Russia', 'FRG'];

export const generateFilm = () => {
  const commentsCount = getRandomInteger(0, 5);
  return {
    title: generateTitle(),
    poster:  generatePoster(),
    rating: getRandomFloat(0, 10).toFixed(1),
    year: getRandomArrayElement(years),
    description: getDescription(),
    comments: new Array(commentsCount).fill().map(() => getComment()),
    commentsCount: commentsCount,
    genres: getGenres(),
    duration: getRandomArrayElement(runtimes),
    age: getRandomArrayElement(ages),
    director: getRandomArrayElement(directors),
    writers: getWriters(),
    actors: getActors(),
    releaseDate: generateReleaseDate(),
    country: getRandomArrayElement(countrys),
    watchList: Boolean(getRandomInteger(0,1)),
    isWatched: Boolean(getRandomInteger(0,1)),
    isFavorite: Boolean(getRandomInteger(0,1)),
  };
};
