// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage} from 'firebase/messaging';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTVH8fDXdgPh1vzMVd6_ihrSVCeYO6I4Q",
  authDomain: "onit-a1529.firebaseapp.com",
  projectId: "onit-a1529",
  storageBucket: "onit-a1529.appspot.com",
  messagingSenderId: "738179248047",
  appId: "1:738179248047:web:e52348a2b26ef46381495a",
  measurementId: "G-4BH9SHC3SD",
  databaseURL: "https://onit-a1529-default-rtdb.asia-southeast1.firebasedatabase.app",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let messaging
try {
    messaging = getMessaging();
    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
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