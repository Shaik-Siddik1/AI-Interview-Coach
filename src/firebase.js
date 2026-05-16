// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWMu0DPTJ2LIqJxD_EtKEdSSQX6PRSELY",
  authDomain: "ai-interview-coach-1498f.firebaseapp.com",
  projectId: "ai-interview-coach-1498f",
  storageBucket: "ai-interview-coach-1498f.firebasestorage.app",
  messagingSenderId: "1053000235",
  appId: "1:1053000235:web:2159ada726f008e520206e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;