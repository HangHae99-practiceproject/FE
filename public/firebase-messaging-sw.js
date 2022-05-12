importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDTVH8fDXdgPh1vzMVd6_ihrSVCeYO6I4Q",
  authDomain: "onit-a1529.firebaseapp.com",
  projectId: "onit-a1529",
  storageBucket: "onit-a1529.appspot.com",
  messagingSenderId: "738179248047",
  appId: "1:738179248047:web:e52348a2b26ef46381495a",
  measurementId: "G-4BH9SHC3SD",
  databaseURL: "https://onit-a1529-default-rtdb.asia-southeast1.firebasedatabase.app",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '192x192.png'
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

