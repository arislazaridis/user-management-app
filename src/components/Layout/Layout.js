import { useEffect } from "react";
import axios from "axios";
// import { connect } from "react-redux";
import { goToPage, page } from "../../models/routing/props";
import { setUsersData } from "../../models/sign-forms/props";
import UserDataPage from "../UserDataPage/UserDataPage";
import LogInSignUpPage from "./../LogInSignUpPage/LogInSignUpPage";
import { API_URL, PAGES } from "../../config/config";
import AllUsersPage from "../AllUsersPage/components/AllUsersPage";
import { withProps } from "../../utils/props";

function Layout({ page, goToPage, setUsersData }) {
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

export default withProps({ page, goToPage, setUsersData })(Layout);
