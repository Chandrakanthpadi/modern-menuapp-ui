import React, { useRef, useState } from "react";
import axiosClient from "../API/axiosClient";
import { Navigate, Link } from "react-router-dom";
import { useRestaurantContext } from "../store/RestaurantContextProvider";
import "../styles/loginStyles.css";

function LoginPage() {
  const { setRestaurant, setCategory, restaurant } = useRestaurantContext();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const uname = useRef();
  const pwrd = useRef();

  const performLogin = (e) => {
    e.preventDefault();

    axiosClient
      .post(
        "/api/v1/user/login",
        JSON.stringify({
          userName: uname.current.value,
          password: pwrd.current.value,
        })
      )
      .then((data) => {
        if ((data.status = 200)) {
          setRestaurant(data.data);
          setLoginSuccess(true);
          axiosClient
            .get(
              `/api/v1/restaurnat/category?restaurantId=${data.data.restaurantId}`
            )
            .then((data) => {
              console.log(data);
              setCategory(data.data);
            });
        }
      });
  };

  return (
    <div>
      {loginSuccess ? (
        <Navigate to="/admin/menu"></Navigate>
      ) : (
        <div className="login-wrapper">
          <form className="login-box">
            <label>Username</label>
            <input ref={uname} className="login-item"></input>
            <label>Password</label>
            <input ref={pwrd} className="login-item" type="password"></input>
            <br />
            <button type="submit" onClick={performLogin} className="login-item">
              Login
            </button>
            <Link to="/" className="login-reg">
              Go back to Home!
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
