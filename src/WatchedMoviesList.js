import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({ watched, onDeleteMovie }) {
  // console.log(watched);
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          onDeleteMovie={onDeleteMovie}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
