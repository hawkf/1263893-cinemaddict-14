const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getRandomFloat = (min, max) => Math.random() * (max - min) + min;
const getRandomIndex = (array) => getRandomInteger(0, array.length - 1);
const getRandomArrayElement = (array) => array[getRandomIndex(array)];
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
export {shuffle};
export {getRandomArrayElement};
export {getRandomIndex};
export {getRandomFloat};
export {getRandomInteger};
