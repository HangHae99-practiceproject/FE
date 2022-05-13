import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import moment from "moment";
import 'moment/locale/ko'
import {useNavigate} from "react-router-dom";

import {Text} from "../elements";
import theme from "../Styles/theme";
import useResetStore from "../hooks/useResetStore";
import {BsBell} from "react-icons/bs";

import {logout} from "../redux/modules/user";
import {getMorePlan, getPlan, setLoading} from "../redux/modules/plan";

const Main = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.plan.loading)
    const planList = useSelector(state => state.plan.plans);
    const totalPage = useSelector(state => state.plan.totalPage);
    const userData = useSelector(state => state.user.user?.data)

    const resetStore = useResetStore()

    const [page, setPage] = useState(1)
    const [isOpen, setMenu] = useState(false);

    const logoutBtn = () => {
        localStorage.removeItem('token')
        resetStore()
        dispatch(logout(navigate))
    };

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight
        if ( scrollTop + clientHeight >= scrollHeight && loading === 'idle' && totalPage >= page ) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        if ( userData ) {
            dispatch(getPlan(userData.id))
        }
    }, [userData])

    useEffect(() => {
        if ( userData && page > 1 ) {
            dispatch(getMorePlan({userId: userData.id, page: page}))
        }
    }, [userData, page])

    useEffect(() => {
        if ( loading === 'succeeded' ) {
            dispatch(setLoading('idle'))
        }
    }, [loading])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const toggleMenu = () => {
        setMenu(isOpen => !isOpen);
    }

    const nowDate = moment()
        .format('YYYY년MM월DD일 dddd')

    if (!planList.length && loading === 'pending') {
        return 'loading...'
    }
    if (!planList.length && loading === 'failed') {
        setTimeout(() => {
            dispatch(setLoading('idle'))
        }, 1000)
        return 'failed...'
    }

    return (
        <Container>
            <img className='logo' src='logo-619.svg' onClick={() => {navigate('/main')}}/>
            <HeadBox>
                <div className='hamburger-bell'>
                    <BsBell style={{
                        width: '40px',
                        height: '40px',
                        padding: "5px",
                        cursor: "pointer",
                    }}/>
                    <button className="hamburger-btn" onClick={toggleMenu}>
                        <div className={`menu-trigger ${isOpen ? 'active' : ''}`}>
                            <span/>
                            <span/>
                            <span/>
                        </div>
                    </button>
                </div>
                <ShowMenu isOpen={isOpen}>
                    <div className="side-bar-header">
                        <button className="hamburger-btn" onClick={toggleMenu}>
                            <div className={`menu-trigger ${isOpen ? 'active' : ''}`}>
                                <span/>
                                <span/>
                                <span/>
                            </div>
                        </button>
                    </div>
                    <div className='member'>
                        <div className='member-img'>
                            {userData && userData?.profileImg}
                        </div>
                        <p>{userData?.nickname || '손'} 님</p>
                    </div>
                    <div className='past-plan'
                         onClick={() => {
                             navigate('/past')
                         }}>
                        <p>지난 일정</p>
                    </div>
                    <div className='logout'
                         onClick={logoutBtn}
                    >
                        <p>로그아웃</p>
                    </div>
                </ShowMenu>
            </HeadBox>

            <UserInfo>
                <p>{userData?.nickname || '손'} 님</p>
                <p>{nowDate} 입니다.</p>
            </UserInfo>
            <PlanList>
                {planList.length > 0 ? (
                    <>
                        {planList.map((plan, idx) => {
                            const planDate = moment(plan.planDate).format('YYYY년 MM월 DD일')
                            const planTime = moment(plan.planDate).format('hh시 mm분')
                            return (
                                <div className='lists'
                                     key={idx}
                                     onClick={() => {
                                         navigate(`/detail/${plan.url}`)
                                     }}
                                >
                                    <h3>{planDate}</h3>
                                    <h3>{planTime}</h3>
                                    <p>{plan.planName}</p>
                                    <p>{plan.locationDetail?.name}</p>
                                    <p>{plan.penalty}</p>
                                </div>
                            )
                        })}
                        <AddButton onClick={() => {
                            navigate('/add')
                        }}>+</AddButton>
                    </>
                ) : (
                    <div className='no-list'>
                        <Text size="14px" color={theme.color.gray1}>
                            아직 약속이 없습니다!
                            <br style={{padding: '16px'}}/>
                            즐거운 모임 온잇에서 어떠신가요?
                        </Text>
                        <button
                            className='create-on-it'
                            onClick={() => {
                                navigate('/add')
                            }}
                        >온잇으로 모임 만들기
                        </button>
                    </div>
                )}
            </PlanList>
        </Container>
    )
}

