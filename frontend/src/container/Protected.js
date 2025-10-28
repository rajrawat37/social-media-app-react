import { Navigate, Route } from "react-router-dom";
import { fetchUser } from "../utils/fetchUser";

function Protected(props) {
    const {Component} = props;
    const userInfo = fetchUser();
    const isLoggedIn = userInfo !== null ? true : false;

    console.log("🔓 User is logged in ?" , isLoggedIn);

  return (
    <>
      {isLoggedIn  ? <Component/> : <Navigate to={"/login"} />}
    </>
  );
}
export default Protected;
