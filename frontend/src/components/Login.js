import React, { useState } from "react";

import Header from "./Header";

import { Link } from "react-router-dom";
function Login({ handelLoginSubmit }) {
  const [values, setvalue] = useState({
    email: "",
    password: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    handelLoginSubmit(values);
    // auth.login(email, password)
    //     .then((data) => {

    //         if (data.token) {
    //             localStorage.setItem('jwt', data.token);
    //             props.handelLogin(email)
    //         }
    //         if (data.status === 400) {
    //             console.log(" one or more of the fields were not provided ")
    //         }
    //         if (data.status === 401) {
    //             console.log("the user with the specified email not found ")
    //         }

    //     }).catch(err => console.log(err));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalue({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="login">
      <Header navTo={"signup"} title={"Sign up"} />
      <div>
        <h2 className={"popup__title_them_black"}>Login</h2>
        <form
          onSubmit={handleSubmit}
          action="#"
          method="POST"
          name={"Login"}
          className={`popup__content popup__form `}
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            required
            minLength="5"
            maxLength="40"
            onChange={handleChange}
            autoComplete="on"
            className="login__input"
          ></input>
          <input
            type="password"
            placeholder="password"
            name="password"
            required
            value={values.password}
            onChange={handleChange}
            minLength="8"
            autoComplete="on"
            maxLength="40"
            className="login__input"
          ></input>

          <button
            className={" popup__button  popup__button_them_black"}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>

      <p className="signup__subtitle">
        Not a member yet?{" "}
        <Link to="/signup" className="signup__link">
          Sign up
        </Link>{" "}
        here!
      </p>
    </div>
  );
}

export default Login;
