import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/Logo_horizontal 1.png";
import SignUpImg from "../../assets/image 6.png";
import "./SignUp.scss";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await signup(email, password);
      setSuccessMessage(`User created successfully! Welcome, ${userCredential.user.email}`);
      setError(null);
      // Navigate to a different page if necessary
      // navigate("/dashboard");
      navigate('/')
    } catch (err) {
      setError("Failed to create an account");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 justify-between items-center h-screen bg-[#21453c] overflow-hidden">
      <div className="col-span-1 flex flex-col p-24 mt-[-50px]">
        <p className="text-white uppercase">Welcome To</p>
        <img src={Logo} alt="" className="w-72 mt-4 invert-logo" />
        <p className="text-[#9f9f9f] mt-4">
          We help you track your organisations metrics as per the ESG
          Guidelines.
        </p>
        <p className="text-white mt-8">
          Sounds Interesting?{" "}
          <a href="#" className="text-[#469251]">
            Get in touch!
          </a>
        </p>
      </div>
      <div className="col-span-1 flex flex-col p-32 mt-[-90px] items-center">
        <img src={SignUpImg} alt="" className="w-24 relative top-3" />
        <div className="signup-container p-6 bg-[#235e4a] w-[100%] rounded-lg z-10">
          <h2 className="text-xl text-white">Sign Up</h2>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <form onSubmit={handleSubmit} className="form-container py-4">
            <div className="fields my-2 flex flex-col">
              <label htmlFor="email" className="text-white">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Your Email ID"
                name="email"
                id="email"
                className="p-3 mt-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="fields my-2 flex flex-col">
              <label htmlFor="password" className="text-white">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                className="p-3 mt-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="fields my-2 flex flex-col">
              <label htmlFor="confirm-password" className="text-white">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirm-password"
                id="confirm-password"
                className="p-3 mt-2 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="fields my-2 flex flex-col">
              <button type="submit" className="p-3 mt-4 rounded bg-[#3a9844] text-white">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
