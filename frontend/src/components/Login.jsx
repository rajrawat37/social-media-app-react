import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import login from "../assets/login.mp4";
import logoipsum from "../assets/logoipsum.svg";
import jwt_decode from "jwt-decode";
import { client } from "../client";
import "../index.css";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    //decode the response credentials

    const token = response.credential;
    localStorage.setItem("token", token);
    console.log("🔐 -- 🔐", token);

    const decoded = jwt_decode(token);
    console.log("🔐 -- ✅", decoded);

    //setting user data to localStorage
    //Keeps the user logged in even after refreshing or revisiting the page.
    //You don't need to decode the token every time — just read from localStorage.
    localStorage.setItem("user", JSON.stringify(decoded));

    // destruct the {name,pic,sub}
    const { email, name, picture, sub } = decoded;

    // Sending response to backend API
    try {
      const res = await fetch("http://localhost:4000/api/auth/authGoogle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: sub,
          userName: name,
          image: picture,
          email: email,
        }),
      });

      if (!res.ok) {
        throw new Error("❌ Failed to save user ❌");
      }

      if (res.status === 201) {
        toast.success("User registered!", {
          autoClose: 1500, // Toast closes after 1.5 seconds
        });
      } else if (res.status === 200) {
        toast.info("User logged in!", {
          autoClose: 500, // Toast closes after 1.5 seconds
        });
      } else {
        toast.warning("Unexpected response", {
          autoClose: 1500, // Toast closes after 1.5 seconds
        });
      }
    } catch (error) {
      toast.error("🚫 Error saving user!");
    }

    //navigate to Home page
    navigate("/", { replace: true });
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
              <>
                {/* This is Google Login Button component */}
                <GoogleLogin
                  onSuccess={(response) => responseGoogle(response)}
                  onError={() => console.log("Error")}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
