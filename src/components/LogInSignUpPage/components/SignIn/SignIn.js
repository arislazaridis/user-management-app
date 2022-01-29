import { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { connect } from "react-redux";
import { setSignInData } from "../../../../models/sign-forms/actions";
import { API_URL, PAGES } from "../../../../config/config";
import { goToPage } from "../../../../models/routing/actions";
import { setUsersData } from "../../../../models/sign-forms/actions";

const initialErrorStatus = {
  noUser: "",
};

const SignIn = (props) => {
  const { username, password, setSignInData, goToPage, setUsersData } = props;
  const [errors, setErrors] = useState(initialErrorStatus);

  const handleOnChange = (key, value) => {
    setSignInData({ key, value });
  };

  const getData = async (username, password) => {
    try {
      console.log(username, password);
      const response = await axios.get(API_URL, {
        params: { username: username, password: password },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(initialErrorStatus);

    const userResponse = await getData(username, password);

    if (userResponse.length === 0) {
      setErrors((state) => ({
        ...state,
        noUser: "Wrong username/password",
      }));
    } else {
      localStorage.setItem(
        `login_user`,
        JSON.stringify({
          username: userResponse[0].username,
          password: userResponse[0].password,
        })
      );

      setUsersData({
        username: username,
        password: password,
        fullName: userResponse[0].fullName,
        age: userResponse[0].age,
        isAdmin: userResponse[0].isAdmin,
        id: userResponse[0].id,
      });

      goToPage(PAGES.UserDataPage);
    }
  };

  return (
    <div className="form">
      <h2>Sign In</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">Username </label>
          <input
            style={{ marginTop: "8px" }}
            id="user"
            name="user"
            placeholder="Enter Username"
            required
            value={username}
            onChange={(e) => handleOnChange("username", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pass">Password </label>
          <input
            style={{ marginTop: "8px" }}
            id="pass"
            name="pass"
            label="Password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => handleOnChange("password", e.target.value)}
            type="password"
          />
        </div>
        {errors.noUser ? (
          <div className="form-error">{`${errors.noUser}`}</div>
        ) : null}

        <div>
          <button className="form-btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.signForms.signInData.username,
    password: state.signForms.signInData.password,
    fullName: state.signForms.usersData.fullName,
    isAdmin: state.signForms.usersData.isAdmin,
    age: state.signForms.usersData.age,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    setSignInData: (payload) => dispatch(setSignInData(payload)),
    setUsersData: (payload) => dispatch(setUsersData(payload)),
    goToPage: (payload) => dispatch(goToPage(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
