
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
      genreNumber: getAllGenres().filter((element) => element === genre).length,
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

const watchedCount = (films) => {
  if (films.length === 0) {
    return 0;
  }

  return films.filter((film) => film.isWatched === true).length;
};

export {getGenres, getGenreNumber, getTopGenre, getRunTime, watchedCount};
