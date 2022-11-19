import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxXlihgepDpVSX1WycyuoOuPemVstWY8s",
  authDomain: "reactreadinglistapp.firebaseapp.com",
  projectId: "reactreadinglistapp",
  storageBucket: "reactreadinglistapp.appspot.com",
  messagingSenderId: "425063495391",
  appId: "1:425063495391:web:74a5f778d97fa8a98e9b6a",
};

// firebase
initializeApp(firebaseConfig);

// auth
const auth = getAuth();

export { auth };
