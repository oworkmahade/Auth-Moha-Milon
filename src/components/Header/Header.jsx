import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const activeClass = ({ isActive }) =>
  isActive ? "text-green-600 border-2 border-green-600 p-1" : "text-gray-600";

const Header = () => {
  // getting user details by useContext
  const { user, logOut } = useContext(AuthContext);
  console.log(user?.email);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("logged out successfully"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="text-xl btn btn-ghost">Moha Milon</a>
      </div>
      <div className="flex-row hidden navbar-center lg:flex">
        <ul className="flex flex-row gap-4 p-2">
          <li>
            <NavLink to="/" className={activeClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={activeClass}>
              login
            </NavLink>
          </li>
          <li>
            <NavLink to="register" className={activeClass}>
              Register
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user && <span>{user.email}</span>}
        <a onClick={handleLogOut} className="btn btn-sm">
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default Header;
