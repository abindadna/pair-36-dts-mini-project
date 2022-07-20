import React from "react";
import LoginOrRegisterForm from "../component/LoginOrRegisterForm";

export default function Register() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "auto",
        background: `url("https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1429&q=80") no-repeat center center fixed`,
        padding: "10em",
      }}
    >
      <LoginOrRegisterForm loginOrRegister={"register"} />
    </div>
  );
}
