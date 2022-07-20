//import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailFilm from "./pages/DetailFilm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedComponent from "./component/ProtectedComponent";
import ListMovieAsli from "./container/ListMovieAsli";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#000" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/DetailFilm/:MovieID"
          element={
            <ProtectedComponent>
              <DetailFilm />
            </ProtectedComponent>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ListMovieAsli/:MovieType" element={<ListMovieAsli />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </div>
  );
}

export default App;
