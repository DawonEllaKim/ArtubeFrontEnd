import styled from "styled-components";
import React from "react";

const Image = props => {
  const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "circle",
  src: "https://img.seoul.co.kr/img/upload/2021/09/28/SSI_20210928100517.jpg",
  size: 36,
};

const ImageDefault = styled.div`
  --size: ${props => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${props => props.src}");
  background-size: contain;
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  margin: 0px 5px;
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${props => props.src}");
  background-size: cover;
`;

const ImageCircle = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size}px;

  background-image: url("${props => props.src}");
  background-size: cover;
  margin: 20px 200px 0px 0px;
`;

export default Image;
