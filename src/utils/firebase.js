import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
var config = {
  apiKey: "AIzaSyBi9M4M-PIZUbxFlhOlrAzRwZQju3l3kS4",
  authDomain: "real-fbapp.firebaseapp.com",
  databaseURL: "https://real-fbapp.firebaseio.com",
  projectId: "real-fbapp",
  storageBucket: "real-fbapp.appspot.com",
  messagingSenderId: "948133707967",
  appId: "1:948133707967:web:3754ebef34d73460"
};
// Initialize Firebase
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export default firebase;
