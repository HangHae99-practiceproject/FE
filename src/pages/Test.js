import React, { useState, useEffect } from 'react'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import styled from 'styled-components';
import { dest_marker } from '../img';

const Test = (props) => {
    const [state, setState] = useState({
        center: {
            lat: props.lat,
            lng: props.lng,
        },
        errMsg: null,
        isLoading: true,
    })
    const [dest, setDest] = useState({
        center: {
            lat: props.lat,
            lng: props.lng,
        },
        errMsg: null,
        isLoading: true,
    })

    return (
        <>
            <Map // 지도를 표시할 Container
                center={state.center}
                style={{
                    // 지도의 크기
                    width: "100%",
                    height: "100%",
                }}
                level={4} // 지도의 확대 레벨
            >
                <MapMarker
                    position={
                        dest.center
                    }
                    image={{
                        src: dest_marker,
                        size: { width: 33, height: 33 },
                    }}
                />
                    <CustomOverlayMap position={dest.center}>
                    <Dest>
                        {props.name}
                    </Dest>
                    </CustomOverlayMap>
            </Map>
        </>
    )
}

const Dest = styled.div`
background-color: black;
color: white;
padding: 9px;
border-radius: 5px;
margin-bottom: 110px;
`;

export default Test;