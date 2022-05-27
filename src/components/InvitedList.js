import {getMorePlan, getPlan, setLoading} from "../redux/modules/plan";
import {useSelector, useDispatch} from "react-redux";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import theme from "../styles/theme";
import {bomb} from '../img'
import dayjs from "dayjs";
import 'dayjs/locale/ko'
import Weather from "./Weather";
dayjs.locale('ko')

const InvitedList = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const userData = useSelector(state => state.user.user_info);
    const totalPage = useSelector(state => state.plan.invited.totalPage);
    const loading = useSelector((state) => state.plan.loading)
    const planList = useSelector(state => state.plan.invited?.plans);
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight
        if (scrollTop + clientHeight >= scrollHeight && loading === 'idle' && totalPage >= page) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        if (userData) {
            dispatch(getPlan(1))
        }
    }, [userData])

    useEffect(() => {
        if (userData && page > 1) {
            dispatch(getMorePlan({page: page}))
        }
    }, [userData, page])

    useEffect(() => {
        if (loading === 'succeeded') {
            dispatch(setLoading('idle'))
        }
    }, [loading])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    if (!planList.length && loading === 'pending') {
        return 'loading...'
    }

 const first = [...planList].splice(0,1)[0]
    const rest = [...planList].splice(1)
    const planDay = dayjs(first?.planDate).format('MM월 DD일 dddd,')
    const planTime = dayjs(first?.planDate).format(' A hh시 mm분')
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
                            <h3>{planDay}</h3>
                        </Content>
                        <h3>{planTime}</h3>
                        <h2>{first.planName}</h2>
                        <p>{first.locationName}</p>
                        <Weather props={first.description}/>
                        <Penalty style={{position: "absolute", bottom: "1rem"}}>
                            <img alt='penalty icon' src={bomb}/>
                            <span>{first.penalty}</span>
                        </Penalty>
                    </div>
                        {rest.map((plan, idx) => {
                            const planDay = dayjs(plan?.planDate).format('MM월 DD일 dddd')
                            const planTime = dayjs(plan?.planDate).format('A hh시 mm분')
                            return (
                                <div className='lists'
                                     key={idx}
                                     onClick={() => {
                                         navigate(`/detail/${plan.url}`)
                                     }}
                                >
                                    <Content>
                                        <h3>{planDay}</h3>
                                    </Content>
                                    <h3>{planTime}</h3>
                                    <p>{plan.planName}</p>
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
                    <div className='no-list'>
                        <p>
                            아직 참여한 약속이 없습니다!
                        </p>
                    </div>
                )}
            </List>
        </>
    )
}

export default InvitedList;

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
  height: 36rem;
  padding: 24px 24px 0px 24px;
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
    height: 35px;
    background-color: ${theme.color.green};
    border-radius: 10px;
    border: none;
    font-weight: bold;
    margin-top: 20px;
    color: #181818;
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
    font-size: 14px;
    color: ${theme.color.gray1};
  }

  .plus-icon {
    position: absolute;
    bottom: 15px;
    right: 15px;
    z-index: 1;
  }
`