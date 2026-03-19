import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "../components/firebase/firebase.config";

// creating Context and export it
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

// creating Provider
const AuthProvider = ({ children }) => {
  // 01. User Registration part
  // 02. User Sign In Part

  //  state declaration
  const [user, setUser] = useState(null);

  //  Registration part
  // it will return createUserWithEmailAndPassword  with three parameter named auth, email, password. auth will get and will pass email and password as parameter

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login / Sign In Part
  // it will return signInWithEmailAndPassword  with three parameter named auth, email, password. auth will get and will pass email and password as parameter

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // observe auth state change
  // unSubscribe is a variable act as a spy for future disconnection
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(
        "observing current user inside useEffect of AuthProvider",
        currentUser,
      );
    });

    return () => {
      unSubscribe();
    };
  }, []);

  // Sign Out
  // we will declare function named logOut because if signOut it will clash with firebase signOut

  const logOut = () => {
    return signOut(auth);
  };

  // value for using from different part of the projects
  const authInfo = {
    user,
    createUser,
    signInUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
