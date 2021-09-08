import firebase from "firebase/app";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyBdUY9UIaYnjBt5E16cIrrwD46Hzp0Rzsk",
  authDomain: "expotech-c05c6.firebaseapp.com",
  databaseURL: "https://expotech-c05c6.firebaseio.com",
  projectId: "expotech-c05c6",
  storageBucket: "expotech-c05c6.appspot.com",
  messagingSenderId: "1069544546059",
  appId: "1:1069544546059:web:b963cbcd38b33ce10e4c0e",
  measurementId: "G-TTHY639N90",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
