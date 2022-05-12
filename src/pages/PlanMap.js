/* eslint-disable no-undef */
import React, {forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState,} from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme.js';
import Headerbar from '../shared/Headerbar.js';
import { useNavigate } from 'react-router-dom';

//카카오 맵
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import PlanMapInfo from './PlanMapInfo.js';
import { dest_marker, my_marker } from '../img'

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

  const PlanMap = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
      sendMyLocationfun() {
        sendMyLocation();
      },
      setDestpoint(payload) {
        const data = points.concat({
          lat: parseFloat(payload.lat),
          lng: parseFloat(payload.lng),
        });
        setPoints(data);
      },
    }));
    // const PlanMap = props => {
    const navigate = useNavigate();
    const planId = props.planId;
    const locationName = props.locationName
    const stompClient = props.client;
    const useInterval = (callback, delay) => {
      const savedCallback = useRef();

      // Remember the latest function.
      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);

      // Set up the interval.
      useEffect(() => {
        function tick() {
          savedCallback.current();
        }
        if (delay !== null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
      }, [delay]);
    };


    //소켓관련
    const publicMaps = props.publicMaps;

    const [info, setInfo] = useState();
    const [position, setPosition] = useState();
    const [userData, setUserData] = useState({
      sender: '',
      connected: false,
      content: '',
    });
    useEffect(() => {
      return () => {};
    }, [publicMaps]);

    //지도 관련
    const [map, setMap] = useState();
    const [myLocation, setSetMyLocation] = useState({
      center: {
        lat: 37.5172,
        lng: 127.0473,
      },
      errMsg: null,
      isLoading: true,
    });
    const [points, setPoints] = useState();

    //위치보내기
    const sendMyLocation = () => {
      if (stompClient) {
        let chatMessage = {
          sender: props.usernick,
          lat: myLocation.center.lat,
          lng: myLocation.center.lng,
          type: 'MAP',
          planId: planId,
        };
        stompClient.send('/maps/map.send', {}, JSON.stringify(chatMessage));
        setUserData({ ...userData, lat: '', lng: '' });
      }
    };

    //내위치 반복 보내기
    useInterval(() => {
      sendMyLocation();
    }, 3000);
    // eslint-disable-next-line no-unused-vars
    const bounds = useMemo(() => {
      const bounds = new kakao.maps.LatLngBounds();
      if (points) {
        points.forEach(point => {
          bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
        });
      }

      return bounds;
    }, [points]);
    useEffect(() => {
      //현재 내위치 얻기
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(
          position => {
            setSetMyLocation(prev => ({
              ...prev,
              center: {
                lat: position.coords.latitude.toFixed(5), // 위도
                lng: position.coords.longitude.toFixed(5), // 경도
              },
              isLoading: false,
            }));
          },
          err => {
            setSetMyLocation(prev => ({
              ...prev,
              errMsg: err.message,
              isLoading: false,
            }));
          },
        );
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        setSetMyLocation(prev => ({
          ...prev,
          errMsg: 'geolocation을 사용할수 없어요..',
          isLoading: false,
        }));
      }
      setPoints([myLocation.center]);
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <Headerbar
          text={'실시간 위치 공유'}
          _onClickClose={() => {
            navigate('/main', { replace: true });
          }}
        ></Headerbar>
        
        <Map // 지도를 표시할 Container
          center={myLocation.center}
          style={{
            // 지도의 크기
            width: '100%',
            height: '90%',
            position: "absolute",
            bottom: 0
          }}
          level={3} // 지도의 확대 레벨
          onCreate={setMap}
          onClick={() => {
            setInfo(false);
            setPosition(undefined);
          }}
        >
          {!myLocation.isLoading && <MapMarker image={{
                          src: my_marker,
                          size: { width: 33, height: 33 },
                        }} position={myLocation.center} />}
          {publicMaps &&
            publicMaps.map((chat, index) => (
              <>
                {chat.type === 'MAP' && (
                  <>
                    {chat.sender === props.usernick ? (
                      <>
                      <MapMarker
                        key={'map' + index}
                        position={{ lat: chat.lat, lng: chat.lng }}
                        image={{
                          src: my_marker,
                          size: { width: 33, height: 33 },
                        }}
                      />
                      <CustomOverlayMap position={{ lat: chat.lat, lng: chat.lng }}>
                        <Info className='userNick'>{chat.sender}</Info>
                      </CustomOverlayMap>
                      </>
                    ) : (
                      <MapMarker
                        key={'map' + index}
                        position={{ lat: chat.lat, lng: chat.lng }}
                        image={{
                          src: my_marker,
                          size: { width: 33, height: 33 },
                        }}
                        onClick={() => {
                          setInfo(true);
                          setPosition({
                            lat: chat.lat,
                            lng: chat.lng,
                            sender: chat.sender,
                          });
                        }}
                      />
                    )}
                  </>
                )}
                {chat.type === 'DEST' && (
                  <>
                  <MapMarker
                    key={'DEST' + index}
                    position={{
                      lat: parseFloat(chat.destLat).toFixed(5),
                      lng: parseFloat(chat.destLng).toFixed(5),
                    }}
                    image={{
                      src: dest_marker,
                      size: { width: 33, height: 33 },
                    }}
                  /><CustomOverlayMap
                      position={{
                      lat: parseFloat(chat.destLat).toFixed(5),
                      lng: parseFloat(chat.destLng).toFixed(5),
                    }}>
                    <Info>{locationName}</Info>
                  </CustomOverlayMap>
                  </>
                )}
              </>
            ))}
          {position && (
            <Section>
              <PlanMapInfo map={map} position={position} />
            </Section>
          )}
        </Map>
      </>
    );
  });

// 스타일 컴포넌트 작성 위치
const Section = styled.div`
  position: absolute;
  bottom: 5%;
  box-sizing: border-box;
  width: 100%;
  height: 15%;
  z-index: 99;
  background-color: ${theme.color.white};
  /* display: flex; */
  /* justify-content: center; */
  align-items: center;
`;

const Info = styled.div`
background-color: black;
color: white;
margin-bottom: 100px;
padding: 5px;
border-radius: 10px;
font-family: pretendard;
`;
  // default props 작성 위치
  PlanMap.defaultProps = {};

  export default PlanMap;