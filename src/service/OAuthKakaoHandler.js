import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {actionCreators as kakaoActions} from "../redux/modules/user";

import Spinner from "../elements/Spinner";

const OAuthKakaoHandler = (props) => {

    const dispatch = useDispatch();

    // 인가코드
    let code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
      dispatch(kakaoActions.kakaoLogin(code));
    }, []);

    return <Spinner />;
};

export default OAuthKakaoHandler