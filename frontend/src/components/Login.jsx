import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLoginSuccess = async (response) => {
    try {
      const id_token = response.credential;
      console.log("Google ID Token:", id_token);
      
      const res = await axios.post("auth/google/", {
        token: id_token,
      });

      const data = res.data;
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      login(data.user);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary to-emerald-950">
      <img
        className="animate-pulse scale-[0.9] drop-shadow-2xl drop-shadow-cyan-900"
        src="/Logo.png"
        alt=""
      />
      <h1 className="bg-gradient-to-r from-orange-500 via-white to-green-600 text-5xl max-w-2xl font-extrabold text-center m-4 mb-8 text-transparent bg-clip-text drop-shadow-2xl drop-shadow-cyan-900 animate-pulse">
        "The One Stop Destination to all your medical needs!"
      </h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Google login failed")}
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        logo_alignment="left"
        width="300"
        locale="en"
      />
    </div>
  );
}
