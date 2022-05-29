import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { register } from '../redux/modules/user';
import Button from '../elements/Button';
import Input from '../elements/Input';
import Grid from '../elements/Grid';
import Agreement from './Agreement';
import theme from '../Styles/theme';
import { useNavigate } from 'react-router-dom';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const RegisterForm = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  // checkbox
  const [checked, setChecked] = useState(false);

  const Register = () => {
    if (
      nickname === '' ||
      email === '' ||
      pw === '' ||
      pwCheck === '' ||
      !checked
    ) {
      window.alert('*표시 내용을 모두 입력해주세요');
      return;
    }
    if (pw !== pwCheck) {
      window.alert('비밀번호가 같지않습니다');
      return;
    }
    const data = {
      email: email,
      nickname: nickname,
      password: pw,
      checkPassword: pwCheck,
    };

    // dispatch(register(data));
    // navigate('/Login');
    // console.log(data);
  };
  return (
    <Grid padding="10px">
      <Grid padding="10px">
        <Input
          islabel
          labelBold
          labelColor={theme.color.gray1}
          labelText="이메일 주소 (아이디)*"
          placeholder="이메일을 입력하세요"
          type="text"
          _onChange={e => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </Grid>
      <Grid padding="10px">
        <Input
          islabel
          labelBold
          labelColor={theme.color.gray1}
          labelText="닉네임*"
          placeholder="닉네임을 입력하세요"
          type="text"
          _onChange={e => {
            setNickname(e.target.value);
          }}
          value={nickname}
        />
      </Grid>
      <Grid padding="10px">
        <Input
          islabel
          labelBold
          labelColor={theme.color.gray1}
          labelText="비밀번호*"
          placeholder="비밀번호를 입력하세요"
          type="password"
          _onChange={e => {
            setPw(e.target.value);
          }}
          value={pw}
        />
      </Grid>
      <Grid padding="10px">
        <Input
          islabel
          labelBold
          labelColor={theme.color.gray1}
          labelText="비밀번호 확인*"
          placeholder="비밀번호를 다시 입력하세요"
          type="password"
          _onChange={e => {
            setPwCheck(e.target.value);
          }}
          value={pwCheck}
        />
      </Grid>
      <Agreement checked={checked} setChecked={setChecked} />
      <Grid padding="10px">
        <Button
          is_green={
            nickname === '' ||
            email === '' ||
            pw === '' ||
            pwCheck === '' ||
            !checked
              ? false
              : true
          }
          name={'회원가입하기'}
          width="100%"
          heignt="40px"
          type="button"
          _onClick={Register}
        />
      </Grid>
    </Grid>
  );
};

// styled components 작성 위치

// default props 작성 위치
RegisterForm.defaultProps = {};

export default RegisterForm;