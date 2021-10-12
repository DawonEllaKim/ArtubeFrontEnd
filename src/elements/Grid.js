import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, margin, padding, children, bg, border, borderRadius, shadow, center, _onClick } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg, 
    border: border,
    borderRadius:borderRadius,
    shadow:shadow,
    center: center,
  };
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  border: false,
  borderRadius: false,
  shadow: false,
  center: false,
  _onClick: () => {},
  children: null,
};

const GridBox = styled.div`
  box-sizing: border-box;
  /* margin: auto; */

  width: ${(props) => props.width};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")};
  ${(props) => (props.border ? `border: ${props.border};` : "")};
  ${(props) => (props.borderRadius ? `border-radius: ${props.borderRadius};` : "")};
  ${(props) => (props.shadow ? `box-shadow: ${props.shadow};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};

  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between;`
      : ""}
      
  text-align: center;
`;
export default Grid;
