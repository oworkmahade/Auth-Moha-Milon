import React, { useContext, useRef } from "react";
import { Helmet } from "react-helmet-async";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  // receiving object from AuthContext
  const authInfo = useContext(AuthContext);

  //  receive signInUser by destructuring
  const { signInUser } = authInfo;

  // receive signInWithGoogle
  const { signInWithGoogle } = authInfo;

  // state for holding email from input field using useRef
  const emailRef = useRef(null);

  // navigate hook
  const navigate = useNavigate();

  // form handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // sign in user in firebase
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        console.log("User login successful");
        e.target.reset("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
    // note: since this are promise so that we must write then and catch
  };

  // signInWithGoogle
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="my-4 ">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form
        onSubmit={handleLogin}
        className="w-1/3 p-4 mx-auto mt-6 space-y-4 border-2 rounded-lg border-slate-400"
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            id="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* password reset */}
        {/* <div className="my-4">
          <button
            type="button"
            onClick={handlePasswordReset}
            className="p-0 m-0 bg-transparent border-none cursor-pointer link link-hover"
            style={{ background: "none", border: "none" }}
          >
            Forgot password?
          </button>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      {/* Login Link */}
      <p className="mt-4 text-sm text-center">
        Register if you don't have an account.{" "}
        <span className="text-blue-500 cursor-pointer hover:underline">
          <Link to="/register">
            <button type="button"> Register</button>
          </Link>
        </span>
      </p>

      <div className="flex flex-row items-center justify-center mt-4">
        <input
          onClick={handleGoogleSignIn}
          type="submit"
          value="Google Login"
          className="btn"
        />
      </div>
    </div>
  );
};

export default Login;
