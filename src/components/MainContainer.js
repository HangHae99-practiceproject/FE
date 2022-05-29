import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

function MainContainer({children}) {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.user)
    useEffect(() => {
        if ( !userData ) {
            // dispatch(getUser())
        }
    }, [userData])
    if ( !userData ) {
        return <div>loading...</div>
    }
    return (
        {children}
    );
}

export default MainContainer;