import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setUserName, signUp} from "../redux/modules/user";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import {getApi, postApi} from "../shared/api/client";
import {BsChevronLeft} from "react-icons/bs";

const SignUp = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')
    const [pw, setPw] = useState('')
    const [pwCheck, setPwCheck] = useState('')
    const loading = useSelector((state) => state.user.loading)

    const handleSignUp = () => {
        if (!username || !nickname || !pw || !pwCheck) {
            return window.alert('내용을 모두 입력해주세요');
        }
        if (pw !== pwCheck) {
            return window.alert('비밀번호가 일치하지 않습니다');
        } else {
            const data = {
                username,
                nickname,
                password: pw,
            }
            dispatch(signUp({data, navigate}));
        }
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSignUp();
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
                <h3>회원가입</h3>
            </HeadLine>

            <InputBox>
                <p>아이디 입력</p>
                <input
                    value={username}
                    placeholder='아이디를 입력하세요'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </InputBox>

            <InputBox>
                <p>닉네임 입력</p>
                <input
                    value={nickname}
                    placeholder='닉네임을 입력하세요'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </InputBox>

            <InputBox>
                <p>비밀번호 입력</p>
                <input
                    value={pw}
                    placeholder='비밀번호를 입력하세요'
                    type='password'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPw(e.target.value)}
                />
            </InputBox>

            <InputBox>
                <p>비밀번호 재입력</p>
                <input
                    value={pwCheck}
                    placeholder='비밀번호를 다시 한번 입력하세요'
                    type='password'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPwCheck(e.target.value)}
                />
            </InputBox>

            <SignUpDiv>
                <button
                    onClick={handleSignUp}
                >회원가입
                </button>
            </SignUpDiv>
        </>
    )
}

export default SignUp

const HeadLine = styled.div`
  position: relative;
  width: 100%;
  text-align: center;

  h3 {
    font-size: 24px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 50px;
  }
`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10px auto;
  
  p {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
  }

  input {
    background-color: #eee;
    padding: 12px;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 10px;
    margin-bottom: 30px;

    &:focus {
      outline: none;
    }
  }
`

const SignUpDiv = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin: 0 auto;

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


// useEffect(() => {
//     const getUser = async () => {
//         try {
//             const res = await getApi('/user/me')
//             if ( res.status === 200 ) {
//                 dispatch(setUserName(res.data.userName))
//             }
//         } catch (e) {
//             //..
//         }
//     }
//     getUser()
// }, [])
//
// const handleSignUp = async () => {
//     try {
//         const res = await postApi('/user/signup', {id, nickname, pw})
//         if ( res.status === 200 ) {
//             dispatch(setUserName(res.data.userName))
//         }
//     } catch (e) {
//         //..
//     }
// }