import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import auth from "../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  // state or showing password
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    //   pick value from input field starts
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const termsChecked = e.target.terms.checked;
    //   pick value from input field ends

    //  email validation no need because it automatically validates since input field type is email

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

    // checkbox validation start here
    if (!termsChecked) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }
    //  checkbox validation ends here

    /***User Creation using firebase ***/
    // https://firebase.google.com/docs/auth/web/password-auth
    // Web > Password Authentication > Create a password-based account

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        e.target.reset("");
        toast.success("User created successfully");
        console.log(user);

        // update profile at this time starts here
        // https://firebase.google.com/docs/auth/web/manage-users
        // Web > Manage Users > Update a user's profile
        updateProfile(user, {
          displayName: name,
          photoURL: "https://i.ibb.co.com/LdhPKfrb/main-image-hasan.jpg",
        })
          .then(() => toast.success("Profile Updated"))
          .catch((error) => toast.error(error.message));

        // update profile at this time ends here

        // send Verification email  at this time starts
        sendEmailVerification(user)
          .then(() => toast.success("Email verification sent!"))
          .catch((error) => toast.error(error.message));
        // send Verification email  at this time ends
      })
      .catch((error) => {
        toast.error(error.message);
      });

    console.log(name, email, password, termsChecked);
  };

  return (
    <div className="my-4 ">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <form
        onSubmit={handleRegister}
        className="w-1/3 p-4 mx-auto mt-6 space-y-4 border-2 rounded-lg border-slate-400"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your full name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute p-2 text-xl text-gray-600 border-none cursor-pointer right-3 top-1 bg-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2">
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <a className="link link-hover" href="/terms-and-conditions">
              terms and conditions
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-sm text-center">
          Already have an account?{" "}
          <a
            className="text-blue-500 cursor-pointer hover:underline"
            href="/login"
          >
            Login
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

export default Register;
