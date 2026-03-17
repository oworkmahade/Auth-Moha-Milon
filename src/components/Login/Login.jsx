import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import auth from "../firebase/firebase.config";

const Login = () => {
  // state for holding email from input field using useRef
  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    //   password validation starts here
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must have uppercase, lowercase, digit, special char, and 6+ chars",
      );
      return;
    }
    //   password validation ends here

    // User login/signIn using  firebase starts here
    // https://firebase.google.com/docs/auth/web/password-auth
    // Web > Password Authentication > Sign in a user with an email address and password

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;

        // email verification check at times of sign In
        if (!user.emailVerified) {
          toast.error("Verified email first");
          return;
        }

        e.target.reset("");
        toast.success("login successfully");
        console.log(user);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    // User login/signIn using  firebase ends here
  };

  // password reset start here
  //   Since form onSubmit is not working, we need to get the email from the input field and validate it manually.”
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePasswordReset = () => {
    const email = emailRef.current.value; // catch email

    // email validation
    if (!email) {
      toast.error("Please enter an email address");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // password reset email using firebase
    // https://firebase.google.com/docs/auth/web/manage-users
    // Web > Manage Users > Send a password reset email

    sendPasswordResetEmail(auth, email)
      .then(() => toast.success("Password reset email sent!"))
      .catch((error) => toast.error(error.message));
  };
  // password reset ends here

  return (
    <div className="my-4">
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
        <div className="my-4">
          <button
            type="button"
            onClick={handlePasswordReset}
            className="p-0 m-0 bg-transparent border-none cursor-pointer link link-hover"
            style={{ background: "none", border: "none" }}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>

        {/* Login Link */}
        <p className="text-sm text-center">
          Register if you don't have an account.{" "}
          <a
            className="text-blue-500 cursor-pointer hover:underline"
            href="/register"
          >
            Register
          </a>
        </p>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </form>
    </div>
  );
};

export default Login;
