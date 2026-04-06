// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFE5AJPkX8CN-JfhEZqJBxLvbp83xcGu8",
  authDomain: "e-commerce-3be45.firebaseapp.com",
  projectId: "e-commerce-3be45",
  storageBucket: "e-commerce-3be45.firebasestorage.app",
  messagingSenderId: "631067627465",
  appId: "1:631067627465:web:44d8c6977f28e18b166218",
  measurementId: "G-BDN2V5H90T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}