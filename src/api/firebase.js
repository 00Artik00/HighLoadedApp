import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBSO9NKk8FkB38Hx3nVnzvo49F1Zef8RW8",
  authDomain: "gbchat-d50c2.firebaseapp.com",
  databaseURL: "https://gbchat-d50c2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gbchat-d50c2",
  storageBucket: "gbchat-d50c2.appspot.com",
  messagingSenderId: "977440942047",
  appId: "1:977440942047:web:2791c8111397b08555066a",
  measurementId: "G-4SP1G0911T"
};

export const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const database = getDatabase(firebase);
