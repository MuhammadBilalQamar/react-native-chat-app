import Firebase from 'firebase';
import * as Analytics from 'expo-firebase-analytics';
import App from '../App';
// IF YOU WANT TO ADD YOUR FIREBASE PROJECT KINDLY REPLACE  THIS CONFIG WITH YOUR PROJECT ALSO ADD THIS SCRIPT IN App.json FILE
let config = {
  // its private :D :p
  apiKey: "AIzaSyCi8xMU8EqFV6m2bu7t6SfXc7DGmcbTDZA",
  authDomain: "chat-app-react-native-ee70d.firebaseapp.com",
  databaseURL: "https://chat-app-react-native-ee70d.firebaseio.com",
  projectId: "chat-app-react-native-ee70d",
  storageBucket: "chat-app-react-native-ee70d.appspot.com",
  messagingSenderId: "60000029991",
  appId: "1:60000029991:web:af9678aef9c7f7530e6d02",
  measurementId: "G-SXNXF2N183"
};
let app = Firebase.initializeApp(config);

export const db = app.database();
export const auth = app.auth();
export const storage = app.storage();
export const analytics = Analytics; //Added by muhammad asif nawaz 
//SEE WORKING OF  CRASHLYTICS IN ROOT DIRECTORY FOLDER NAMED Firebase-Crashlytics
