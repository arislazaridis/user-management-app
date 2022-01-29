import { useState } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@mui/material";
import { setUsersData } from "../../../../models/sign-forms/actions";
import "./UserPasswordEdit.css";
import API_URL from "../../../../config/config";

const initialErrorStatus = { mismatch: "" };

function UserPasswordEdit(props) {
  const [editPassword, setEditPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState(initialErrorStatus);
  const { id, username, fullName, isAdmin, age, password, setUsersData } =
    props;

  const handleOnChangeNewPass = (e) => {
    setEditPassword((prevState) => ({
      ...prevState,
      newPassword: e.target.value,
    }));
  };

  const handleOnChangeConfirmPass = (e) => {
    setEditPassword((prevState) => ({
      ...prevState,
      confirmPassword: e.target.value,
    }));
  };

  const validateFields = () => {
    if (
      editPassword.confirmPassword &&
      editPassword.confirmPassword !== editPassword.newPassword
    ) {
      setErrors((prevState) => ({
        ...prevState,
        mismatch: "Passwords don't match",
      }));
      return false;
    }
    return true;
  };

  const putUpdateData = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: editPassword.newPassword,
        id: id,
        fullName: fullName,
        age: age,
        isAdmin: isAdmin,
      }),
    };

    fetch(`${API_URL}/${id}`, requestOptions)
      .then(async (response) => {
        const data = response.json();
      })

      .catch((error) => console.log("There was an error", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFields();

    if (isValid) {
      setUsersData({ password: editPassword.newPassword });
      setEditPassword({ newPassword: "", confirmPassword: "" });
      setErrors({ mismatch: "" });
      putUpdateData();
    }
  };
  return (
    <div className="form">
      <h2>Change Your Password</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <TextField
            style={{ marginTop: "8px" }}
            variant="outlined"
            label="Current Password"
            id="currentPassword"
            name="currentPassword"
            placeholder="Enter Current Password"
            required
            value={password}
            readOnly
          />
        </div>
        <div>
          <TextField
            style={{ marginTop: "8px" }}
            variant="outlined"
            label="New Password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter New Password"
            required
            value={editPassword.newPassword}
            onChange={handleOnChangeNewPass}
            type="password"
          />
        </div>

        <div>
          <TextField
            style={{ marginTop: "8px" }}
            label="Confirm New Password "
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Confirm Password"
            value={editPassword.confirmPassword}
            onChange={handleOnChangeConfirmPass}
            type="password"
            error={Boolean(errors?.mismatch)}
            helperText={errors?.mismatch}
            required
          />
        </div>
        <div>
          <Button
            style={{ marginTop: "8px" }}
            variant="outlined"
            className="form-btn"
            type="submit"
          >
            Change
          </Button>
        </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPasswordEdit);
