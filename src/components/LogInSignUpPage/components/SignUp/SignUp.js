import { useState } from "react";
import axios from "axios";

import "./SignUp.css";
import { connect } from "react-redux";
import { setSignUpData } from "../../../../models/sign-forms/actions";
import { API_URL, PAGES } from "../../../../config/config";
import { goToPage } from "../../../../models/routing/actions";
import { setUsersData } from "../../../../models/sign-forms/actions";

//Initial State
const initialErrorStatus = {
  short: "",
  mismatch: "",
  existUser: "",
  notNum: "",
  somethingWentWrong: "",
};

const reg = /[a-zA-Z]/;

const SignUp = (props) => {
  const {
    username,
    password,
    confirmPassword,
    setSignUpData,
    goToPage,
    setUsersData,
  } = props;
  const [errors, setErrors] = useState(initialErrorStatus);

  const handleOnChange = (key, value) => {
    setSignUpData({ key, value });
  };

  const validateFields = async () => {
    setErrors(initialErrorStatus);

    if (!reg.test(username)) {
      setErrors((state) => ({
        ...state,
        notNum: "Password must contain at least 1 letter",
      }));
      return false;
    }

    if (password && password.length < 5) {
      setErrors((state) => ({
        ...state,
        short: "Password must contain at least 6 characters",
      }));
      return false;
    }

    if (confirmPassword && confirmPassword !== password) {
      setErrors((state) => ({ ...state, mismatch: "Passwords don't match" }));
      return false;
    }

    const user = await getData(username);

    if (user.length !== 0) {
      setErrors((state) => ({
        ...state,
        existUser: "Username already exists",
      }));

      return false;
    }

    return true;
  };

  const getData = async (username) => {
    try {
      const response = await axios.get(API_URL, {
        params: { username: username },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const postData = (username, password) => {
    let data = {
      username: username,
      password: password,
      fullName: "",
      age: 0,
      isAdmin: false,
    };

    const headers = { "Content-Type": "application/json" };

    axios
      .post(API_URL, data, { headers })
      .then((res) => {
        localStorage.setItem(
          `login_user`,
          JSON.stringify({
            username: res.data.username,
            password: res.data.password,
          })
        );

        setUsersData({
          id: res.data.id,
          username: res.data.username,
          password: res.data.password,
          confirmPassword: res.data.confirmPassword,
          fullName: res.data.fullName,
          age: res.data.age,
          isAdmin: res.data.isAdmin,
        });

        goToPage(PAGES.UserDataPage);
      })
      .catch((err) =>
        setErrors((state) => ({
          ...state,
          somethingWentWrong: "Something Went Wrong. Try again.",
        }))
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateFields();

    if (isValid) {
      postData(username, password);
    }
  };

  return (
    <div className="form">
      <h2>Sign up</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username </label>
          <input
            style={{ marginTop: "8px" }}
            id="username"
            name="username"
            placeholder="Enter Username"
            required
            value={username}
            onChange={(e) => handleOnChange("username", e.target.value)}
          />
          {errors.notNum ? (
            <div className="form-error">{`${errors.notNum}`}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            style={{ marginTop: "8px" }}
            id="password"
            name="password"
            label="Password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => handleOnChange("password", e.target.value)}
            type="password"
          />
        </div>
        {errors.short ? (
          <div className="form-error">{`${errors.short}`}</div>
        ) : null}

        <div>
          <label htmlFor="password">Confirm Password </label>
          <input
            style={{ marginTop: "8px" }}
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            onChange={(e) => handleOnChange("confirmPassword", e.target.value)}
            value={confirmPassword}
            required
            type="password"
          />
          {errors.mismatch ? (
            <div className="form-error">{`${errors.mismatch}`}</div>
          ) : null}
          {errors.existUser ? (
            <div className="form-error">{`${errors.existUser}`}</div>
          ) : null}
        </div>
        <div>
          <button className="form-btn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.signForms.signUpData.username,
    password: state.signForms.signUpData.password,
    confirmPassword: state.signForms.signUpData.confirmPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    setSignUpData: (payload) => dispatch(setSignUpData(payload)),
    setUsersData: (payload) => dispatch(setUsersData(payload)),
    goToPage: (payload) => dispatch(goToPage(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
