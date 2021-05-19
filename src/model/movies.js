import Observer from '../utils/observer';
import dayjs from 'dayjs';

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  set(updateType, movies) {
    this._movies = movies.slice();
    this._notify(updateType);
  }

  get() {
    return this._movies;
  }

  update(updateType, update) {
    const updateClient = Movies.adaptToClient(update);
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      updateClient,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, updateClient);
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        title: movie['film_info'].title,
        alternativeTitle: movie['film_info'].alternative_title,
        poster:  movie['film_info'].poster,
        rating: movie['film_info'].total_rating,
        year: dayjs(movie['film_info'].release.date).format('YYYY'),
        description: movie['film_info'].description,
        genres: movie['film_info'].genre,
        duration: movie['film_info'].runtime,
        age: movie['film_info'].age_rating,
        director: movie['film_info'].director,
        writers: movie['film_info'].writers,
        actors: movie['film_info'].actors,
        releaseDate: movie['film_info'].release.date,
        country: movie['film_info'].release.release_country,
        watchList: movie['user_details'].watchlist,
        isWatched: movie['user_details'].already_watched,
        watchingDate: movie['user_details'].watching_date,
        isFavorite: movie['user_details'].favorite,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
      {},
      {
        id: movie.id,
        comments: movie.comments,
        'film_info': {
          'title': movie.title,
          'alternative_title': movie.alternativeTitle,
          'total_rating': movie.rating,
          'poster': movie.poster,
          'age_rating': movie.rating,
          'director': movie.director,
          'writers': movie.writers,
          'actors': movie.actors,
          'release': {
            'date': movie.releaseDate,
            'release_country': movie.country,
          },
          'runtime': movie.duration,
          'genre': movie.genres,
          'description': movie.description,
        },
        'user_details': {
          'watchlist': movie.watchList,
          'already_watched': movie.isWatched,
          'watching_date': movie.watchingDate,
          'favorite': movie.isFavorite,
        },
      },
    );

    return adaptedMovie;
  }
}
