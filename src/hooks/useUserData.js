import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

function useUserData () {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.user)
    useEffect(() => {
        if ( !userData ) {
            // dispatch(getUser())
        }
    }, [userData])

    return userData
}

export default useUserData