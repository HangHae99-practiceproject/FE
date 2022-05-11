import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  // bold : font-weight / size : font-size / lineheight: line-height
  // textoverf : text-overflow / ws : white-space /overf:overflow
  const {
    children,
    width,
    bold,
    color,
    size,
    margin,
      padding,
    lineheight,
    textoverf,
    ws,
    overf,
    cursor,

    // media
    m_size,
  } = props;

  const styles = {
    width,
    bold,
    color,
    size,
    margin,
    lineheight,
    overf,
    textoverf,
    padding,
    ws,
    cursor,

    // media
    m_size,
  };

  return (
    <React.Fragment>
      <DefaultText {...styles}> {children} </DefaultText>
    </React.Fragment>
  );
};

Text.defaultProps = {
  children: null,
  width: 'auto',
  bold: false,
  color: 'black',
  size: '1em',
  margin: 'auto',
  padding: '8px',
  lineheight: 'null',
  cursor: 'default',

  // media
  m_size: '1em',
  overf: false,
  textoverf: false,
  ws: false,
};

const DefaultText = styled.p`
  width: ${props => props.width};
  font-weight: ${props => (props.bold ? '700' : '400')};
  color: ${props => props.color};
  font-size: ${props => props.size};
  margin: ${props => props.margin};
  padding : ${props => props.padding};
  ${props => (props.lineheight ? `line-height: ${props.lineheight}` : '')};
  ${props => (props.overf ? `overflow:auto` : '')};
  ${props => (props.textoverf ? 'text-overflow: ellipsis' : '')};
  ${props => (props.ws ? `white-space: ${props.ws}` : '')};

  cursor: ${props => props.cursor};
  letter-spacing: -1px;
`;

// @media ${theme.device.mobileM} {
//   font-size: ${props => props.m_size};
//   ${props =>
//     props.m_lineheight ? `line-height: ${props.m_lineheight}` : ''};
// }
export default Text;