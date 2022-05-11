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
    console.log(event);
    // console.log(event.data.json());
    const title = event.data;
    // const options = {
    //   body: event.data.json().notification.body,
    //   icon: '192x192.png',
    // };
    // event.waitUntil(self.registration.showNotification(title, options)); // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
    event.waitUntil(self.registration.showNotification(title)); // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
  });