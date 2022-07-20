// di sini kita import apis/tmdb.js
import tmdb from "../apis/tmdb";

import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

const DetailMovie = () => {
  const baseUrlForMovie = "https://image.tmdb.org/t/p/w300";

  const [movies, setMovies] = useState([]);
  let params = useParams();

  useEffect(() => {
    const MovieID = params.MovieID;

    const fetchDataMovies = async () => {
      try {
        // Gunakan instance tmdb di sini
        const responseDariTMDB = await tmdb.get(
          // Nah di sini kita tidak perlu menuliskan terlalu panjang lagi
          `/movie/${MovieID}`
        );
        // Jangan lupa set statenya
        // Perhatikan di sini responseDariTMDB ada .data (response schema axios)
        setMovies(responseDariTMDB.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataMovies();
  }, []);

  return (
    <Box sx={{ padding: "1em", backgroundColor: "#000" }}>
      <Typography
        sx={{
          padding: "1em",
          color: "#000",
          textAlign: "center",
          backgroundColor: "white",
          fontWeight: "bold",
          margin: "auto",
          width: "100%",
        }}
      >
        MOVIE DETAIL
        <hr />
      </Typography>

      <Table>
        <tr>
          <td width="30%">
            <CardMedia
              component="img"
              image={`${baseUrlForMovie}${movies.poster_path}`}
              alt={movies.title}
              sx={{ width: "100%" }}
            ></CardMedia>
          </td>
          <td style={{ backgroundColor: "white", padding: "5em" }}>
            <Table striped bordered hover>
              <tr>
                <td>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    {movies.title}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography>Release Date : {movies.release_date}</Typography>
                  <Rating
                    value={movies.vote_average / 2}
                    precision={0.1}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography>Tagline : {movies.tagline}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography>Overvie : {movies.overview}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography>
                    Original Language : {movies.original_language}
                  </Typography>
                </td>
              </tr>
            </Table>
          </td>
        </tr>
      </Table>
    </Box>
  );
};

export default DetailMovie;
