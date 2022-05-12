import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {setPublicMaps, setPublicChats, setSoketClear} from '../redux/modules/map.js';
import PlanMap from './PlanMap.js';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Plansocket = props => {
  const dispatch = useDispatch();
  const locationName = props.locationName;
  const pId = props.planId;
  const sock = props.sock;
  const client = props.client;
  const usernick = props.userNick;
  const [myLocation, setMyLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })

  const [userData, setUserData] = useState({
    sender: '',
    connected: false,
    message: null,
  });

  const publicChats = useSelector(state => state.map.publicChats);
  const publicMaps = useSelector(state => state.map.publicMaps);
  const MapRef = useRef();
  //웹소켓 pId 정보를 얻을때 연결 진행하기
  useEffect(() => {
    connect();
    return () => {
      if (client.connected) {
        client.unsubscribe();
        client.disconnect();
        dispatch(setSoketClear());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pId]);

  //웹소켓 연결 함수
  const connect = () => {
    client.debug = null;
    client.connect({}, onConnected, onError);
    sock.addEventListener('open', () => {
      // console.log('Connected to Browser!!!😀');
    });
    // sock.addEventListener('message', message => {
    //   console.log('Got this:', message, '😀');
    // });
    sock.addEventListener('close', () => {
      // console.log('Disconnected to Server😀');
    });
  };

  //연결
  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    //구독
    client.debug = null;
    // client.subscribe(`/topic/chat/${planId}`, onMessageReceived, onError);
    client.subscribe(`/topic/map/${pId}`, onMessageReceived2, onError);

    userJoin();
    // console.log('연결 / 구독 / 유저 입장');
  };


  //보낸정보 서버에서 응답값 받기
  const onMessageReceived2 = payload => {
    let payloadData = JSON.parse(payload.body);
    // console.log('payloadDataMap=', payloadData);
    if (payloadData.chats && payloadData.sender === usernick) {
      // eslint-disable-next-line array-callback-return
      payloadData.chats.map((chat, index) => {
        dispatch(setPublicChats(chat));
      });
    }
    if (payloadData.type === 'ENTER' || payloadData.type === 'CHAT') {
      dispatch(setPublicChats(payloadData));
      // if (MapRef.current) MapRef.current.sendMyLocation();
    }

    if (payloadData.type === 'MAP' || payloadData.type === 'DEST') {
      dispatch(setPublicMaps(payloadData));
      if (payloadData.type === 'MAP') {
        // eslint-disable-next-line no-unused-vars
        const data = {
          lat: payloadData.lat,
          lng: payloadData.lng,
        };
      }
      if (payloadData.type === 'DEST') {
        if (MapRef.current) MapRef.current.sendMyLocationfun();
        const data = {
          lat: payloadData.destLat,
          lng: payloadData.destLng,
        };
        MapRef.current.setDestpoint(data);
      }
    }
  };
  const onError = err => {
    // console.log('Error', err);
  };

  const userJoin = () => {
    let chatMessage = {
      sender: usernick,
      planId: pId,
      lat: myLocation.center.lat,
      lng: myLocation.center.lng,
      type: 'ENTER',
    };
    setUserData({
      ...userData,
      sender: usernick,
      planId: pId,
      connected: true,
    });
    client.send('/maps/enter', {}, JSON.stringify(chatMessage));
  };

  return (
    <>
      <PlanMap
        ref={MapRef}
        client={client}
        publicChats={publicChats}
        publicMaps={publicMaps}
        planId={pId}
        locationName={locationName}
        usernick={usernick}
      />
    </>
  );
};


// 스타일 컴포넌트 작성 위치
// eslint-disable-line no-unused-vars
const StyleComponent = styled.div``;

export default Plansocket;