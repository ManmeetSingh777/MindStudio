// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7QNAlW2lB1e7PkzwyX9t9ShzVbV66o7M",
  authDomain: "mind-studio-ac63c.firebaseapp.com",
  projectId: "mind-studio-ac63c",
  storageBucket: "mind-studio-ac63c.appspot.com",
  messagingSenderId: "802922998971",
  appId: "1:802922998971:web:4c5c7c810d4b7623678d9e",
  measurementId: "G-74ZDZZL9GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize other Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, analytics };
