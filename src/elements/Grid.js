// elements/Grid.js
import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const {
    is_flex,
    width,
    margin,
    height,
    padding,
    bg,
    children,
    center,
    left,
    right,
    bottom,
    heightCenter,
    is_cursor,
    _onClick,
    is_Grid,
    addStyle,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    left: left,
    right: right,
    bottom: bottom,
    height: height,
    heightCenter: heightCenter,
    is_cursor: is_cursor,
    is_Grid: is_Grid,
    _onClick: () => {},
  };
  return (
    <React.Fragment>
      <GridBox style={addStyle} {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  width: '100%',
  height: null,
  padding: false,
  margin: false,
  bg: false,
  center: false,
  left: false,
  right: false,
  bottom: false,
  heightCenter: false,
  is_cursor: false,
  is_Grid: false,
};

const GridBox = styled.div`
  width: ${props => props.width};
  ${props => (props.height ? `height: ${props.height}` : '')};

  box-sizing: border-box;
  ${props => (props.padding ? `padding: ${props.padding};` : '')}
  ${props => (props.margin ? `margin: ${props.margin};` : '')}
  ${props => (props.bg ? `background-color: ${props.bg};` : '')}
  ${props =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ''}
    ${props => (props.center ? `text-align: center;` : '')}
    ${props =>
    props.left
      ? `display: flex; align-items: center; justify-content: flex-start;`
      : ''}
          ${props =>
    props.right
      ? `display: flex; align-items: center; justify-content: flex-end;`
      : ''}
      ${props => (props.bottom ? `position: absolute; bottom: 0;` : '')}
  ${props => (props.is_cursor ? `cursor:pointer` : '')}

  ${props =>
    props.is_Grid
      ? `display:grid;grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;`
      : ''}
`;

export default Grid;