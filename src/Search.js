// import { useState } from "react";

import { useEffect, useRef } from "react";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
    function callback(e) {
      if (e.code === "Enter") {
        inputEl.current.focus();
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback);
  }, []);

  // console.log(query);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={inputEl}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
