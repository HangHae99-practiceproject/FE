import React, { useState } from 'react';
import PlanSelectMap from './PlanSelectMap';
import { Input, Grid } from '../elements';
import theme from '../Styles/theme';

const SetLocation = (props) => {
    const [showmap, setShowMap] = useState(false);
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

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
                value={address}
                />
                </Grid>
                {showmap && (
                <PlanSelectMap
                    setShowMap={setShowMap}
                    setAddress={setAddress}
                    setLat={setLat}
                    setLng={setLng}
                />
                )}
        </React.Fragment>
    )
}

export default SetLocation;