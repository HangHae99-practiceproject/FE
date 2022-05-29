import React, { useEffect } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import styled from "styled-components";
import MainContents from "./components/MainContents";
import useIsMobile from "./hooks/useIsMobile";

import { messaging } from "./firebase";
import { getToken } from 'firebase/messaging'
import theme from "./styles/theme";
import EventBackGround from "./components/EventBackGround";
import LaptopBackground from "./components/LaptopBackground";
import Phone from './img/Phone.png'

function App() {
    useEffect(() => {
        if (localStorage.getItem('FCMtoken')) {
            return
        } else {
            getToken(messaging, {
                vapidKey: "BLg2NeG06gdfa1DbdDn1E6VFSD8a82zuaxgPXS5drdMaqUSf_lY421iglOkbev53HaDsl2jkw5vxgM" +
                    "aA4b6wfug"
            }).then(token => {
                localStorage.setItem('FCMtoken', token);
            })
        }
    }, [])
    const isMobile = useIsMobile()

    return (
        <Container>
            {isMobile ? (
                <MainContents />
            ) : (
                <LaptopContainer>
                    <LeftWrap>
                         {/*<LaptopBackground />*/}
                        <EventBackGround/>
                    </LeftWrap>
                    <RightWrap>
                        <img className='phone-img' alt='phone' src={Phone} />
                        <PhoneFrame>
                            <MainContents />
                        </PhoneFrame>
                    </RightWrap>
                </LaptopContainer>
            )}
            <GlobalStyle />
        </Container>
    );
}

export default App;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.color.BackGround};
`

const LaptopContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const LeftWrap = styled.div`
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 980px;

  @media (max-width: 768px) {
    display: none;
  }
`

const RightWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.BackGround};

  .phone-img {
    position: absolute;
    width: 430px;
    height: 930px;

    @media (max-width: 768px) {
      display: none;
    }
  }
`

const PhoneFrame = styled.div`
  position: relative;
  width: 375px;
  height: 812px;

  @media (min-width: 360px) and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`