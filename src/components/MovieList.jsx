import { useEffect, useState } from "react";
import api from "./../utils/api";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { baseImgUrl } from './../utils/constants';
import { Link } from "react-router-dom";

const MovieList = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    api
      .get(`/discover/movie?with_genres=${genre.id}`)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }, []);

 
  return (
    <div className="my-10">
      <h1 className="text-3xl font-semibols mb-3">{genre.name}</h1>
      <Splide options={{
        autoWidth: true, gap : '10px', pagination: false
      }} aria-label="My Favorite Images" >
        {movies.map((movie) => (
          <SplideSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`} >
            <img className="max-w-[250px] h-full cursor-pointer rounded" src={baseImgUrl + movie.poster_path}/>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default MovieList;
