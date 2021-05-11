import dayjs from 'dayjs';

export const humanizeFilmRealeaseDate = (date) => dayjs(date).format('DD MMMM YYYY');

export const sortByRating = (filmA, filmB) => filmB.rating - filmA.rating;

export const sortByDate = (filmA, filmB) => dayjs(filmB.year).diff(dayjs(filmA.year));
