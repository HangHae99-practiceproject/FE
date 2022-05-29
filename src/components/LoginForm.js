import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { login, setFCMToken } from '../redux/modules/user';
import Button from '../elements/Button';
import Input from '../elements/Input';
import Grid from '../elements/Grid';
import theme from '../Styles/theme';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const LoginForm = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const Login = () => {
    if (email === '' || pw === '') {
      window.alert('이메일, 비밀번호 모두 입력해주세요.');
    } else {
      const loginData = {
        email: email,
        password: pw,
      };
    //   dispatch(login(loginData));
    //   // navigate('/main');
    //   const data = {
    //     token: sessionStorage.getItem('FCMtoken'),
    //   };
    //   dispatch(setFCMToken(data));
    }
  };
  //엔터 입력시
  const handleKeyDownSendMessage = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      Login();
    }
  };
  return (
    <React.Fragment>
      <Grid padding="0px 20px">
        <Input
          labelBold
          labelColor={theme.color.gray1}
          value={email}
          type="text"
          labelText="이메일"
          placeholder="이메일 주소 (아이디)"
          width="10px"
          _onKeyDown={handleKeyDownSendMessage}
          _onChange={e => {
            setEmail(e.target.value);
          }}
        />
      </Grid>
      <Grid padding="0px 20px">
        <Input
          labelBold
          labelColor={theme.color.gray1}
          value={pw}
          type="password"
          labelText="비밀번호"
          placeholder="비밀번호"
          _onKeyDown={handleKeyDownSendMessage}
          _onChange={e => {
            setPw(e.target.value);
          }}
        />
      </Grid>
      <Grid padding=" 20px">
        <Button
          name={'로그인하기'}
          width="100%"
          heignt="40px"
          abled
          _onClick={Login}
        />
      </Grid>
    </React.Fragment>
  );
};

// styled components 작성 위치

// default props 작성 위치
LoginForm.defaultProps = {};

export default LoginForm;