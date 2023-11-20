import React, { useRef, useState } from "react";
import axiosClient from "../API/axiosClient";
import { Navigate, Link } from "react-router-dom";
import "../styles/loginStyles.css";
function RegisterPage() {
  const [registered, setRegister] = useState(false);
  const uname = useRef();
  const pwrd = useRef();
  const restaurantNameD = useRef();
  const addressD = useRef();
  const contactD = useRef();

  const performRegister = (e) => {
    e.preventDefault();

    axiosClient
      .post(
        "/api/v1/user/register",
        JSON.stringify({
          userName: uname.current.value,
          password: pwrd.current.value,
          restaurantName: restaurantNameD.current.value,
          address: addressD.current.value,
          contactNo: contactD.current.value,
        })
      )
      .then((data) => {
        if ((data.status = 200)) {
          setRegister(true);
        }
      });
  };
  return (
    <div>
      {registered ? (
        <Navigate to="/login"></Navigate>
      ) : (
        <div className="login-wrapper">
          <form className="login-box">
            <label>Restaurnat Name</label>
            <input ref={restaurantNameD} className="login-item"></input>
            <label>Address</label>
            <input ref={addressD} className="login-item"></input>
            <label>Contact No</label>
            <input ref={contactD} className="login-item"></input>
            <label>Username</label>
            <input ref={uname} className="login-item"></input>
            <label>Passsword</label>
            <input ref={pwrd} className="login-item" type="password"></input>
            <br />
            <button
              type="submit"
              onClick={performRegister}
              className="login-item"
            >
              Register
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

export default RegisterPage;
