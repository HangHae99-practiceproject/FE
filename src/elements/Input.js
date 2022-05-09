import React from 'react';
import theme from '../Styles/theme';
import styled from 'styled-components';
import { FiUpload } from 'react-icons/fi';
import Text from './Text';
import Grid from './Grid';

const Input = props => {
  const {
    labelText,
    labelBold,
    labelColor,
    placeholder,
    _onChange,
    type,
    islabel,
    is_float,
    _type,
    _accept,
    _ref,
    _onClick,
    _onKeyDown,
    value,
    width,
    textAlign,
  } = props;

  if (is_float) {
    return (
      <FloatInput>
        <FiUpload
          size="24px"
          style={{ position: 'absolute', top: '15px', left: '15px' }}
        />
        <FileInput
          type={_type}
          accept={_accept}
          onChange={_onChange}
          placeholder={placeholder}
          multiple
        ></FileInput>
      </FloatInput>
    );
  }
  if (islabel) {
    return (
      <Grid>
        <Text
          bold={labelBold}
          color={labelColor}
          margin="0px"
          lineheight="20px"
        >
          {labelText}
        </Text>
        <ElInput
          type={type}
          ref={_ref}
          textAlign={textAlign}
          placeholder={placeholder}
          onChange={_onChange}
          onClick={_onClick}
          value={value}
        />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <ElInput
          type={type}
          ref={_ref}
          onKeyDown={_onKeyDown}
          placeholder={placeholder}
          onChange={_onChange}
          width={width}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  textAlign: '',
  islabel: false,
  labelText: '텍스트',
  labelBold: false,
  labelColor: '#000',
  placeholder: '텍스트를 입력해주세요.',
  type: 'text',
  is_float: false,
  width: '',
  height: '',
  _onChange: () => {},
  _onClick: () => {},
  _onKeyDown: () => {},
};

const ElInput = styled.input`
  border: 1px solid #c4c4c4;
  width: 100%;
  padding: 12px 12px;
  margin-top: 14px;
  margin-bottom: 14px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #ffffff;
`;
const FloatInput = styled.div`
  width: 54px;
  height: 54px;
  background-color: ${theme.color.orange};
  color: #ffffff;
  box-sizing: border-box;
  font-size: 24px;
  font-weight: 800;
  position: absolute;
  bottom: 10%;
  right: 10%;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
`;
const FileInput = styled.input`
  width: 54px;
  height: 54px;
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  font-size: 45px;
  position: absolute;
  right: 0px;
  top: 0px;
  opacity: 0;
  filter: alpha(opacity=0);
  -ms-filter: 'alpha(opacity=0)';
  -khtml-opacity: 0;
  -moz-opacity: 0;
`;

export default Input;