import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from 'react-router-dom'
import styled from "styled-components";

import {login, login2, setLoading, setUserName} from "../redux/modules/user";
import {KAKAO_AUTH_URL} from "../service/OAuth";
import {BsChevronLeft} from "react-icons/bs";

const Login = (props) => {
    const {join} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.user)
    const loading = useSelector((state) => state.user.loading)

    const [username, setUsername] = useState('')
    const [pw, setPw] = useState('')

    const Login = () => {
        if (join) {
            if (username === '' || pw === '') {
                window.alert('아이디, 비밀번호 모두 입력해주세요.');
            } else {
                const loginData = {
                    username,
                    password: pw,
                };
                dispatch(login2({data: loginData, join, navigate}));
            }
        }
        if(!join){
            if (username === '' || pw === '') {
                window.alert('아이디, 비밀번호 모두 입력해주세요.');
            } else {
                const loginData = {
                    username,
                    password: pw,
                };
                dispatch(login({data: loginData, navigate}));
            }
        }
    };

    //엔터 입력시
    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            Login();
        }
    };


    if (loading === 'pending') {
        return 'loading...'
    }
    if (loading === 'failed') {
        setTimeout(() => {
            dispatch(setLoading('idle'))
        }, 1000)
        return 'failed...'
    }

    return (
        <>
            <Container>

                <HeadLine>
                    <BsChevronLeft
                        style={{
                            position: 'absolute',
                            padding: '20px 0',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}
                        size="64px"
                        cursor="pointer"
                        onClick={() => {
                            navigate(-1)
                        }}
                    />
                </HeadLine>

                <h3 className='login-text'>로그인</h3>
                <InputBox>
                    <input
                        placeholder='아이디를 입력하세요'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </InputBox>

                <InputBox>
                    <input
                        placeholder='비밀번호 입력하세요'
                        type='password'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPw(e.target.value)}
                    />
                </InputBox>

                <LoginBox>
                    <button
                        onClick={Login}
                    >로그인
                    </button>
                </LoginBox>

                <SignupBox>
                    <span>아직 회원이 아니신가요?</span>
                    <p onClick={() => {
                        navigate('/signup')
                    }}>회원가입하기</p>
                </SignupBox>

                <LoginLogoBox>
                    <img src='party time(Log-in).png'/>
                </LoginLogoBox>
            </Container>
        </>
    )
}

export default Login

const Container = styled.div`
  position: relative;
  height: 100vh;

  .login-text {
    color: black;
    font-size: 24px;
    font-weight: bold;
    padding: 130px 0 30px 40px;
  }
`

const HeadLine = styled.div`
  position: relative;
  width: 80%;
  text-align: center;
`

const InputBox = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto 20px auto;

  input {
    background-color: #eee;
    padding: 12px;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 10px;
  }
`
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto 30px auto;

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
  margin: 0 auto 15px auto;

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

const LoginLogoBox = styled.div`
  width: 100%;
  height: 40%;

  img {
    width: 100%;
    height: 100%;
  }
`