const REST_API_KEY = "e1c1e128ca3acab4cfdc6ac642e432d7";
// const REDIRECT_URI = "https://localhost:3000/api/kakao/callback";
const REDIRECT_URI = "https://imonint.shop/users/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

