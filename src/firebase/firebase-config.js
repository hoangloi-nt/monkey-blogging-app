import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjrxT7RV0IkRbr0nBEFyXpoQixk_D4lbw",
  authDomain: "monkey-blogging-e9487.firebaseapp.com",
  projectId: "monkey-blogging-e9487",
  storageBucket: "monkey-blogging-e9487.appspot.com",
  messagingSenderId: "683553165013",
  appId: "1:683553165013:web:b4a6430896970ff0565c5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
