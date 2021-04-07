import {getRandomArrayElement, getRandomFloat,  getRandomInteger, shuffle} from './util';

const autors = ['Jack', 'Mike', 'Suzan', 'Bob', 'Peter'];
const texts = ['Great movie. A rare topic.' , 'I haven\'t seen such a talented acting for a long time.', 'Thanks for the film to all its creators!'];
const randomDate = (start, end) => {
  return new Date(start.getTime()
    + Math.random() * (end.getTime() - start.getTime()));
};

const emojis = ['.markup/images/emoji/smile.png', '.markup/images/emoji/sleeping.png', '.markup/images/emoji/puke.png', '.markup/images/emoji/angry.png' ];

export const getComment = () => {
  return {
    autor: getRandomArrayElement(autors),
    text: getRandomArrayElement(texts),
    emoji: getRandomArrayElement(emojis),
    date: randomDate(new Date(2012, 0, 1), new Date()),
  };
};
