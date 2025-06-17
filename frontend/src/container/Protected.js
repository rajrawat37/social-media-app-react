import { Navigate } from "react-router-dom";
import { fetchUser } from "../utils/fetchUser";

const userInfo = fetchUser();
const isLoggedIn = userInfo !== null ? true : false;

console.log("🔓 User is logged in ?", isLoggedIn);

function Protected(props) {
  const { Component } = props;
  return <>{isLoggedIn ? <Component /> : <Navigate to={"/login"} />}</>;
}
export default Protected;
