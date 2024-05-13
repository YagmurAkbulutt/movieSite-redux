import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./../utils/api";
import Loader from "../components/Loader";
import { baseImgUrl } from "../utils/constants";
import DetailDisplay from "../components/DetailDisplay";
import millify from "millify";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import ActorCard from "../components/ActorCard";

const Detail = () => {
  const [movie, setMovie] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const params = {
      append_to_response: "credits",
    };

    api
      .get(`/movie/${id}`, { params })
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, []);
  

  return (
    <div>
      {!movie ? (
        <Loader />
      ) : (
        <div>
          {/* ÜST */}
          <section className=" relative ">
            <img
              className="object-cover  w-full max-h-[250px]"
              src={baseImgUrl + movie.backdrop_path}
            />
            <div className="absolute bg-black inset-0 grid place-items-center bg-opacity-50">
              <h2 className="text-3xl font-semibold">{movie.title}</h2>
            </div>
          </section>

          {/* ORTA */}
          <section className="my-10 grid grid-cols-1 md:grid-cols-2">
            <div>
              <DetailDisplay title="Kategoriler" data={movie.genres} />
              <DetailDisplay title="Konuşulan Diller" data={movie.spoken_languages}/>
              <DetailDisplay title="Yapımcı Şirketler" data={movie.production_companies}/>
              <DetailDisplay title="Yapımcı Ülkeler" data={movie.production_countries}/>
            </div>

            <div>
              <p>{movie.overview}</p>
              <p>
                Bütçe:
                <span className="text-green-500 ms-2">
                  {movie.budget === 0
                    ? "Bilinmiyor"
                    : "$" + millify(movie.budget)}
                </span>
              </p>

              <p>
                Hasılat:
                <span className="text-green-500 ms-2">
                  {movie.revenue === 0
                    ? "Bilinmiyor"
                    : "$" + millify(movie.revenue)}
                </span>
              </p>
            </div>
          </section>

          {/* ALT */}
          <section>
          <Splide options={{pagination: false, autoWidth: true, gap: 10,}}>
              {movie.credits.cast.map((actor, i) => (
                <SplideSlide key={i}>
                  <ActorCard actor={actor} />
                </SplideSlide>
              ))}
            </Splide>
          </section>
        </div>
      )}
    </div>
  );
};

export default Detail;
