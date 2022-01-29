import UserInfoEdit from "./components/UserInfoEdit/UserInfoEdit";
import UserPasswordEdit from "./components/UserPasswordEdit/UserPasswordEdit";

const UserDataPage = () => {
  return (
    <div className="userDataPage">
      <div className="formContainer">
        <UserInfoEdit />
      </div>
      <div className="formContainer">
        <UserPasswordEdit />
      </div>
    </div>
  );
};

export default UserDataPage;
