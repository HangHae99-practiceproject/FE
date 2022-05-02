import React from 'react';
import styled from 'styled-components';
import Button from '../elements/Button';
import Text from '../elements/Text';
import Grid from '../elements/Grid';
import theme from '../Styles/theme';
import { KAKAO_AUTH_URL } from '../service/OAuth';
import { useNavigate } from 'react-router-dom';
import GlobalStyle from '../Styles/GlobalStyle';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const Home = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <GlobalStyle />
      <Grid padding="10px 20px">
        <a href={KAKAO_AUTH_URL}>
          <Grid is_flex>
            {/* <IconKakao src={kakao} /> */}
            <Button
              position="relative"
              name={'카카오톡으로 시작하기'}
              width="100%"
              heignt="40px"
              abled
            ></Button>
          </Grid>
        </a>
      </Grid>

      <Grid padding="10px 20px">
        <Button
          name={'이메일 로그인·회원가입하기'}
          _onClick={() => {
            navigate('/signin', { replace: true });
          }}
          width="100%"
          heignt="40px"
          abled
        />
      </Grid>
      <Grid is_Grid center padding="10px">
        <div></div>
        <GuestBtn
          onClick={() => {
            navigate('/main', { replace: true });
          }}
        >
          <Text color={theme.color.gray4} size="12px" cusor="pointer">
            둘러보기
          </Text>
        </GuestBtn>
        <div></div>
      </Grid>
    </React.Fragment>
  );
};

// styled componetns 작성 위치
// const IconKakao = styled.img`
//   position: absolute;
//   object-fit: cover;
//   left: 20%;
// `;
const GuestBtn = styled.div`
  cursor: pointer;
  margin: auto;
`;

// default props 작성 위치
Home.defaultProps = {};

export default Home;