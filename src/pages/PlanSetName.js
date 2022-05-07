import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPlanId, setSoketClear } from '../redux/modules/map.js';
import { setUserName } from '../redux/modules/user.js';
import Plansocket from './Plansocket.js';

import Stomp from "stompjs";
import SockJS from "sockjs-client";
import PlanMap from './PlanMap.js';

const token = localStorage.getItem("token");

const PlanSetName = props => {
  const dispatch = useDispatch();
  const userNick = document.cookie.split("=")[1];
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const planName = useSelector(state => state.map.planName)
  const [message, setMessage] = useState("");
  // const [lat, setLat] = React.useState(null);
  // const [lng, setLng] = React.useState(null);
  // const [status, setStatus] = React.useState(null);

  const planId = useSelector(state => state.map.planId)
  const path = useParams(); //path주소 받아오기 랜덤URL

  // const getLocation = () => {
  //   if (!navigator.geolocation) {
  //     // navigator.geolocation 지원하지 않을 경우
  //     setStatus('위치를 확인할 수 없습니다.');
  //   } else {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setStatus(null);
  //       // 위도
  //       setLat(position.coords.latitude);
  //       // 경도
  //       setLng(position.coords.longitude);
  //     }, () => {
  //       setStatus('Unable to retrieve your location');
  //     });
  //   }
  // }

  useEffect(() => {
    dispatch(getPlanId(path.url));
    // getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    let sock = new SockJS('https://imonint.shop/ws');
    let ws = Stomp.over(sock);
//    function ConnectSub(token) {
//     try {
//       ws.connect({
//         token: token
//       }, () => {
//           ws.subscribe(
//             `/topic/map/${planId}`,
//             (response) => {
//               console.log("받은 메세지", response);
//               const newMessage = JSON.parse(response.body);
//               console.log("받은 메세지", newMessage);
//             },
//             {
//                 token: token
//             }
//           );
//         }
//       );
//     } catch (error) {
//       console.log("fdfdfdfdf", error.response);
//     }
//   }

//   function DisConnectUnsub() {
//     try {
//       ws.disconnect( {
//         Headers: {
//         Authorization: `${token}`,
//       }},
//         () => {
//           ws.unsubscribe('sub-0');
//         },
//         { token: token }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   React.useEffect(() => {
//     ConnectSub(token);
//     return () => {
//       DisConnectUnsub();
//     };
//   }, []);


//   const onSend = async () => {
//   try {
//     // 보낼 데이터
//     const message = {
//       planId: planId,
//       lng: lng,
//       lat: lat,
//       sender: userNick,
//       type: 'ENTER',
//     }
//     console.log(message)
//     waitForConnection(ws, function () {
//       // 콘솔창에 메세지 출력되지 않도록 설정
//       // ws.debug = null;
//       ws.send(
//         '/maps/enter',
//         {},
//         JSON.stringify(message)
//       );
//     });
//   } catch (error) {
//     // console.log(error.response);
//   }
// }

//   function waitForConnection(ws, callback) {
//     setTimeout(
//       function () {
//         if (ws.ws.readyState === 1) {
//           callback();
//         } else {
//           waitForConnection(ws, callback);
//         }
//       },
//       1
//     );
//   }

  return (
    <div>
      <h1>약속정보</h1>
      <Plansocket
      userNick={userNick}
      planId={planId}
      planName={planName}
      path={path}
      client={ws}
      sock={sock}
      />
      {/* <button onClick={onSend}> 보내기</button> */}
    </div>
  );
}

// 스타일 컴포넌트 작성 위치
// eslint-disable-next-line no-unused-vars
const StyleComponent = styled.div``;
const Section = styled.div`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.laptop} {
    border-radius: 40px 40px 0px 0px;
  }
`;

const MainModal = styled.div`
  position: absolute;
  width: 80%;
  height: 30%;
  background-color: white;
  border-radius: 15px;
`;
const ModalPopup = styled.div`
  height: 100%;
`;
const ModalText = styled.div`
  height: calc(100% - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ModalButton = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
`;
const ModalButtonOk = styled.div`
  height: 40px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  border: 1px solid #9e9e9e;
  border-radius: 0px 0px 15px 15px;
`;

// default props 작성 위치
PlanSetName.defaultProps = { islogin: false, userNick: '' };
export default PlanSetName;