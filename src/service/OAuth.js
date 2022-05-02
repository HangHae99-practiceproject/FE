const REST_API_KEY = '3b9abf3ba78dbe030d6f9e62b0269ddb';
const REDIRECT_URI = 'http://localhost:3000/signin/oauth2/code/kakao';


export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;