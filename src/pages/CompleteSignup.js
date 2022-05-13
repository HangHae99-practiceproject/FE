import React from 'react';
import styled from "styled-components";
import {Grid} from "../elements";
import {useNavigate} from "react-router-dom";

const CompleteSignup = (props) => {

    const navigate = useNavigate()

    return (
        <Container>
            <TitleBox>
                <h3>"회원가입을 완료"</h3>
            </TitleBox>

            <TextBox>
                <h3>회원가입을 환영합니다.</h3>
                <p>지금 바로 소중한 사람들과</p>
                <p>즐거운 모임 약속을 만들러 가볼까요?</p>
            </TextBox>

            <ImgBox>
                <img src='Let’s On it (complete).png'/>
            </ImgBox>

            <Grid bottom="0" padding="16px">
                <button
                    style={{
                        backgroundColor: '#A1ED00',
                        width: '100%',
                        height: '100%',
                        padding: '12px',
                        color: 'black',
                        border: 'none',
                        borderRadius: '10px',
                    }}
                    onClick={() => {navigate('/login')}}>로그인 하러 가기
                </button>
            </Grid>
        </Container>
    );
}

export default CompleteSignup;

const Container = styled.div`
  min-height: 100vh;
  
  .logo {
    width: 30%;
    margin-left: 35px;
  }
`

const TitleBox = styled.div`
  width: 100%;
  padding: 50px 0 30px 35px;
  
  h3 {
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 10px;
  }
`

const TextBox = styled.div`
  width: 100%;

  h3 {
    font-size: 20px;
    font-weight: bold;
    padding-left: 35px;
    padding-bottom: 15px;
  }
  
  p {
    font-size: 16px;
    padding-left: 35px;
    padding-bottom: 8px;
  }
`

const ImgBox = styled.div`
  width: 100%;
  height: 50%;
  margin-top: 50px;
  
  img {
    width: 100%;
    height: 100%;
    transform: rotate(44.45deg);
  }
`
