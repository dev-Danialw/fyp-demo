import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRezRneL8wVmNNKRqhvKlB35QXFS_X4so",
  authDomain: "anti-norcotics.firebaseapp.com",
  projectId: "anti-norcotics",
  storageBucket: "anti-norcotics.appspot.com",
  messagingSenderId: "764751912959",
  appId: "1:764751912959:web:44d31756ce0c72455611ca",
  measurementId: "G-LW2SCL1VEQ",
};

// firebase
initializeApp(firebaseConfig);

// firestore
const db = getFirestore();

// auth
const auth = getAuth();

export { auth, db };
