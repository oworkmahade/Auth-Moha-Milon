// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs3WG0qXKHiMjkCwYhlCs3UBQYIX5RcFA",
  authDomain: "auth-moha-milon-e7b96.firebaseapp.com",
  projectId: "auth-moha-milon-e7b96",
  storageBucket: "auth-moha-milon-e7b96.firebasestorage.app",
  messagingSenderId: "714462955571",
  appId: "1:714462955571:web:5a27eb30c4f6e29933fb46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
