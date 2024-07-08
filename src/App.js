import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import NumResults from "./NumResults";
import Main from "./Main";
import ListBox from "./ListBox";

import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Loader from "./Loader";
import Error from "./Error";
import ErrorMessage from "./ErrorMessage";
import Search from "./Search";
import MovieDetails from "./MovieDetails";
// import MovieDetails from "./MovieDetails.js";

const tempMovieData = [
  {
    Poster:
      "https://a.ltrbxd.com/resized/film-poster/1/7/3/0/2/4/173024-uyyala-jampala-0-1000-0-1500-crop.jpg?v=a867a400ae",
    Title: "Uyyala Jampala",
    Type: "movie",
    Year: "2013",
    imdbID: "tt3290676",
  },
  {
    Poster:
      "https://a.ltrbxd.com/resized/film-poster/5/1/5/6/8/51568-fight-club-0-1000-0-1500-crop.jpg?v=768b32dfa4",
    Title: "Fight Club",
    Type: "movie",
    Year: "1999",
    imdbID: "tt0137523",
  },
  {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BM2M1NDkwODMtOGY3Yi00ZWJhLTk5NGMtMGMxNjgxM2I0NDNhXkEyXkFqcGdeQXVyNjkwOTg4MTA@._V1_.jpg",
    Title: "Oohalu Gusagusalade",
    Type: "movie",
    Year: "2014",
    imdbID: "tt3835608",
  },
  {
    Poster:
      "https://i.pinimg.com/564x/93/7c/bb/937cbbb73556bc041895ad70f83854af.jpg",
    Title: "500 Days of Summer",
    Type: "movie",
    Year: "2009",
    imdbID: "tt1022603",
  },
  {
    Poster:
      "https://a.ltrbxd.com/resized/film-poster/3/1/0/1/3/31013-bommarillu-0-1000-0-1500-crop.jpg?v=5d835ee265",
    Title: "Bommarillu",
    Type: "movie",
    Year: "2006",
    imdbID: "tt0843326",
  },
  {
    Poster:
      "https://a.ltrbxd.com/resized/sm/upload/84/xt/e8/mw/gawnVe9cFowdoDLo9Pok12NTw39-0-1000-0-1500-crop.jpg?v=7cad204593",
    Title: "Memories of Murder",
    Type: "movie",
    Year: "2003",
    imdbID: "tt0353969",
  },
  {
    Poster:
      "https://a.ltrbxd.com/resized/film-poster/4/0/4/5/0/3/404503-arjun-reddy-0-1000-0-1500-crop.jpg?v=7535dbffc0",
    Title: "Arjun Reddy",
    Type: "movie",
    Year: "2017",
    imdbID: "tt7294534",
  },
  {
    imdbID: "tt0180093",
    Title: "Requiem for a Dream",
    Year: "2000",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTdiNzJlOWUtNWMwNS00NmFlLWI0YTEtZmI3YjIzZWUyY2Y3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export default function App() {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue) || [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");

  function handleDeleteWatched(id) {
    setWatched((mvs) => mvs.filter((mv) => mv.imdbID !== id));
  }

  // const tempQuery = "interstellar";
  //ec8327d0
  const key = "ec8327d0";
  // const KEY = "8f984fdfcbb4aea78426a8b3ac5871c1";
  // const NetErr = "Something went wrong while fetching the data !";
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseMovie(id) {
    setSelectedId(null);
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(
    function () {
      if (query.length === 0) {
        setMovies(tempMovieData);
        // setIsLoading(false);
      } else {
        async function fetchMovies() {
          try {
            setError("");
            setIsLoading(true);
            const res = await fetch(
              // `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=8f984fdfcbb4aea78426a8b3ac5871c1`
              `http://www.omdbapi.com/?apikey=${key}&s=${query}`
            );
            if (!res.ok) {
              throw new Error("Something went wrong while fetching the data !");
            }

            const data = await res.json();
            console.log(data);

            if (data.Response === "False") {
              throw new Error("Movie not found ‼️");
            }
            // const MvErr = "movie not found";

            setMovies(data.Search);
            // console.log(data);
          } catch (err) {
            // console.error(err);

            // setError(err.message);
            setError(`Movie not found `);
          } finally {
            setIsLoading(false);
          }
        }
        handleCloseMovie();
        fetchMovies();
        if (query.length < 3) {
          setError("Search for a movie ");
        }
      }
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          {isLoading && <Loader />}

          {!isLoading && !error && (
            <MovieList
              tempMovieData={tempMovieData}
              movies={movies}
              onSelectMovie={handleSelectMovie}
            />
          )}
          {query === "" ? (
            <p className="error">Search for a movie 🍿</p>
          ) : (
            error && <ErrorMessage message={error} />
          )}
          {/* {error && <ErrorMessage message={error} />} */}
          {/* {isLoading ? (
            <Loader />
          ) : (
            <MovieList tempMovieData={tempMovieData} movies={movies} />
          )} */}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseBtn={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
              setWatched={setWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteMovie={handleDeleteWatched}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
