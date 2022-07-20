// Di sini kita harus menggunakan useEffect
import React, { useEffect, useState } from "react";

//import styles from "./LoginOrRegisterForm.module.css";

import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

// Pada bagian ini sekarang kita membutuhkan fungsi untuk melakukan login dan register
import {
  auth,
  loginDenganEmailDanPassword,
  registerDenganEmailDanPassword,
} from "../authentication/firebase";

// Untuk memudahkan kita meng-track user sedang login atau tidak, kita bisa menggunakan
// hooks yang disediakan pada react-firebase-hooks
// Dokumentasi:
// - https://github.com/CSFrequency/react-firebase-hooks/tree/master
// - https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth

// Karena kita sudah membuat fungsi kita sendiri
// maka kita hanya perlu menggunakan hooks useAuthState saja
import { useAuthState } from "react-firebase-hooks/auth";

const LoginOrRegisterForm = ({ loginOrRegister }) => {
  const navigate = useNavigate();

  // di sini kita akan menggunakan hooks useAuthState
  // useAuthState ini menerima 2 parameter:
  // parameter 1: auth (yang kita buat dan export dari firebase)
  // parameter 2 (optional): options (dalam bentuk object)
  //    digunakan apabila ingin menggunakan hooks dengan lebih detail (melihat perubahan user)
  //    (Pada pembelajaran ini tidak digunakan)

  // Mengembalikan 3 data (dalam array)
  // user: akan mengembalikan auth.User apabila ada yang log in, dan null bila tidak ada
  // loading: boolean yang digunakan sebagai indikator apakah firebasenya sedang menunggu login
  // error: bila ada error yang diberikan
  const [user, isLoading] = useAuthState(auth);

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const textFieldEmailOnChangeHandler = (event) => {
    setCredential({
      ...credential,
      email: event.target.value,
    });
  };

  const textFieldPasswordOnChangeHandler = (event) => {
    setCredential({
      ...credential,
      password: event.target.value,
    });
  };

  const loginHandler = () => {
    // console.log("Login");
    // navigate("/");

    // Kita di sini tidak menggunakan navigate ke login lagi,
    // karena pada firebase, ketika selesai login,
    // maka auth statenya akan otomatis berubah (hooks useAuthState, data user)
    loginDenganEmailDanPassword(credential.email, credential.password);
  };

  const registerHandler = () => {
    // console.log("Register");
    // navigate("/login");

    // Kita di sini tidak menggunakan navigate ke login lagi, karena pada Firebase
    // Ketika selesai register akan otomatis login juga
    // dan auth statenya akan otomatis berubah (hooks useAuthState, data user)
    registerDenganEmailDanPassword(credential.email, credential.password);
  };

  const buttonLoginOrRegisterOnClickHandler = () => {
    if (loginOrRegister === "login") {
      loginHandler();
    } else {
      registerHandler();
    }
  };

  // Lalu sekarang bagaimana kita track orang yang sedang login, dan apabila ada yang login
  // kita pindahkan ke halaman utama?

  // Kita gunakan.... useEffect !
  useEffect(
    () => {
      // Nah di sini mungkin kita bisa modifikasi / menggunakan
      // isLoading sebagai logic untuk menampilkan loading screen
      // (pada pembelajaran ini loading screen tidak dibuat)
      if (isLoading) {
        // Tampilkan loading screen (bila ada)
        return;
      }

      // Lalu apabila usernya ditemukan (ada / tidak null)
      // Maka akan kita navigasikan ke halaman HomePage
      if (user) {
        navigate("/");
      }
    },
    // Sekarang dependency kita tergantung pada user dan isLoading dari useAuthState
    [user, isLoading, navigate]
  );

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          padding: "3em",
          width: "40em",
          margin: "auto",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            marginBottom: "1em",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {loginOrRegister === "login" ? "Login " : "Register"}
        </Typography>

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={credential.email}
          onChange={textFieldEmailOnChangeHandler}
        />
        <br />
        <br />
        <TextField
          label="password"
          type="Password"
          variant="outlined"
          fullWidth
          value={credential.password}
          onChange={textFieldPasswordOnChangeHandler}
        />
        <br />
        <br />
        <Button
          variant="contained"
          fullWidth
          onClick={buttonLoginOrRegisterOnClickHandler}
        >
          {loginOrRegister === "login" ? "Login" : "Register Account"}
        </Button>
        <br />
        <br />
        {loginOrRegister === "login" ? (
          <Link to="/register" style={{ textDecoration: "none", color: "red" }}>
            <Typography variant="body1">Register here</Typography>
          </Link>
        ) : (
          <Link to="/login" style={{ textDecoration: "none", color: "red" }}>
            <Typography
              variant="body1"
              style={{ textDecoration: "none", color: "red" }}
            >
              Login here
            </Typography>
          </Link>
        )}
      </Paper>
    </Box>
  );
};

export default LoginOrRegisterForm;
