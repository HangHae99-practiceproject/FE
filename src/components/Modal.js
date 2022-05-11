import React from "react";
import ModalPortal from "./ModalPortal";
import SetTimeCalendar from "./SetTimeCalendar";
import styled from "styled-components";

const Modal = ({ onClose, date, setDate }) => {

    return (
        <ModalPortal>
            <Background>
                <Content>
                    <SetTimeCalendar onClose={onClose} date={date} setDate={setDate}/>
                </Content>
            </Background>
        </ModalPortal>
    );
};

export default Modal;

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