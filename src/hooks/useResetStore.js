import React from 'react';
import {resetUser} from "../redux/modules/user";
import {resetPlan} from "../redux/modules/plan";
import {resetMap} from "../redux/modules/map";
import {useDispatch} from "react-redux";

function useResetStore(props) {
    const dispatch = useDispatch()
    return () => {
        dispatch(resetUser())
        dispatch(resetPlan())
        dispatch(resetMap())
    }
}

export default useResetStore;