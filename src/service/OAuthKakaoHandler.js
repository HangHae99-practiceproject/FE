import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {actionCreators as kakaoActions} from "../redux/modules/user";
import Spinner from "../elements/Spinner";

const OAuthKakaoHandler = (props) => {

    const dispatch = useDispatch()

    let code = new URL(window.location.href).searchParams.get('code')
    console.log(code)

    useEffect(async () => {
        await dispatch(kakaoActions.KakaoLogin(code))
    }, [])

    return (
        <Spinner></Spinner>
    )
}

export default OAuthKakaoHandler