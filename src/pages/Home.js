import React from 'react';
import styled from 'styled-components';
import {KAKAO_AUTH_URL} from '../service/OAuth';
import {useNavigate} from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <TitleBox>
                <h3>만들고, 공유하고, 확인하는</h3>
                <h3>모임 약속 공유 플랫폼</h3>
            </TitleBox>

            <img className='logo' src='logo-619.svg'/>

            <OnBoardingBox>
                <img src='Spread Love(Onboarding).png'/>
            </OnBoardingBox>

            <LoginDiv>
                <KakaoBox>
                    <a href={KAKAO_AUTH_URL}>
                        카카오로 간편 로그인
                    </a>
                </KakaoBox>

                <LoginBox>
                    <button
                        onClick={() => {
                            navigate('/login')
                        }}
                    >아이디로 로그인하기
                    </button>
                </LoginBox>

                <SignupBox>
                    <span>아직 회원이 아니신가요?</span>
                    <p onClick={() => {navigate('/signup')}}>회원가입하기</p>
                </SignupBox>
            </LoginDiv>
        </Container>
    );
};


export default Home;

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

const OnBoardingBox = styled.div`
  width: 100%;
  height: 50%;
  
  img {
    width: 100%;
    height: 100%;
  }
`

const LoginDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const KakaoBox = styled.div`
  background-color: #A1ED00;
  display: flex;
  width: 90%;
  margin-bottom: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  a {
    width: 100%;
    height: 40px;
    color: black;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration-line: none;
    font-weight: bold;
  }
`

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 15px;

  button {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 10px;
    color: black;
    background-color: #A1ED00;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
  }
`

const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 15px;
  
  span {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    color: black;
  }
  
  p {
    display: flex;
    justify-content: center;
    color: black;
    cursor: pointer;
    font-weight: bold;
    text-decoration: underline
  }
`