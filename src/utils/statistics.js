import dayjs from 'dayjs';

const getAllGenres = (films) => {

  const genres = [];
  films.forEach((film) => {
    genres.push(...film.genres);
  });

  return genres;
};

const getGenresCount = (films) => {
  const genresNumbers = [...new Set(getAllGenres(films))].map((genre) => {
    return {
      genreName: genre,
      genreNumber: getAllGenres(films).filter((element) => element === genre).length,
    };
  });

  genresNumbers.sort((a, b) => {
    return b.genreNumber - a.genreNumber;
  });

  return genresNumbers;
};

const getGenres = (films) => {
  return getGenresCount(films).map((element) => element.genreName);
};

const getGenreNumber = (films) => {
  return getGenresCount(films).map((element) => element.genreNumber);
};

const getTopGenre = (films) => {
  if (films.length === 0) {
    return '';
  }
  return getGenresCount(films)[0].genreName;
};

const getRunTime = (films) => {
  let runTime = 0;

  if (films.length === 0) {
    return runTime;
  }

  films.forEach((film) => {
    runTime = runTime + film.duration;
  });

  return runTime;
};

const getRunTimeHours = (films) => {
  return parseInt(getRunTime(films) / 60);
};

const getRunTimeMinutes = (films) => {
  return getRunTime(films) % 60;
};

const getWatchedCount = (films) => {
  if (films.length === 0) {
    return 0;
  }

  return films.filter((film) => film.isWatched === true).length;
};

const getFilmsInDateRange = (films, dateFrom) => {
  return films.filter((film) => {
    return dayjs(film.watchingDate).isAfter(dateFrom, 'day') || dayjs(film.watchingDate).isSame(dateFrom, 'day');
  });
};

const getSortedFilms = (dataState) => {
  const sortedFilms = dataState.dateFrom === null ? dataState.films.slice() : getFilmsInDateRange(dataState.films, dataState.dateFrom);
  return sortedFilms;
};

const getProfileRank = (films) => {
  if(films === null) {
    return '';
  }

  const watchedFilmsCount =  films.filter((film) => {
    return film.isWatched === true;
  }).length;

  if (watchedFilmsCount >= 1 && watchedFilmsCount <= 10) {
    return 'Novice';
  } else if (watchedFilmsCount >= 11 && watchedFilmsCount <= 20) {
    return 'Fan';
  } else if (watchedFilmsCount >= 21){
    return 'Movie Buff';
  }

  return '';
};

export {getGenres, getGenreNumber, getTopGenre, getRunTimeHours, getRunTimeMinutes, getWatchedCount, getSortedFilms, getProfileRank};
