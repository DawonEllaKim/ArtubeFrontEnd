import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding, size } =
    props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin,
    width,
    padding,
    size,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "90%",
  padding: false,
};

const ElButton = styled.button`
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: 45px;
  margin-bottom: 15px;
  padding: 12px 0px;
  background-color: #000;
  border: 1px solid #939597;
  border-radius: 7px;

  color: #fff;
  font-weight: 700;
  font-size: 15px;

  cursor: pointer;

  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  font-size: ${(props) => (props.size ? props.size : "")};
  /* font-weight: ${(props) => (props.bold ? "600" : "400")}; */
`;

const FloatButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #f5df4d;
  color: black;
  box-sizing: border-box;
  font-size: 30px;
  font-weight: 600;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;

export default Button;
