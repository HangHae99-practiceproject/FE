import React, { useState, useEffect } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

const Test = () => {
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })
  const [myLocation, setMyLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })



  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setMyLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setMyLocation((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])

  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
          position: "relative",
        }}
        level={3} // 지도의 확대 레벨
      >
        <button
            style={{
                width: "20px",
                height: "20px",
                position: "absolute",
                top: "0",
                right: "0",
                zIndex: "99"
            }}
            onClick={() =>
                setState({
                    center: { lat: myLocation.center.lat, lng: myLocation.center.lng},
                    isPanto: true,
            })}
        />
        <button
            style={{
                width: "20px",
                height: "20px",
                position: "absolute",
                top: "0",
                right: "1",
                zIndex: "99",
                background: "blue"
            }}
            onClick={() =>
              setState({
                center: { lat: 33.450701, lng: 126.570667 },
                isPanto: true,
              })
            }
        />
        {!myLocation.isLoading && (
          <MapMarker position={myLocation.center}>
            <div style={{ padding: "5px", color: "#000" }}>
              {myLocation.errMsg ? myLocation.errMsg : "여기에 계신가요?!"}
            </div>
          </MapMarker>
        )}
        <MapMarker // 마커를 생성합니다
            position={{
            // 마커가 표시될 위치입니다
            lat: 33.450701,
            lng: 126.570667,
            }}
        />
      </Map>
    </>
  )
}
 
export default Test;