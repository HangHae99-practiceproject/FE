import React, {useState} from "react";
import {Map} from 'react-kakao-maps-sdk'


const KakaoMap = (props) => {
  const [map, setMap] = useState()
  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: props.lat,
        lng: props.lng,
      }}
      style={{
        width: "100%",
        height: "250px",
      }}
      level={3}
      onCreate={setMap}
    >
    </Map>
  )
}
export default KakaoMap;
