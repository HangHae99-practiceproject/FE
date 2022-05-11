import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getUserToken} from '../redux/modules/user';

import Spinner from '../elements/Spinner';
import axios from 'axios';
import {setCookie} from '../shared/utils/Cookie';
import {useNavigate} from 'react-router-dom';

const OAuthHandler = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let code = new URL(window.location.href).searchParams.get('code');

    useEffect(() => {
        async function fetchData() {
            await axios
                .get(`https://imonint.shop/users/kakao/callback?code=${code}`)
                .then(response => {
                    // console.log(response);

                    const ACCESS_TOKEN = response.headers.authorization;

                    setCookie('token', ACCESS_TOKEN, 1);
                    dispatch(getUserToken()).then(response => navigate('/main'));
                })
                .catch(err => {
                    console.log('소셜로그인 에러', err);

                    navigate('/');
                });
        }

        fetchData();
    }, []);

    return <Spinner/>;
};

export default OAuthHandler;