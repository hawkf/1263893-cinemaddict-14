import dayjs from 'dayjs';

export const humanizeFilmRealeaseDate = (date) => dayjs(date).format('DD MMMM YYYY');

export const sortByRating = (filmA, filmB) => filmB.rating - filmA.rating;

export const sortByDate = (filmA, filmB) => dayjs(filmB.year).diff(dayjs(filmA.year));

export const formatDuration = (duration) => {
  return `${parseInt(duration / 60)}h ${duration % 60}m`;
};
