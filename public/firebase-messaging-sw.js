/* eslint-disable no-restricted-globals */
self.addEventListener('install', e => {
    console.log('서비스워커 install함!', e);
  });
  self.addEventListener('activate', e => {
    console.log('서비스워커 activate 시작됨!', e);
  });
  self.addEventListener('fetch', e => {
    // console.log("데이터 요청!(fetch)", e.request);
  });
  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      // console.log('message', event);
      self.skipWaiting();
    }
  });
  // Any other custom service worker logic can go here.
  self.addEventListener('push', function (event) {
    // console.log(event);
    // console.log(event.data.json());
    const title = event.data.json().notification.title;
    const options = {
      body: event.data.json().notification.body,
      // icon: 'icons/momo192 x192.png',
    };
    // event.waitUntil(self.registration.showNotification(title, options)); // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
    event.waitUntil(self.registration.showNotification(title, options)); // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
  });
  self.addEventListener('notificationclick', function (event) {
    // console.log('notificationclick', event);
    event.notification.close();
    event.waitUntil(
      self.clients.openWindow(
        `https://onit-a1529.firebaseapp.com/main`,
        // 'https//localhost:3000',
        // /plan/${
        //   event.notification.body.split('!\n')[1]
        // }`,
      ),
      // self.clients.openWindow(event.notification.data.url),
    );
  });
  // import { initializeApp } from "firebase/app";
  // import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
  // // Initialize the Firebase app in the service worker by passing in
  // // your app's Firebase config object.
  // // https://firebase.google.com/docs/web/setup#config-object
  // const firebaseApp = initializeApp({
  //   apiKey: "AIzaSyBTwSgVb4te8rw917dbGQsIAPzVExk56LE",
  //   authDomain: "test-pwa-b91b2.firebaseapp.com",
  //   projectId: "test-pwa-b91b2",
  //   storageBucket: "test-pwa-b91b2.appspot.com",
  //   messagingSenderId: "1037402900826",
  //   appId: "1:1037402900826:web:f268fc128ed5fe0aee0b63",
  // });

  // // Retrieve an instance of Firebase Messaging so that it can handle background
  // // messages.
  // const messaging = getMessaging(firebaseApp);

  // onBackgroundMessage(messaging, (payload) => {
  //   console.log(
  //     "[firebase-messaging-sw.js] Received background message ",
  //     payload
  //   );
  //   // Customize notification here
  //   const notificationTitle = "Background Message Title";
  //   const notificationOptions = {
  //     body: "Background Message body.",
  //     icon: "/firebase-logo.png",
  //   };

  //   self.registration.showNotification(notificationTitle, notificationOptions);
  // });