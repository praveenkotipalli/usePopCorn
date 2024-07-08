import React from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./StarRating";
import "./index.css";
import App from "./App";
// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating onSetRating={setMovieRating} />
//       <p>the rating in {movieRating}</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App-v1 /> */}
    <App />
    {/* <StarRating maxRating={5} /> */}
    {/* <Test /> */}
  </React.StrictMode>
);
