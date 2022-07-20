// di sini kita import apis/tmdb.js
import tmdb from "../apis/tmdb";

import React, { useEffect, useState } from "react";
import { Box,  CardMedia } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Slideshow = () => {
  const [movies, setMovies] = useState([]);
  const baseUrlForMovie = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    const fetchDataMovies = async () => {
      try {
        // Gunakan instance tmdb di sini
        const responseDariTMDB = await tmdb.get(
          // Nah di sini kita tidak perlu menuliskan terlalu panjang lagi
          "/movie/popular"
        );
        // Jangan lupa set statenya
        // Perhatikan di sini responseDariTMDB ada .data (response schema axios)
        setMovies(responseDariTMDB.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataMovies();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        autoplay
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {movies.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <Card className="boxy" sx={{ width: "100%" }}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/DetailFilm/${movie.id}`}
                >
                  
                  <Box className="boxy"  sx={{ width: "80em" ,objectFit: "cover",
                      objectPosition: "center", height: '20em'}}>
                    <CardMedia
                      component="img"
                      image={`${baseUrlForMovie}${movie.backdrop_path}`}
                      alt={movie.title}

                      
                    ></CardMedia>
                  </Box>
                </Link>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Slideshow;
