import React, {useEffect} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {deletePlan, getOnePlan, joinPlan} from "../redux/modules/plan";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as LeftArrow} from '../img/icon/arrowl.svg';
import {bomb, deleteIcon, editIcon} from "../img";
import DetailMap from "./DetailMap";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import theme from "../styles/theme";

const Detail = (props) => {
    const {planUrl} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user_info)
    const plan = useSelector(state => state.plan.showplan)
    const token = localStorage.getItem("token")
    const planDay = dayjs(plan?.planDate).format('MM월 DD일 dddd')
    const planTime = dayjs(plan?.planDate).format('A hh시 mm분')
    const handleShared = () => {
        if (navigator.share) {
            navigator.share({
                title: plan.planName,
                text: plan.planName,
                url: window.location.href
            })
                .then(() => console.log('성공'))
                .catch((err) => console.log(err))
        } else {
            Swal.fire({
                text: '공유하기가 지원되지 않는 환경 입니다.',
                icon: 'error',
            })
        }
    }

    useEffect(() => {
        if (!token) {
            Swal.fire({
                text: '로그인을 해 주세요',
                icon: 'error',
            })
            navigate(`/login/${planUrl}`)
        }
        dispatch(getOnePlan(planUrl))
    }, [])

    const handleModify = () => {
        if (user.nickname !== plan.writer) {
            Swal.fire({
                text: '작성자만 수정 가능합니다.',
                icon: 'error',
            })
            return
        } else {
            navigate(`/edit/${planUrl}`)
        }
    }

    const deletePlanBtn = () => {
        if (user.nickname === plan.writer) {
            Swal.fire({
                text: "정말로 삭제하시겠습니까?",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: '삭제하기',
                cancelButtonText: '취소하기'
            }).then((res) => {
                    if (res.isConfirmed) {
                        dispatch(deletePlan({planUrl, navigate}))
                        Swal.fire(
                            '삭제완료!',
                            '다음 약속으로 만나요!',
                            'success'
                        )
                    }
                }
            )
        }
        if (user.nickname !== plan.writer) {
            Swal.fire({
                text: "정말로 나가시겠습니까?",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: '나가기',
                cancelButtonText: '취소하기'
            }).then((res) => {
                if (res.isConfirmed) {
                    dispatch(deletePlan({planUrl, navigate}))
                } else {
                    return
                }
            })
        }
    }

    if (!plan) {
        return <div>loading...</div>
    }

    return (
        <Container>
            <HeadLine>
                <LeftArrow
                    style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        top: 12,
                    }}
                    size="64px"
                    cursor="pointer"
                    onClick={() => {
                        navigate(`/main`)
                    }}
                />
                {plan.writer === user.nickname ?
                    <h2>선택하신 약속입니다</h2> : <h2>초대장</h2>
                }
            </HeadLine>

            <ScheduleBox>
                {user.nickname === plan.writer && (
                    <div style={{position: 'relative'}}>
                        <img alt="edit" src={editIcon} onClick={handleModify}/>
                        <img alt="delete" src={deleteIcon} onClick={deletePlanBtn}/>
                    </div>
                )}
                <p>{plan.planName}</p>
                <h3>{planDay}</h3>
                <h3>{planTime}</h3>
                <p>{plan?.locationDetail?.name}</p>
                <div style={{display: "flex"}}>
                    <Penalty>
                        <img className='bomb' alt='penalty icon' src={bomb}/>
                        <span>{plan?.penalty}</span>
                    </Penalty>
                    {plan.participantList?.length > 1 ?
                    <List>
                        <Writer style={{backgroundImage: `url(${user.profileImg})`}}/>
                        <Participants>
                            <h5>+{plan.participantList?.length - 1}</h5>
                        </Participants>
                    </List>
                    :
                    null
                    }
                </div>
            </ScheduleBox>
            <MapBox>
                {plan.locationDetail ? (
                    <DetailMap
                        {...plan.locationDetail}
                        ws={planUrl}
                    />
                ) : (
                    <div>loading...</div>
                )}
            </MapBox>
            <ButtonBox>
                {plan.writer === user.nickname ?
                    <button onClick={handleShared} style={{fontSize: "16px"}}>
                        공유하기
                    </button>
                    :
                    (plan.member ?
                            <>
                                <button onClick={deletePlanBtn}>
                                    일정 나가기
                                </button>
                            </>
                            :
                            <>
                                <button onClick={() => dispatch(joinPlan(planUrl))}>
                                    참석하기
                                </button>
                                <button
                                    onClick={() => {
                                        navigate('/main')
                                    }}>
                                    거절하기
                                </button>
                            </>
                    )}
            </ButtonBox>
        </Container>
    )
}

export default Detail

const List = styled.div`
position: relative;
display: flex;
margin: 0px 16px 0px auto;
justify-content: flex-end;
`;

const Writer = styled.div`
display: flex;
margin-right: 16px;
width: 32px;
height: 32px;
background-size: cover;
border-radius: 16px;
`;

const Participants = styled.div`
position: absolute;
width: 32px;
height: 32px;
background: ${theme.color.gray5};
border-radius: 16px;

 h5 {
    position: absolute;
    font-size: 12px;
    font-color: #747474;
    font-weight: 700;
    left: 25%;
    top: 33%;
 }
`;

const Container = styled.div`
  height: 100%;
  background-color: ${theme.color.gray7};
`

const HeadLine = styled.div`
  position: relative;
  width: 100%;
  text-align: center;

  h2 {
    font-size: 20px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`

const ScheduleBox = styled.div`
  background-color: ${theme.color.white};
  position: relative;
  border: none;
  border-radius: 5px;
  width: 90%;
  height: 30%;
  margin: auto;

  h3: first-of-type {
    padding: 0 0 15px 30px;
    font-size: 24px;
    font-weight: bold;
  };

  h3 {
    font-size: 24px;
    font-weight: bold;
    padding: 0 0 15px 30px
  }
;

  p:first-of-type {
    padding: 30px 0 20px 30px;
    font-weight: bold;
  }

  p {
    padding: 10px 0 10px 30px;
  }
;

  img: first-of-type {
    position: absolute;
    right: 40px;
  } img {
    position: absolute;
    right: 0;
    margin: 8px;
  }
`

const Penalty = styled.div`
  display: flex;
  background: ${theme.color.gray5};
  border-radius: 10px;
  padding: 5px 10px 5px 25px;
  width: fit-content;
  align-items: center;
  bottom: 1rem;
  margin-left: 30px;
  margin-top: 10px;

  .bomb {
    left: 30px;
  }

  span {
    font-size: 12px;
    margin: 0 5px;
  }
`;

const MapBox = styled.div`
  background-color: ${theme.color.gray7};
  border: none;
  border-radius: 5px;
  width: 90%;
  height: 50%;
  margin: auto;
`

const ButtonBox = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;

  button {
    background-color: #A1ED00;
    width: 100%;
    height: 100%;
    padding: 12px;
    color: black;
    border: none;
    border-radius: 10px;
    font-weight: bold;
  }

  button + button {
    font-weight: bold;
    margin-left: 10px;
  }
`