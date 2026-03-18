import React from "react";
import { NavLink } from "react-router-dom";

const activeClass = ({ isActive }) =>
  isActive ? "text-green-600 border-2 border-green-600 p-1" : "text-gray-600";

const Header = () => {
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
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Header;
