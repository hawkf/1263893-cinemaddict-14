import {getRandomArrayElement, getRandomFloat,  getRandomInteger, shuffle} from './util';
import {getComment} from './comment';


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
const runtimes = ['30m', '1h 10m', '1h'];
const years = ['2000', '1999', '2021', '2011'];

export const generateFilm = () => {
  const commentsCount = getRandomInteger(0, 5);
  return {
    title: generateTitle(),
    poster:  generatePoster(),
    rating: getRandomFloat(0, 10).toFixed(1),
    year: getRandomArrayElement(years),
    description: getDescription(),
    comment: new Array(commentsCount).fill().map(() => getComment()),
    commentsCount: commentsCount,
    genre: getRandomArrayElement(genres),
    duration: getRandomArrayElement(runtimes),
  };
};
