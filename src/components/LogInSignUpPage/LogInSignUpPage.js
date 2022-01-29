import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import "./LogInSignUpPage.css";

const LogInSignUpPage = () => {
  return (
    <div className="logInSignUpPage">
      <div className="formContainer">
        <SignIn />
      </div>

      <div className="formContainer">
        <SignUp />
      </div>
    </div>
  );
};

export default LogInSignUpPage;
