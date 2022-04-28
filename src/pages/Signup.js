import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Headerbar from '../shared/Headerbar';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Headerbar
                text="회원가입"
                _onClickClose={() => {
                navigate('/Login', { replace: true });
                }}
            />
            <RegisterForm />
        </React.Fragment>
    )
}

export default Signup;