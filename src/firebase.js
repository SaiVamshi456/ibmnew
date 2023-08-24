// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8NEZ4Ma1-hiAEoeL6p08zGNAiseZ56S4",
  authDomain: "ibm-hack-456.firebaseapp.com",
  projectId: "ibm-hack-456",
  storageBucket: "ibm-hack-456.appspot.com",
  messagingSenderId: "881465970618",
  appId: "1:881465970618:web:2cecb9d3fa837449131783",
  measurementId: "G-W6F05TD48Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, auth, storage };
