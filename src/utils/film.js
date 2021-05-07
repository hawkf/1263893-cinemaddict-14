import dayjs from 'dayjs';

export const humanizeFilmRealeaseDate = (date) => dayjs(date).format('DD MMMM YYYY');

export const sortByRating = (filmA, filmB) => filmA.rating - filmB.rating;

