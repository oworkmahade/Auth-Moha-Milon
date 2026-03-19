import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Register = () => {
  // receiving object from AuthContext
  const authInfo = useContext(AuthContext);

  // receive createUser by destructuring
  const { createUser } = authInfo;

  // state or showing password
  const [showPassword, setShowPassword] = useState(null);
  const handleRegister = (e) => {
    e.preventDefault();
    //   pick value from input field starts
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const termsChecked = e.target.terms.checked;
    console.log(name, email, password, termsChecked);

    // create user in firebase
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });

    // note: since this are promise so that we must write then and catch
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
          <span className="text-blue-500 cursor-pointer hover:underline">
            <Link to="/login">
              <button type="button"> Login </button>
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
