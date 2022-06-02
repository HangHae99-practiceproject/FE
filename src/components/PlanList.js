import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import dayjs from "dayjs";
import 'dayjs/locale/ko'

import theme from "../styles/theme";
import {ReactComponent as Share} from '../img/icon/share-icon.svg'
import {bomb} from '../img'
import {getInvitePlan, getMyPlan, getTotalPlan, setLoading} from "../redux/modules/plan";
import Swal from "sweetalert2";
import Weather from "./Weather";
import useInfiniteScrollPageController from "../hooks/useInfiniteScrollPageController";

dayjs.locale('ko')

const PlanList = ({type, getPlan, children}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.user.user_info);
    const loading = useSelector((state) => state.plan.loading)
    const totalPage = useSelector(state => state.plan[type].totalPage);
    const planList = useSelector(state => state.plan[type].plans);
    const page = useInfiniteScrollPageController(totalPage)

    useEffect(() => {
        if (userData) {
            getPlan(page)
        }
    }, [userData, page])

    useEffect(() => {
        if (loading === 'succeeded') {
            dispatch(setLoading('idle'))
        }
    }, [loading])

    const first = [...planList].splice(0, 1)[0]
    const rest = [...planList].splice(1)
    const planDay = dayjs(first?.planDate).format('MM월 DD일 dddd')
    const planTime = dayjs(first?.planDate).format(' A hh시 mm분')
    const handleShared = (event) => {
        event.stopPropagation()
        if (navigator.share) {
            navigator.share({
                title: first.planName,
                text: first.planName,
                url: `https://imonit.co.kr/detail/${first.url}`
            })
                .then(() => {
                })
                .catch((err) => {
                })
        } else {
            Swal.fire({
                text: "공유하기가 지원되지 않는 환경 입니다.",
                icon: 'error'
            })
        }
    }

    return (
        <>
            <List>
                {planList.length > 0 ? (
                    <>
                        <div className='first'
                             key={first.planId}
                             onClick={() => {
                                 navigate(`/detail/${first.url}`)
                             }}
                        >
                            <Content>
                                <h4>{planDay}</h4>
                                <Share
                                    style={{
                                        zIndex: 1,
                                        marginLeft: "auto"
                                    }}
                                    onClick={handleShared}
                                />
                            </Content>
                            <h4>{planTime}</h4>
                            <h2>{first.planName}</h2>
                            <p>{first.locationName}</p>
                            <Weather props={first.description}/>
                            <Penalty style={{position: "absolute", bottom: "1rem"}}>
                                <img alt='penalty icon' src={bomb}/>
                                <span>{first.penalty}</span>
                            </Penalty>
                        </div>
                        {rest.map((plan, idx) => {
                            const planDay = dayjs(plan?.planDate).format('MM월 DD일 dddd,')
                            const planTime = dayjs(plan?.planDate).format(' A hh시 mm분')
                            const handleShared = (event) => {
                                event.stopPropagation()
                                if (navigator.share) {
                                    navigator.share({
                                        title: plan.planName,
                                        text: plan.planName,
                                        url: `https://imonit.co.kr/detail/${plan.url}`
                                    })
                                } else {
                                    Swal.fire({
                                        text: "공유하기가 지원되지 않는 환경 입니다.",
                                        icon: 'error'
                                    })
                                }
                            }
                            return (
                                <div className='lists'
                                     key={idx}
                                     onClick={() => {
                                         navigate(`/detail/${plan.url}`)
                                     }}
                                >
                                    <Content>
                                        <h1>{planDay}{planTime}</h1>
                                        <Share
                                            style={{
                                                zIndex: 1,
                                                marginLeft: "auto"
                                            }}
                                            onClick={handleShared}
                                        />
                                    </Content>
                                    <p>{plan.locationName}</p>
                                    <Penalty>
                                        <img alt='penalty icon' src={bomb}/>
                                        <span>{plan.penalty}</span>
                                    </Penalty>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <>
                        {children}
                    </>
                )}
            </List>
        </>
    )
}

export default PlanList;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const Penalty = styled.div`
  display: flex;
  background: ${theme.color.gray5};
  border-radius: 9px;
  padding: 2px 8px;
  width: fit-content;
  align-items: center;

  span {
    font-size: 12px;
    margin: 0 5px;
  }
`;

const List = styled.div`
  overflow: hidden;
  height: 100%;
  padding: 24px 24px 0 24px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }

  .first {
    background-color: ${theme.color.green};
    width: 100%;
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 16px;
    height: 10.875rem;
    box-shadow: 0 0 15px #d1d1d1;
    position: relative;
    overflow: hidden;
  }

  .lists {
    background-color: ${theme.color.white};
    width: 100%;
    border: 1px none #ddd;
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 16px;
    box-shadow: 0 0 15px #d1d1d1;
  }

  .create-on-it {
    width: 70%;
    height: 45px;
    background-color: ${theme.color.green};
    border-radius: 10px;
    border: none;
    font-weight: bold;
    margin-top: 20px;
    color: #181818;
    font-size: 16px;
  }

  h4 {
    font-weight: bold;
    font-size: 22px;
  }

  h3 {
    font-weight: bold;
    font-size: 18px;
    line-height: 27px;
  }

  h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 30px;
  }

  h1 {
    font-size: 1rem;
    font-weight: bold;
  }

  p {
    font-weight: bold;
    font-size: 14px;
    line-height: 21px;
    padding: 0px 0px 8px 0px;
  }

  .no-list {
    text-align: center;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .no-list > p {
    font-size: 16px;
    color: ${theme.color.gray1};
  }

`