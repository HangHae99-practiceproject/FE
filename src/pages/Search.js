import React, { useState, useCallback } from "react";
import GlobalStyle from '../Styles/GlobalStyle'
import KakaoMap from "../shared/KakaoMap";
import _ from "lodash";
 
const Search = (props) => {
const [keyword, setKeyword] = useState(null);
  const [search, setSearch] = useState(null);

  const searchWord = useCallback(
    _.debounce((e) => {
      setKeyword(e.target.value);
    }, 100),
    []
  );

  const onClick = () => {
    if (!keyword) {
      return alert("검색어를 입력해주세요");
    }
    setSearch(keyword);
  };

  return (
    <>
      <div>
        <GlobalStyle/>
        <input  onChange={searchWord} />
        <button onClick={onClick}>
          검색
        </button>
        <KakaoMap
          keyword={search}
        />
      </div>
    </>
  );
};
export default Search;