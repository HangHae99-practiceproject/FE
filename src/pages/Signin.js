import React, { useEffect } from 'react';
import Button from '../elements/Button';
import Text from '../elements/Text';
import Grid from '../elements/Grid';
import Headerbar from '../shared/Headerbar';
import theme from '../Styles/theme';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Signin = (props) => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Headerbar
        text="로그인/회원가입"
        _onClickClose={() => {
          navigate('/');
        }}
      />
      <LoginForm />
      <div style={{ padding: '20px' }}></div>
      <hr />
      <div style={{ padding: '20px' }}></div>
      <Grid center padding="5px">
        <Text color={theme.color.gray4} size="12px">
          '모두모여'가 처음이신가요?
        </Text>
      </Grid>
      <Grid padding="15px">
        <Button
          width="100%"
          heignt="40px"
          name={'회원가입하기'}
          _onClick={() => {
            navigate('/signup', { replace: true });
          }}
          value
          is_green
        />
      </Grid>
        </React.Fragment>

    )
}

export default Signin;