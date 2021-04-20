import dayjs from 'dayjs';
import {getRandomArrayElement, getRandomInteger} from '../utils/common';

const AUTHORS = ['Jack', 'Mike', 'Suzan', 'Bob', 'Peter'];
const TEXTS = ['Great movie. A rare topic.' , 'I haven\'t seen such a talented acting for a long time.', 'Thanks for the film to all its creators!'];
const EMOJIS = ['./images/emoji/smile.png', './images/emoji/sleeping.png', './images/emoji/puke.png', './images/emoji/angry.png' ];

const generateCommentDate = () => {
  const dayGap = getRandomInteger(-10000000, 1000000);

  const date = dayjs().add(dayGap, 'second').toDate();
  return date;
};

export const getComment = () => ({
  autor: getRandomArrayElement(AUTHORS),
  text: getRandomArrayElement(TEXTS),
  emoji: getRandomArrayElement(EMOJIS),
  date: generateCommentDate(),
});
