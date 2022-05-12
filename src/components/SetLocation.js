import React, {useState} from 'react';
import PlanSelectMap from './PlanSelectMap';
import {Grid, Input} from '../elements';
import theme from '../Styles/theme';

const SetLocation = ({clickHandler, setPlace, place}) => {
    const [showMap, setShowMap] = useState(false);
    const [name, setName] = useState(place?.name || '');
    const [address, setAddress] = useState(place?.address || '')
    const [lat, setLat] = useState(place?.lat || '');
    const [lng, setLng] = useState(place?.lng || '');

    const handleNext = () => {
        if (!name) {
            alert('장소를 선택해 주세요')
            return
        }
        setPlace({name, address, lat, lng})
        clickHandler()
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Input
                    islabel
                    labelBold
                    labelColor={theme.color.gray1}
                    labelText="먼저 장소를 정해주세요"
                    placeholder="장소를 입력해주세요."
                    _onClick={() => {
                        setShowMap(true);
                    }}
                    value={name}
                />
            </Grid>
            {showMap && (
                <PlanSelectMap
                    setShowMap={setShowMap}
                    setName={setName}
                    setAddress={setAddress}
                    setLat={setLat}
                    setLng={setLng}
                />
            )}
            <Grid bottom="0" padding="16px">
                <button
                    style={{
                        backgroundColor: !name ? '#eee' : '#A1ED00',
                        width: '100%',
                        height: '100%',
                        padding: '12px',
                        color: 'black',
                        border: 'none',
                        borderRadius: '10px',
                    }}
                    onClick={handleNext}>다음으로
                </button>
            </Grid>
        </React.Fragment>
    )
}

export default SetLocation;