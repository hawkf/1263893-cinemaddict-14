import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomIndex = (array) => {
  return getRandomInteger(0, array.length - 1);
};

const getRandomArrayElement = (array) => {
  return array[getRandomIndex(array)];
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const humanizeFilmRealeaseDate = (date) => {
  return dayjs(date).format('DD MMMM YYYY');
};

export {getRandomInteger, getRandomArrayElement, getRandomFloat, shuffle, getRandomIndex, humanizeFilmRealeaseDate};
