import React from 'react';
import styled from 'styled-components';
import Text from '../../elements/Text';
import Grid from '../../elements/Grid';
import theme from '../../Styles/theme';

const ModalConfirm = props => {
  const { open, close, title, contents } = props;
  return (
    <>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <Section>
            <MainModal>
              <ModalPopup>
                <ModalText>
                  <Grid padding="20px">
                    <Text size="14px" color={theme.color.gray4}>
                      {title}
                    </Text>
                    <div style={{ padding: '5px' }}></div>
                    <Text size="11px" color={theme.color.gray4}>
                      {contents}
                    </Text>
                  </Grid>
                </ModalText>
                <ModalButton>
                  <ModalButtonConfirm className="close" onClick={close}>
                    확인
                  </ModalButtonConfirm>
                </ModalButton>
              </ModalPopup>
            </MainModal>
          </Section>
        ) : null}
      </div>
    </>
  );
};

// 스타일 컴포넌트 작성 위치
const Section = styled.div`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainModal = styled.div`
  position: absolute;
  width: 80%;
  height: 25%;
  background-color: white;
  border-radius: 15px;
`;
const ModalPopup = styled.div`
  height: 100%;
`;
const ModalText = styled.div`
  height: calc(100% - 40px);
  display: flex;
  justify-content: center;
  /* align-items: center; */
  text-align: center;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
  white-space: pre-line;
`;
const ModalButton = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
`;
const ModalButtonConfirm = styled.div`
  height: 40px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  border: 1px solid #9e9e9e;
`;

// default props 작성 위치
ModalConfirm.defaultProps = {
  open: false,
  close: false,
  title: '',
  contents: '',
};

export default ModalConfirm;