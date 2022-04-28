// GlobalStyle.js
import { createGlobalStyle } from 'styled-components';
import PretendardBold from './font/Pretendard-Bold.woff';
import PretendardMedium from './font/Pretendard-Medium.woff';
import PretendardRegular from './font/Pretendard-Regular.woff';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-family: 'Pretendard', sans-serif;
  }

  body {
    box-sizing: border-box;

  }
  button,img{
    cursor:pointer;
  }

  @font-face {
    font-family:'Noto Sans Kr' ;
    font-weight: 700;
    src: url(${PretendardBold});
  }

  @font-face {
    font-family:'Noto Sans Kr' ;
    font-weight: 500;
    src: url(${PretendardMedium});
  }

  @font-face {
    font-family:'Noto Sans Kr' ;
    font-weight: 400;
    src: url(${PretendardRegular});
  }
`;

export default GlobalStyle;