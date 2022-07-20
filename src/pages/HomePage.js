import React from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
// import Slideshow from "../component/Slideshow";
import ListMovieAsli from "../container/ListMovieAsli";

import ListMoviesReal from "../container/ListMoviesReal";
import ListMovieTop from "../container/ListMovieTop";
export default function HomePage() {
  return (
    <div>
      <Header />
      {/* <Slideshow /> */}
      <div style={{ alignContent: "center", alignItems: "center" }}>
        <ListMoviesReal />
        <ListMovieAsli />
        <ListMovieTop />
        <Footer />
      </div>
    </div>
  );
}
