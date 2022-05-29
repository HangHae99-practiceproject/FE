import React, { useState, useEffect } from 'react'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import styled from 'styled-components';
import { dest_marker } from '../img';
import { useNavigate } from 'react-router-dom';

const Test = (props) => {
    const nav = useNavigate();
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
                    {props.ws ?
                    <Share onClick={()=> nav(`/details/${props.ws}`)}>실시간 위치 공유</Share>
                    :
                    null
                    }
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

const Share = styled.button`
position: absolute;
left: 33%;
right: 33%;
bottom: 120px;
z-index: 2;
background: black;
color: white;
border: 0px;
border-radius: 7px;
`;
export default Test;