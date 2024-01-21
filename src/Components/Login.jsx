import React, { useState } from "react";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import LoadingButton from "@mui/lab/LoadingButton";
import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
const Login = () => {
    const [error, setError] = useState()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://verygood-attendance-church.onrender.com/api/v1/admin/loginAdmin",
        formData
      );

      if (res.data) {
        if (res.data.error) {
          setError(res.data.error);
          toast.error(res.data.error);
          setIsLoading(false);
          setEmail("")
          setPassword("")
        } else {
            console.log(res.data);
          localStorage.setItem("token", JSON.stringify(res.data.token));
          setEmail("");
          setPassword("");
          setIsLoading(false);
          toast.success("Logged in successfully");
          setTimeout(() => {
            navigate("/users");
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className='pt-4 flex w-[80%] flex-col items-center justify-center ss:w-full mt-[13%] mx-auto sm:w-[30%]     '
> 
        <input
          type="email"
          className='w-[80%]  bg-gray-200  h-[60px] indent-4 rounded-lg'
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter the email"
        />
        <div
        className=' bg-gray-200 w-[80%]  flex flex-row items-center h-[60px] mt-5  mb-5  rounded-lg '
        >   
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the password"
            className='w-[95%] focus:border-none bg-gray-200  indent-4 focus:outline-none'
         />
          {showPassword ? (
            <AiFillEyeInvisible
              onClick={() => setShowPassword(false)}
             className="mr-1"
            />
          ) : (
            <AiFillEye
            className="mr-1"
             onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        <LoadingButton
         className='w-[70%] h-[60px]'
          color="secondary"
          onClick={handleSubmit}
          loading={isLoading}
          loadingPosition="start"
          variant="contained"
        >
          <span>Login </span>
        </LoadingButton>

        <a
          href="/register"
          style={{ textDecoration: "none", paddingTop: "1em" }}
        >
          Don't have an account? Please sign up
        </a>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
