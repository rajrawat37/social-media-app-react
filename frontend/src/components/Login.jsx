import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.mp4";
import logoipsum from "../assets/logoipsum.svg";
import jwt_decode from "jwt-decode";
import { client } from "../client";
import "../index.css";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {

    //decode the response credentials
    const decoded = jwt_decode(response.credential);

    //setting user data to localStorage
    localStorage.setItem("user", JSON.stringify(decoded));

    // destruct the {name,pic,sub}
    const { name, picture, sub } = decoded;

    //creating a doc of type user
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    //creating a doc if it does not exist
    client.createIfNotExists(doc).then(() => {
      console.log("🌼 Creating client 🌼");
    });
    
    //navigate to home page
    navigate("/",{replace: true});
  };

  const user = false;

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <div className="flex h-screen w-screen ">
        <div className="flex w-screen">
          <video
            src={login}
            type="video/mp4"
            loopflex
            justify-start
            items-center
            flex-col
            h-screen
            controls={false}
            muted
            autoPlay
            className="w-full object-cover "
          />
        </div>
        <div className="absolute flex flex-col justify-center items-center backdrop-brightness-50 w-full h-full">
          <div className="">
            <img src={logoipsum} alt="logo" width="130px" />
          </div>
          <div className="shadow-2xl mt-3 flex rounded-lg bg-white">
            {user ? (
              <div> Logged In </div>
            ) : (
              <GoogleLogin
                onSuccess={(response) => responseGoogle(response)}
                onError={() => console.log("Error")}
              />
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
