import React, {useState} from "react";
import {Map, MapMarker, CustomOverlayMap} from 'react-kakao-maps-sdk'
import { dest_marker } from "../img";
import styled from 'styled-components';

const KakaoMap = (props) => {
  const [map, setMap] = useState()
  const [state, setState] = useState({
    center: {
        lat: props.lat,
        lng: props.lng,
    },
    errMsg: null,
    isLoading: true,
  })
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
                <MapMarker
                position={
                    state.center
                }
                image={{
                    src: dest_marker,
                    size: { width: 33, height: 33 },
                }}
                />
                    <CustomOverlayMap position={state.center}>
                    <Dest>
                        {props.place}
                    </Dest>
                    </CustomOverlayMap>
    </Map>
  )
}

const Dest = styled.div`
background-color: black;
color: white;
padding: 9px;
border-radius: 5px;
margin-bottom: 110px;
`;
export default KakaoMap;
