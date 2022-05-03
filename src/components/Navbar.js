import React, { useState } from 'react';
import styled from "styled-components";

import {FaBars} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import {SidebarData} from "./SidebarData";

function Navbar() {

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => {
        setSidebar(!sidebar)
    }

    return (
        <>

        </>
    );
}
export default Navbar;