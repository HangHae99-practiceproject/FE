import { messaging } from './firebase'
import { getToken } from 'firebase/messaging'


getToken(messaging, { vapidKey: "BLg2NeG06gdfa1DbdDn1E6VFSD8a82zuaxgPXS5drdMaqUSf_lY421iglOkbev53HaDsl2jkw5vxgMaA4b6wfug"})
.then((currentToken) => {
  if (currentToken) {

  } else {
    console.log('저장된 토큰이 없어요, 토큰을 발급받으세요')
  }
}).catch((err) => {
  console.log('왠지 모르지만 토큰을 불러올수 없네', err);
})