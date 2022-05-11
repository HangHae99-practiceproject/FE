import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPlanId } from '../redux/modules/map.js';
import Plansocket from './Plansocket.js';
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const PlanSetName = props => {
  const dispatch = useDispatch();
  const userNick = document.cookie.split("=")[1];
  const planName = useSelector(state => state.map.planName)
  const planId = useSelector(state => state.map.planId)
  const path = useParams();

  //웹소켓 방 주소로 약속 일정 ID 가져오기
  useEffect(() => {
    dispatch(getPlanId(path.url));
  }, []);

  //웹소켓 연결하기전 handshake
    let sock = new SockJS('https://imonint.shop/ws');
    let ws = Stomp.over(sock);

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
    </div>
  );
}

// 스타일 컴포넌트 작성 위치
// eslint-disable-next-line no-unused-vars
const StyleComponent = styled.div``;


// default props 작성 위치
// eslint-disable-next-line no-unused-vars
PlanSetName.defaultProps = {
};


export default PlanSetName;