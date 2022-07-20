import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { keluarDariApps } from "../authentication/firebase";
import image from "../assets/images/movie-850.png";
import cari from "../assets/images/Cari.png";
import fill from "../assets/images/Fill 1.png";
import lonceng from "../assets/images/Lonceng.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../authentication/firebase";
export default function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  // if(user === null){
  //   button = <Link style={{textDecoration: 'none', color: 'white'}} to="/Login">Login</Link>;
  //   button2 = "";
  // } else {
  //   button = user.email;
  //   button2 = <Button onClick={buttonLogoutOnClickHandler}>Logout</Button>;
  // }
  // Fungsi ini akan menjadi async await
  // Karena keluarDariApps bersifat async, dan kita harus menunggu
  // keluarDariAppsSelesai, baru boleh navigate
  const buttonLogoutOnClickHandler = async () => {
    // Kita akan memanggil fungsi keluarDariApps di sini
    await keluarDariApps();
    navigate("/");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img alt="" width="40em" style={{ marginRight: "5em" }} src={image} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                TV
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Movies
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Top Rated
              </Link>
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="#home">
              <img alt="" width="15em" src={cari} />{" "}
            </Nav.Link>
            <Nav.Link style={{ color: "white" }} disabled>
              {user !== null ? user.email : ""}
            </Nav.Link>
            <Nav.Link href="#home">
              <img width="15em" src={fill} alt="" />{" "}
            </Nav.Link>
            <Nav.Link href="#home">
              <img width="15em" src={lonceng} alt="" />{" "}
            </Nav.Link>
            <Nav.Link>
              {user !== null ? (
                <Button
                  variant="contained"
                  onClick={buttonLogoutOnClickHandler}
                >
                  Logout
                </Button>
              ) : (
                <Link
                  type="button"
                  class="btn btn-success"
                  style={{ textDecoration: "none", color: "white" }}
                  to="/Login"
                >
                  Login
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
