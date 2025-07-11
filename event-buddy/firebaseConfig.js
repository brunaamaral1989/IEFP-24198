import firebase from "firebase";
 
const firebaseConfig = {

  apiKey: "AIzaSyCKr9vAsfdPtC_WhVqyZKn5-iOsN149MX8",

  authDomain: "event-buddy-31f61.firebaseapp.com",

  projectId: "event-buddy-31f61",

  storageBucket: "event-buddy-31f61.firebasestorage.app",

  messagingSenderId: "1076639791241",

  appId: "1:1076639791241:web:293033df35200bedc66e58",

  measurementId: "G-8DYB80G7RD"

};

 
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
 
export const database = firebase.firestore();
export const auth = firebase.auth();