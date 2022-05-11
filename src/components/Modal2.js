import React from "react";
import ModalPortal from "./ModalPortal";
import styled from "styled-components";
import SetDropdown from "./SetDropdown";

const Modal2 = ({onClose, hour, setHour, minute, setMinute, amPmType, setAmPmType}) => {

    return (
        <ModalPortal>
            <Background>
                <Content>
                    <SetDropdown onClose={onClose}
                                 hour={hour}
                                 setHour={setHour}
                                 minute={minute}
                                 setMinute={setMinute}
                                 amPmType={amPmType}
                                 setAmPmType={setAmPmType}/>
                </Content>
            </Background>
        </ModalPortal>
    );
};

export default Modal2;

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  text-align: center;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
`;