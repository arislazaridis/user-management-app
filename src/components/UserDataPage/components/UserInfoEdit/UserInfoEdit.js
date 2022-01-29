import { useState } from "react";
import { connect } from "react-redux";
import { TextField } from "@mui/material";
import { Checkbox, FormControlLabel, Button } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { API_URL, PAGES } from "../../../../config/config";
import { goToPage } from "../../../../models/routing/actions";
import { setUsersData } from "../../../../models/sign-forms/actions";
import "./UserInfoEdit.css";

function UserInfoEdit(props) {
  const {
    id,
    username,
    password,
    fullName,
    age,
    isAdmin,
    setUsersData,
    goToPage,
  } = props;

  const handleOnChangeUsername = (e) => {
    setUsersData({ username: e.target.value });
  };

  const handleOnChangeFullName = (e) => {
    setUsersData({ fullName: e.target.value });
  };

  const handleOnChangeAge = (e) => {
    setUsersData({ age: Number(e.target.value) });
  };

  const putUpdateData = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        id: id,
        fullName: fullName,
        age: age,
        isAdmin: isAdmin,
      }),
    };

    fetch(`${API_URL}/${id}`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
      })
      .catch((error) => console.log("There was an error", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putUpdateData();
  };

  const handleAllUsers = (e) => {
    e.preventDefault();
    goToPage(PAGES.AllUsersPage);
  };

  return (
    <div className="form">
      <div>
        <AccountBoxIcon style={{ fontSize: "50" }} />
        <h4>Personal Info</h4>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <TextField
            style={{ marginTop: "8px" }}
            variant="outlined"
            label="Username"
            id="username"
            name="username"
            placeholder="Enter Username"
            required
            value={username}
            onChange={handleOnChangeUsername}
          />
        </div>
        <div>
          <TextField
            style={{ marginTop: "8px" }}
            variant="outlined"
            label="FullName"
            id="fullName"
            name="fullName"
            placeholder="Enter FullName"
            required
            value={fullName}
            onChange={handleOnChangeFullName}
          />
        </div>
        <div>
          <TextField
            style={{ marginTop: "8px" }}
            variant="outlined"
            label="Age"
            id="age"
            name="age"
            placeholder="Enter Age"
            required
            value={age}
            onChange={handleOnChangeAge}
            type="number"
          />
        </div>
        <div>
          <FormControlLabel
            control={<Checkbox disabled checked={isAdmin && true} />}
            label="isAdmin"
          />
        </div>

        <div>
          <Button variant="outlined" className="form-btn" type="submit">
            Save
          </Button>
        </div>

        {isAdmin ? (
          <div>
            <Button
              style={{ marginTop: "8px" }}
              variant="outlined"
              className="form-btn"
              onClick={handleAllUsers}
            >
              All Users
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.signForms.usersData.id,
    username: state.signForms.usersData.username,
    password: state.signForms.usersData.password,
    fullName: state.signForms.usersData.fullName,
    isAdmin: state.signForms.usersData.isAdmin,
    age: state.signForms.usersData.age,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsersData: (payload) => dispatch(setUsersData(payload)),
    goToPage: (payload) => dispatch(goToPage(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoEdit);
