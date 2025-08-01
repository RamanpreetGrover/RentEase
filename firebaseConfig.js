// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPs2Hxub8qeQ0yiEkY_q9OqWDdjt5qpzY",
  authDomain: "rentease-92b61.firebaseapp.com",
  projectId: "rentease-92b61",
  storageBucket: "rentease-92b61.firebasestorage.app",
  messagingSenderId: "289554427025",
  appId: "1:289554427025:web:59f5fb6c41f30c9ddde330"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
