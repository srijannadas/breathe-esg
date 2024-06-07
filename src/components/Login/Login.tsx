import React, { useState } from "react";
import { AuthError, getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import Logo from "../../assets/Logo_horizontal 1.png";
import SignUpImg from "../../assets/image 6.png";
import GoogleLogo from '../../assets/google logo 1.png'
import TwitterLogo from '../../assets/google logo 1 (1).png'
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')// Redirect user to dashboard or other page upon successful login
    } catch (error) {
      const authError = error as AuthError; // Cast error to AuthError type if available
      setError(authError.message ?? "An error occurred"); // Set error message from AuthError if available, otherwise set a generic message
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      navigate('/')// Redirect user to dashboard or other page upon successful login
    } catch (error) {
      const authError = error as AuthError; // Cast error to AuthError type if available
      setError(authError.message ?? "An error occurred"); 
    }
  };


  return (
    <div className="grid grid-cols-2 gap-4 justify-between items-center  h-screen bg-[#21453c] overflow-hidden">
      <div className="col-span-1 flex flex-col p-24 mt-[-50px]">
        <p className="text-white uppercase">Welcome To</p>
        <img src={Logo} alt="" className="w-72 mt-4 invert-logo" />
        <p className="text-[#9f9f9f] mt-4">
          We help you track your organisations metrics as per the ESG
          Guidelines.
        </p>
        <p className="text-white mt-8">
          Sounds Interesting?{" "}
          <a href="" className="text-[#469251]">
            {" "}
            Get in touch!{" "}
          </a>
        </p>
      </div>
      <div className="col-span-1 flex flex-col p-32 mt-[-120px] items-center">
        <img src={SignUpImg} alt="" className="w-24 relative top-3" />
        <div className="signup-container p-6 bg-[#235e4a] w-[100%] rounded-lg z-10">
          <h2 className="text-xl text-white">Login</h2>
          <div className="form-container py-4 ">
            <div className="fields my-2 flex flex-col">
              <label htmlFor="" className="text-white">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Your Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 mt-2 rounded"
              />
            </div>
            <div className="fields my-2 flex flex-col">
              <label htmlFor="" className="text-white">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 mt-2 rounded"
              />
            </div>
            <div className="fields my-4 flex border-2 rounded p-2 border-white cursor-pointer" onClick={handleGoogleLogin}>
              <img src={GoogleLogo} alt="" />
              <p className="text-white ml-2">Sign Up with Google</p>
            </div>
            <div className="fields my-4 flex border-2 rounded p-2 border-white ">
              <img src={TwitterLogo} alt="" />
              <p className="text-white ml-2">Sign Up with Twitter</p>
            </div>
            <div className="fields my-2 flex flex-col">
              {error && <p className="text-red-500">{error}</p>}
              <button onClick={handleLogin} className="p-3 mt-2 rounded bg-[#3a9844] text-white">Continue</button>
            </div>
            <div className="fields my-2 flex flex-col">
              <p className="text-white text-center">Having trouble logging in? <a href="" className="text-[#469251] underline"> Contact Us </a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
