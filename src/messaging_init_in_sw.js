import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDTVH8fDXdgPh1vzMVd6_ihrSVCeYO6I4Q",
    authDomain: "onit-a1529.firebaseapp.com",
    projectId: "onit-a1529",
    storageBucket: "onit-a1529.appspot.com",
    messagingSenderId: "738179248047",
    appId: "1:738179248047:web:e52348a2b26ef46381495a",
    measurementId: "G-4BH9SHC3SD",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);