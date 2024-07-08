import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
export default function MovieDetails({
  selectedId,
  onCloseBtn,
  onAddWatched,
  watched,
  onDeleteMovie,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const key = "ec8327d0";

  //   console.log(watched);
  //   console.log(watched.imdbID, selectedId);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  //   const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  //   console.log(isWatched);
  const { imdbRating, Runtime, Poster, Title, imdbID } = movie;
  function handleAdd() {
    const newWatchedMovie = {
      imdbID,
      userRating: Number(userRating),
      Title,
      Poster,
      imdbRating: Number(imdbRating),
      Runtime: Number(Runtime.split(" ").at(0)),
    };
    onAddWatched(newWatchedMovie);
    onCloseBtn();
    console.log(userRating);
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseBtn();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseBtn]
  );

  useEffect(() => {
    setIsLoading(true);
    async function getMovieDetails() {
      const res = await fetch(
        // `https://api.themoviedb.org/3/search/movie?query=${selectedId}r&api_key=8f984fdfcbb4aea78426a8b3ac5871c1`
        `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(
    function () {
      document.title = `Movie | ${movie.Title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [movie]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseBtn}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Poster}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>{`You have rated the movie ${watchedUserRating} `} ⭐️</p>
              )}
            </div>

            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>
              <b>Starring</b> {movie.Actors}
            </p>
            <p>
              <b>Directed by</b> {movie.Director}
            </p>
          </section>
        </>
      )}
    </div>
  );
}
