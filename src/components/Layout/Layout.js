import { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { goToPage } from "../../models/routing/actions";
import { setUsersData } from "../../models/sign-forms/actions";
import UserDataPage from "../UserDataPage/UserDataPage";
import LogInSignUpPage from "./../LogInSignUpPage/LogInSignUpPage";
import { API_URL, PAGES } from "../../config/config";
import AllUsersPage from "../AllUsersPage/components/AllUsersPage";

function Layout(props) {
  const { page, goToPage, setUsersData } = props;
  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("login_user"));

    if (dataFromLocalStorage) {
      console.log("user is login");
      (async () => {
        const response = await axios.get(
          API_URL +
            `?username=${dataFromLocalStorage.username}&password=${dataFromLocalStorage.password}`
        );

        if (response.data.length === 1) {
          const userData = response.data;
          console.log(userData);

          setUsersData({
            id: userData[0].id,
            username: userData[0].username,
            password: userData[0].password,
            confirmPassword: userData[0].confirmPassword,
            fullName: userData[0].fullName,
            age: userData[0].age,
            isAdmin: userData[0].isAdmin,
          });

          goToPage(PAGES.UserDataPage);
        } else {
          localStorage.clear("login_user");
        }

        return response.data;
      })();
    }
  }, [goToPage, setUsersData]);

  return (
    <>
      {page === PAGES.LogInSignUpPage ? (
        <LogInSignUpPage />
      ) : page === PAGES.UserDataPage ? (
        <UserDataPage />
      ) : page === PAGES.AllUsersPage ? (
        <AllUsersPage />
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    page: state.router.page,
    username: state.signForms.usersData.username,
    password: state.signForms.usersData.password,
    confirmPassword: state.signForms.usersData.confirmPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    goToPage: (payload) => dispatch(goToPage(payload)),
    setUsersData: (payload) => dispatch(setUsersData(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
