import React, { useState } from 'react';
import PlanSelectMap from './PlanSelectMap';
import { Input, Grid, Button } from '../elements';
import theme from '../Styles/theme';

const SetLocation = (props) => {
    const [showmap, setShowMap] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    React.useEffect(() => {
        props.setPlace({name:name, address: address, lat:lat, lng:lng})
    },[name])

    return(
        <React.Fragment>
            <Grid padding="16px">
                <Input
                islabel
                labelBold
                labelColor={theme.color.gray1}
                labelText="어디서 만날건가요?"
                placeholder="장소를 입력해주세요."
                _onClick={() => {
                    setShowMap(true);
                }}
                value={name}
                />
                </Grid>
                {showmap && (
                <PlanSelectMap
                    setShowMap={setShowMap}
                    setName={setName}
                    setAddress={setAddress}
                    setLat={setLat}
                    setLng={setLng}
                />
                )}
                 {name !== ''?
                <Grid bottom="0" padding="16px" >
                    <Button _onClick={props.clickHandler}>다음으로</Button>
                </Grid>
                :
                <Grid bottom="0" padding="16px" >
                    <Button _onClick={()=> alert('장소를 정해주세요')}>다음으로</Button>
                </Grid>
                }
        </React.Fragment>
    )
}

export default SetLocation;