export default Main

const Container = styled.div`
  background-color: #eee;
  min-height: 100vh;
  position:relative;
  
  .logo {
    position: absolute;
    left: 24px;
    top: 20px;
  }
`

const HeadBox = styled.div`
  background-color: #fff;
  width: 100%;
  height: 60px;
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
  
  .hamburger-bell {
    height: 100%;
    width: 40%;
    padding-right: 8px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .hamburger-btn {
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: inherit;
    outline: none;
  }

  .menu-trigger {
    position: relative;
    width: 20px;
    height: 17.6px;
    cursor: pointer;

    &, span {
      display: inline-block;
      transition: all 0.4s;
      box-sizing: border-box;
    }

    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #000;
      border-radius: 4px;
    }

    span:nth-of-type(1) {
      top: 0;
    }

    span:nth-of-type(2) {
      top: 7.7px;
    }

    span:nth-of-type(3) {
      bottom: 0;
    }

    /* 2th bar 사라지고,  1st 3rd bar 회전하며 X  */

    &.active {
      span:nth-of-type(1) {
        transform: translateY(7.8px) rotate(-45deg);
      }

      span:nth-of-type(2) {
        opacity: 0;
      }

      span:nth-of-type(3) {
        transform: translateY(-7.8px) rotate(45deg);
      }
    }
  }
`

const UserInfo = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 30px;

  p: first-of-type {
    font-weight: bold;
    font-size: 20px;
  }

    p + p {
    padding-top: 10px;
  }
`

const ShowMenu = styled.div`
  background-color: #ddd;
  width: 70%;
  //height: calc(100% - 40px);
  height: 100%;
  position: fixed;
  right: 0;
  //top: 40px;
  top: 0;
  padding: 10px;
  transform: ${({isOpen}) => `translateX(${isOpen ? 0 : '100%'})`};
  transition: transform 0.2s ease-in-out;

  .side-bar-header {
    display: flex;
    justify-content: flex-end;
  }

  .member {
    position: relative;
    width: 80%;
    height: 10%;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
    cursor: pointer;
  }
  
  .member-img {
    position: absolute;
    top: -20%;
    background-color: #eee;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .member > p {
    margin-top: 28px;
  }

  .past-plan {
    width: 80%;
    height: 6%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
    cursor: pointer;
  }

  .logout {
    width: 80%;
    height: 6%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 auto;
  }
`

const PlanList = styled.div`
  padding: 0 30px;
  margin-bottom: 30px;
  overflow: hidden;
  //text-align: center;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }

  .create-on-it {
    width: 70%;
    height: 35px;
    background-color: #A1ED00;
    border-radius: 10px;
    border: none;
  }

  .lists:first-of-type {
    display: flex;
    justify-content: center;
    flex-direction: column;

    background-color: #A1ED00;
    width: 100%;
    height: 25vh;
    font-size: 20px;
  }

  .lists:first-of-type > h3 {
    font-size: 24px;
  }

  .lists {
    background-color: white;
    width: 100%;
    height: 20vh;
    border: 1px none #ddd;
    border-radius: 10px;
    padding: 16px 10px;
    margin-bottom: 16px;
  }

  h3 {
    padding-bottom: 8px;
    font-weight: bold;
    font-size: 20px;
  }
  
  h3 + h3 {
    padding-bottom: 16px;
  }

  p {
    padding-bottom: 8px;
  }
  .no-list {
    text-align: center;
    width: 100%;
    padding: 10px 0;
    margin-top: 20px;
  }
`

const AddButton = styled.button`
  background-color: #A1ED00;
  color: black;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  font-size: 50px;
  font-weight: lighter;
  cursor: pointer;
  position: fixed;
  bottom: 15px;
  right: 15px;

  display: flex;
  text-align: center;
  justify-content: center;
  //line-height: 50px;
  line-height: 1;
`