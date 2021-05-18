import Observer from '../utils/observer';
import dayjs from 'dayjs';

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  set(movies) {
    this._movies = movies.slice();
  }

  get() {
    return this._movies;
  }

  update(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        title: movie['film_info'].title,
        poster:  movie['film_info'].poster,
        rating: movie['film_info'].total_rating,
        year: dayjs(movie['film_info'].release.date).format('YYYY'),
        description: movie['film_info'].description,
        genres: movie['film_info'].genre,
        duration: movie['film_info'].runtime,
        age: movie['film_info'].age_rating,
        director: movie['film_info'].director,
        writers: movie['film_info'].writers,
        actors: movie['film_info'].actors.join(' '),
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

  /*static adaptToServer(task) {
    const adaptedTask = Object.assign(
      {},
      task,
      {
        'due_date': task.dueDate instanceof Date ? task.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
        'is_archived': task.isArchive,
        'is_favorite': task.isFavorite,
        'repeating_days': task.repeating,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedTask.dueDate;
    delete adaptedTask.isArchive;
    delete adaptedTask.isFavorite;
    delete adaptedTask.repeating;

    return adaptedTask;
  }*/
}
