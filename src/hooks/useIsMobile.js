import React from 'react';
import useWindowDimensions from "./useWindowDimensions";
import {DeviceSizes} from "../styles/theme";
import { isMobile } from 'react-device-detect';

function useIsMobile() {
    const {width} = useWindowDimensions()
    return width <= DeviceSizes.mobile || isMobile
}

export default useIsMobile;