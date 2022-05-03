/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Button, Grid, Text } from '../elements';
import styled from 'styled-components';
import Headerbar from '../shared/Headerbar';
import theme from '../Styles/theme';
import { BiSearch } from 'react-icons/bi';

const PlanSelectMap = props => {
  const inputref = useRef(); //인풋데이터
  const [keyword, setKeyword] = useState('이태원 맛집'); //defult값 빼면 에러남..
  const [info, setInfo] = useState(); //클릭시 나올 정보==>하단 바로 빼기
  // const [markers, setMarkers] = useState([]); //마커들
  const [map, setMap] = useState(); //지도 데이터
  const [datas, setDatas] = useState(); //리스트 검색 시 들어오는 데이터
  const [isInput, setIsInput] = useState(false); //인풋 눌럿는지 체크
  const [isdata, setIsData] = useState(false);
  const [selectlist, setSelectlist] = useState({
    //리스트 클릭시 들어갈 데이터
    position: {
      lat: 37.5211,
      lng: 126.9889,
    },
    content: '',
    address_name: '',
    road_address_name: '',
    place_url: '',
  });

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
            address_name: data[i].address_name,
            road_address_name: data[i].road_address_name,
            place_url: data[i].place_url,
          });
          // @ts-ignore
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // setMarkers(markers);
        setDatas(data);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, keyword]);
  const inputdatabutton = event => {
    setKeyword(inputref.current.value);
  };
  return (
    <>
      <Section>
        <MainModal>
          <Headerbar
            isback
            _onClickClose={() => {
              props.setShowMap(false);
            }}
            text="장소검색"
          ></Headerbar>
          <Grid padding="16px">
            <InputDest
              ref={inputref}
              onChange={e => {
                setKeyword(e.target.value);
              }}
              onClick={() => {
                setIsInput(true);
              }}
            ></InputDest>
            <Search onClick={inputdatabutton}>
              {/* <BiSearch size={'15px'} /> */}
            </Search>
          </Grid>

          {isInput && (
            <Grid padding="12px">
              {datas &&
                datas.map((point, index) => (
                  <div key={'datas' + index}>
                    <Grid
                      _onClick={() => {
                        setIsData(true);
                        const markerdata = {
                          position: {
                            lat: point.y,
                            lng: point.x,
                          },
                          content: point.place_name,
                          address_name: point.address_name,
                          road_address_name: point.road_address_name,
                          place_url: point.place_url,
                        };
                        setSelectlist(markerdata);
                        setIsInput(false);
                        props.setName(point.place_name);
                        props.setAddress(point.address_name);
                        props.setLat(point.y);
                        props.setLng(point.x);
                        props.setShowMap(true);
                        // const bounds = new window.kakao.maps.LatLngBounds();
                        // bounds.extend(
                        //   new window.kakao.maps.LatLng(point.y, point.x),
                        // );
                        // map.setBounds(bounds);
                      }}
                    >
                      <Text size={'16px'}>{point.place_name}</Text>
                      {/* <p style={{ color: 'green' }}>{point.address_name}</p> */}
                      <Text size={'11px'} color={theme.color.gray4}>
                        {point.address_name}
                      </Text>
                    </Grid>
                    <hr style={{ color: '#E0E0E0' }} />
                  </div>
                ))}
            </Grid>
          )}
          {!isInput && (
            <Map
              center={{
                lat: 37.566826,
                lng: 126.9786567,
              }}
              style={{
                width: '90%',
                height: 'calc(97% - 100px)',
                margin: 'auto'
              }}
              level={3}
              onCreate={setMap}
            >
              <MapMarker
                position={selectlist.position}
                onClick={() => setInfo(selectlist)}
              >
                {/* {info && info.content === selectlist.content && (
                  <div style={{ color: 'black' }}>{selectlist.content}</div>
                )} */}
              {info &&info.content === selectlist.content && (
                <MarkerDetail>
                  <p>{selectlist.content}</p>
                  <Here onClick={()=> window.open(selectlist.place_url)}>정보</Here>
                </MarkerDetail>
              )}
              </MapMarker>
            </Map>
          )}
          {isdata && (
            <InfoMap>
              <div>
                <div style={{ padding: '0px 0px 5px 0px' }}>
                  <Text size="18px" bold>
                    {selectlist.content}
                  </Text>
                </div>
                <Text size="12px">{selectlist.road_address_name}</Text>
              </div>
              <div
                style={{
                  right: '8%',
                  position: 'absolute',
                  padding: '0px 20px 0px 0px',
                }}
              >
                <Button
                  is_green={isdata}
                  name="도착"
                  able={!isdata}
                  is_disabled={!isdata}
                  height="100px"
                  width="80px"
                  _onClick={() => {props.setShowMap(false)}}
                />
              </div>
            </InfoMap>
          )}
        </MainModal>
      </Section>
    </>
  );
};

const Section = styled.div`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
`;

const MainModal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  background-color: white;
`;

const InputDest = styled.input`
  width: 100%;
  height: 29px;
  padding: 8px;
  background: ${theme.color.white};
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 5px;
`;

const Search = styled.div`
  position: absolute;
  top: 8.1%;
  right: 6%;
`;

const InfoMap = styled.div`
  padding: 20px;
  display: flex;
  width: 100%;
  z-index: 10;
  background-color: ${theme.color.white};
  position: absolute;
  bottom: 0;
`;

const MarkerDetail = styled.div`
  color: #000;
  width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
`;

const Here = styled.button`
  margin-top: auto;
  width: fit-content;
  margin-left: auto;
  border: 0px;
  background: transparent;
  padding: 5px;
`
export default PlanSelectMap;