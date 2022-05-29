import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Grid} from '../elements'

//카카오
import KakaoButton from "../components/KakaoButton";
import theme from "../styles/theme";

//캐러셀
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//이미지
import {
    OnBoard, OnBoard2, OnBoard3, OnBoard4, OnBoard5
}
    from '../img'
import Logo from '../img/Logo.svg'

const Home = () => {
    const navigate = useNavigate();
    //캐러셀 설정
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <Container>
            {/* <StyledSlider {...settings}>
                <div>
                    <TitleBox>
                        <img alt='logo' className='logo' src={Logo}/>
                    </TitleBox>
                    <OnBoardingBox>
                        <img alt='cover' src={OnBoard} style={{marginTop: "20%"}}/>
                    </OnBoardingBox>
                </div>
                <div>
                    <OnBoardingBox>
                        <Grid padding="20% 0px 40px 40px">
                            <h2>Make</h2><br/>
                            <h3>온잇에서, 만나고 싶은 사람들과</h3>
                            <h3>일정과 만남 장소를 간단히</h3>
                            <h3>만들어 볼 수 있어요. 👋🏻</h3>
                        </Grid>
                        <img alt='Onboard' src={OnBoard2} style={{width: "231px", height: "246px", marginLeft: "4%"}}/>
                    </OnBoardingBox>
                </div>
                <div>
                    <OnBoardingBox>
                        <Grid padding="20% 0px 40px 40px">
                            <h2>Choose</h2><br/>
                            <h3>어디서 만날지,</h3>
                            <h3>늦으면 어떤 무서운 벌칙을 당할지 🤑</h3>
                            <h3>정해보는 건 어때요?</h3>
                        </Grid>
                        <img alt='Onboard' src={OnBoard3} style={{width: "290px", height:"277.53px", margin: "0 auto"}}/>
                    </OnBoardingBox>
                </div>
                <div>
                    <OnBoardingBox>
                        <Grid padding="20% 0px 40px 40px">
                            <h2>Share</h2><br/>
                            <h3>친구들과 모임을 공유해봐요,</h3>
                            <h3>더 근사하고 재미있는 모임이 될거에요.! 🙌🏻</h3>
                        </Grid>
                        <img alt='Onboard' src={OnBoard4} style={{width: "375px", height: "322px", marginTop: "20%"}}/>
                    </OnBoardingBox>
                </div>
                <div>
                    <OnBoardingBox>
                        <Grid padding="20% 0px 40px 40px">
                            <h2>Location</h2><br/>
                            <h3>모임시간 임박,</h3>
                            <h3>과연 친구들은 오고있는게 맞을까..?🤔</h3>
                            <h3>친구들의 위치를 실시간으로 확인해보세요!</h3>
                        </Grid>
                        <img alt='Onboard' src={OnBoard5} style={{width: "256px", height: "220px", margin: "0 auto"}}/>
                    </OnBoardingBox>
                </div>
            </StyledSlider> */}
            <div>
                    <TitleBox>
                      <p>만들고, 공유하고, 확인하는</p>
                      <p>모임 약속 공유 플랫폼</p>
                        <img alt='logo' className='logo' src={Logo}/>
                    </TitleBox>
                    <OnBoardingBox>
                        <img alt='cover' src={OnBoard} style={{margin: "20% 0 10% 0"}}/>
                    </OnBoardingBox>
                </div>
            <LoginDiv>
                <KakaoButton/>
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
                    <p onClick={() => {
                        navigate('/signup')
                    }}>회원가입하기</p>
                </SignupBox>
            </LoginDiv>
        </Container>
    );
};


export default Home;

const Container = styled.div`
  height: 100%;
  background-color: ${theme.color.gray7};

  .logo {
    width: 30%;
    margin-top: 35px;
    padding-bottom: 20px;
  }

  p {
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
  }
`
// const StyledSlider = styled(Slider)`
//   .slick-track {
//     height: 560px;
//     widht: 375px;
//   }

//   .slick-slide div {
//     width: 375px;
//     margin: 0 auto;
//     z-index: 2;
//     cursor: pointer;
//   }

//   .slick-dots {
//     bottom: 1em;
//   }

//   .slick-dots li button:before {
//     color: gray;
//   }

//   .slick-dots li.slick-active button:before {
//     color: black;
//   }
// `;

const TitleBox = styled.div`
  width: 100%;
  padding: 100px 0 20px 35px;

`

const OnBoardingBox = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h3 {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  h2 {
    font-weight: 700;
    font-size: 24px;
  }
`

const LoginDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-top: 16px;
  padding-bottom: 16px;

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