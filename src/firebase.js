// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage} from 'firebase/messaging';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "onit-a8523.firebaseapp.com",
  projectId: "onit-a8523",
  storageBucket: "onit-a8523.appspot.com",
  messagingSenderId: "855692695400",
  appId: "1:855692695400:web:5c81f10e475bc9f40768dd",
//   measurementId: "G-4BH9SHC3SD",
//   databaseURL: "https://onit-a1529-default-rtdb.asia-southeast1.firebasedatabase.app",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let messaging
try {
    messaging = getMessaging();
    onMessage(messaging, (payload) => {
        // console.log('Message received. ', payload);
    });
} catch ( error ) {
    throw error
}
// if (messaging.isSupported()){
// //알람 사용할건지 확인하는 대화상자
// Notification
//     .requestPermission()
//     .then(function (permission) {
//         if (permission === 'granted') {
//             console.log('Notification permission granted.');
//         } else {
//             console.log('Unable to get permission to notify.');
//         }
//     });
// }

export {
    messaging,
    app
};