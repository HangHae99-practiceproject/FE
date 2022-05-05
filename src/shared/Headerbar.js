import React from 'react';
import styled from 'styled-components';
import Grid from '../elements/Grid';
import Text from '../elements/Text';
import { GrClose } from 'react-icons/gr';
import { FiSettings } from 'react-icons/fi';
import { BsChevronLeft } from 'react-icons/bs'
// import theme from '../Styles/theme';

/**
 * @param {*} props _onClickClose : Close아이콘 클릭이벤트
 * @returns 헤더바
 * @역할 헤더바
 * @필수값 필수 없음
 */

const Headerbar = props => {
  const { _onClickClose, isback, text, _onClickEdit, is_Edit } = props;

  return (
    <>
      <Grid is_flex padding="12px" center>
        {isback ? (
          <BsChevronLeft
            size="22px"
            cursor="pointer"
            onClick={_onClickClose}
          />
        ) : (
          <GrClose size="22px" cursor="pointer" onClick={_onClickClose} />
        )}
        <Text bold>{text}</Text>
        <div></div>
        {is_Edit && (
          <FiSettings size="22px" cursor="pointer" onClick={_onClickEdit} />
        )}
      </Grid>
    </>
  );
};

// 스타일 컴포넌트 작성 위치
// eslint-disable-next-line no-unused-vars
const StyleComponent = styled.div``;

// default props 작성 위치
Headerbar.defaultProps = { isback: false, _onClick: () => {} };

export default Headerbar;