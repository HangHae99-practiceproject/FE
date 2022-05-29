import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme';
import Headerbar from '../shared/Headerbar';
import { Text, Grid } from '../elements';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const PlanChating = props => {
  let stompClient = props.stompClient;
  let userData = props.userData;
  let setUserData = props.setUserData;
  const setIsChating = props.setIsChating;
  const publicChats = props.publicChats;
  const scrollRef = useRef();
  useEffect(() => {
    scrollToBottom();
    return () => {
      // undidMount
    };
  }, [publicChats]);
  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = scrollRef.current;
    scrollRef.current.scrollTop = scrollHeight - clientHeight;
  };

  //메시지 내용 추가함수
  const handleMessage = event => {
    const { value } = event.target;
    setUserData({ ...userData, content: value });
  };
  //보내기 버튼
  const sendMessage = () => {
    if (stompClient) {
      let chatMessage = {
        sender: props.usernick,
        content: userData.content,
        planId: props.planId,
        type: 'CHAT',
      };
      // console.log(' 내가 보낸 메시지 ==', chatMessage);

      stompClient.send('/maps/chat.send', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, content: '' });
    }
  };
  //엔터 입력시
  const handleKeyDownSendMessage = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage();
    }
  };
  return (
    <>
      <Section>
        <MainModal>
          <Headerbar
            is_Edit
            text={`${props.planName} 채팅방`}
            _onClickClose={() => {
              setIsChating(false);
            }}
            _onClickEdit={() => {}}
          ></Headerbar>
          {userData.connected && publicChats && (
            <Page ref={scrollRef}>
              {publicChats.map((chat, index) => (
                <div key={index}>
                  {chat.type === 'ENTER' && (
                    <EnterTheUser>
                      <EnterTheUserInner>
                        <Text>{chat.content}</Text>
                      </EnterTheUserInner>
                    </EnterTheUser>
                  )}
                  {chat.type === 'CHAT' && chat.sender === props.usernick && (
                    <SenderWrapper>
                      <Sender>{chat.sender}</Sender>
                      <SenderInner>
                        <Sendercontent>{chat.content}</Sendercontent>
                      </SenderInner>
                    </SenderWrapper>
                  )}

                  {chat.type === 'CHAT' && chat.sender !== props.usernick && (
                    <ReceiverWrapper>
                      <Receiver>{chat.sender}</Receiver>
                      <ReceiverInner>
                        <Receiv>{chat.content}</Receiv>
                      </ReceiverInner>
                    </ReceiverWrapper>
                  )}
                </div>
              ))}
              <TextInputWrapper>
                <Grid is_flex center>
                  <ButtonImagePlus
                    _onClick={() => {
                      // console.log('plus');
                    }}
                  ></ButtonImagePlus>
                  <InputText
                    type="text"
                    placeholder="내용을 입력해주세요"
                    value={userData.content}
                    onChange={handleMessage}
                    onKeyDown={handleKeyDownSendMessage}
                  />
                  <ButtonImageSend onClick={sendMessage} />
                </Grid>
              </TextInputWrapper>
            </Page>
          )}
        </MainModal>
      </Section>
    </>
  );
};

// 스타일 컴포넌트 작성 위치
//전체 모달창
const Section = styled.div`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.laptop} {
    border-radius: 40px 40px 0px 0px;
  }
`;

const MainModal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 40px;
`;
//채팅페이지
const Page = styled.div`
  height: calc(100% - 92px);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;
//유저 입장표시
const EnterTheUser = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgb(158, 158, 158); */
  margin: 10px;
  border-radius: 20px;
`;
const EnterTheUserInner = styled.div`
  background-color: ${theme.color.gray3};
  min-width: 70%;
  padding: 4px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//유저 보낸 스타일
const SenderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 4px;
  margin: 10px;
`;
const SenderInner = styled.div`
  background-color: ${theme.color.green};
  border-radius: 4px;
  padding: 4px 8px;
`;

const Sender = styled.div`
  color: ${theme.color.black};
  font-size: 0.8rem;
`;

const Sendercontent = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  align-items: center;

  color: rgba(255, 255, 255, 0.7);

  color: ${theme.color.white};
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  word-break: break-all;
  white-space: pre-wrap;
`;

//리시브
const ReceiverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  margin: 10px;
`;
const ReceiverInner = styled.div`
  background-color: ${theme.color.gray5};
  border-radius: 4px;
  padding: 4px 8px;
`;
const Receiver = styled.div`
  color: ${theme.color.black};
  font-size: 0.8rem;
`;
const Receiv = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  align-items: center;

  color: rgba(255, 255, 255, 0.7);

  color: ${theme.color.realblack};
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  word-break: break-all;
  white-space: pre-wrap;
`;

//입력창
const ButtonImagePlus = styled.img`
  width: 23px;
  height: 23px;
  border-radius: 50px;
  padding: 12px 4% 12px 4%;
`;
const ButtonImageSend = styled.img`
  width: 23px;
  height: 23px;
  border-radius: 50px;
  padding: 12px 4% 12px 4%;
`;

const InputText = styled.input`
  border: 1px solid #c4c4c4;
  width: 100%;
  min-height: 30px;
  padding: 8px;
  box-sizing: border-box;
  background: ${theme.color.white};
  border-radius: 30px;
  &:focus {
    outline: none;
  }
`;
const TextInputWrapper = styled.div`
  min-height: 46px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${theme.color.green};
`;
export default PlanChating;