import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // ✅ Wait until auth check finishes
  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  //   "At first PrivateRoutes runs. It checks authentication. If the user is logged in, it renders the child component (Orders). Otherwise, it redirects to the login page."

  // ❌ Only redirect AFTER loading is false
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoutes;
