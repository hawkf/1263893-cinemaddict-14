import {getRandomArrayElement, getRandomInteger} from '../util';
import dayjs from 'dayjs';

const autors = ['Jack', 'Mike', 'Suzan', 'Bob', 'Peter'];
const texts = ['Great movie. A rare topic.' , 'I haven\'t seen such a talented acting for a long time.', 'Thanks for the film to all its creators!'];

const emojis = ['./images/emoji/smile.png', './images/emoji/sleeping.png', './images/emoji/puke.png', './images/emoji/angry.png' ];

const generateCommentDate = () => {
  const dayGap = getRandomInteger(-10000000, 1000000);

  const date = dayjs().add(dayGap, 'second').toDate();
  return date;
};

export const getComment = () => {
  return {
    autor: getRandomArrayElement(autors),
    text: getRandomArrayElement(texts),
    emoji: getRandomArrayElement(emojis),
    date: generateCommentDate(),
  };
};
