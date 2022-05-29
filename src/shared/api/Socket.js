import SockJS from 'sockjs-client';
import { over } from 'stompjs';

/**
 * @param {*} props
 * @returns 리턴 설명 적어주기
 * @역할 무엇을 위한 컴포넌트인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

let testvalue = 1;
export const testcol = () => {
  console.log(testvalue);
};
const settestvalue = e => {
  testvalue = e;
};

let publicChats = null;
let userData = {
  sender: '',
  connected: false,
  content: '',
};
const setuserData = e => {
  userData = e;
};
const setPublicChats = e => {
  publicChats = e;
};
let stompClient = null;
// const [publicChats, setPublicChats] = useState([]);
// const [userData, setUserData] = useState({
//   sender: '',
//   connected: false,
//   content: '',
// });
const sockUrl = process.env.REACT_APP_BE_IP_LYW + '/ws';

const connect = () => {
  let sock = new SockJS(sockUrl);
  stompClient = over(sock);
  stompClient.connect({}, onConnected, onError);
  sock.addEventListener('open', () => {
    console.log('Connected to Browser!!!😀');
  });
  sock.addEventListener('message', message => {
    console.log('Got this:', message, '😀');
  });
  sock.addEventListener('close', () => {
    console.log('Disconnected to Server😀');
  });
};

const userJoin = () => {
  let chatMessage = {
    sender: userData.sender,
    type: 'ENTER',
  };
  stompClient.send('/chat/chat.sendMessage', {}, JSON.stringify(chatMessage));
};
const onConnected = () => {
  setuserData({ ...userData, connected: true });
  stompClient.subscribe(`/topic/public`, onMessageReceived, onError);
  userJoin();
};
const disConneted = () => {
  stompClient.disconneted(() => {
    console.log('disconnect');
  });
};
const onMessageReceived = payload => {
  let payloadData = JSON.parse(payload.body);
  console.log('payloadData=', payloadData);
  setPublicChats(prevPublicChats => [...prevPublicChats, payloadData]);
};
const onError = err => {
  console.log('Error', err);
};
const handleMessage = event => {
  const { value } = event.target;
  setuserData({ ...userData, content: value });
};
const sendMessage = () => {
  console.log(' 메시지 보내기 클릭!');
  if (stompClient) {
    let chatMessage = {
      sender: userData.sender,
      content: userData.content,
      type: 'CHAT',
    };
    console.log(' 내가 보낸 메시지 ==', chatMessage);
    stompClient.send('/chat/chat.sendMessage', {}, JSON.stringify(chatMessage));
    setuserData({ ...userData, content: '' });
  }
};
const handleUsername = event => {
  const { value } = event.target;
  setuserData({ ...userData, sender: value });
};

const registerUser = () => {
  connect();
};

export {
  userData,
  publicChats,
  testvalue,
  settestvalue,
  connect,
  userJoin,
  onConnected,
  disConneted,
  onMessageReceived,
  onError,
  handleMessage,
  sendMessage,
  handleUsername,
  registerUser,
};