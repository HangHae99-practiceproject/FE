import React, { useState } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from '../firebase';

const FCMtoken = () => {
  let swRegist = null;
  // eslint-disable-next-line no-unused-vars
  const [Token, setToken] = useState(null);

  const FCMtoken = sessionStorage.getItem('FCMtoken') ? false : true;
  if (FCMtoken)
    getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    }).then(token => {
      setToken(token);
      sessionStorage.setItem('FCMtoken', token);
      swRegist = messaging.swRegistration;
    });

  // eslint-disable-next-line no-unused-vars
  function unsubscribe() {
    swRegist.pushManager
      .getSubscription()
      .then(subscription => {
        if (subscription) {
          return subscription // 토글 시 메세지 안날라오게 하는 방법
            .unsubscribe()
            .then(res => {})
            .catch(err => {
              console.log(err);
            });
        }
      })
      .then(() => {})
      .catch(error => {
        console.log('Error unsubscribing', error);
      });
  }
  return (
    <>
      {/* <div>fcm</div> */}
      {/* <div>{Token}</div> */}
    </>
  );
};
export default FCMtoken;