import React from "react";
import styled from "styled-components";

const MypagePost = () => {
  return (
    <>
      <Container>
        <Post>Click </Post>
        <Post>Click </Post>
        <Post>Click </Post>
        <Post>Click </Post>
        <Post>Click </Post>
        <Post>Click </Post>
        <Post>Click </Post>
        <Post>Click </Post>
        <Post>Click </Post>
      </Container>
    </>
  );
};

export default MypagePost;

const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 250px 250px;
  grid-template-rows: 250px 250px 250px;
  gap: 3%;
`;

const Post = styled.div`
  display: flex;
  background-color: pink;
  background-image: url("https://img.seoul.co.kr/img/upload/2021/09/28/SSI_20210928100517.jpg");
  background-size: cover;
  cursor: pointer;
  &:hover {
    -webkit-transition: all 300ms ease-in-out;
    -o-transition: all 300ms ease-in-out;
    transition: all 300ms ease-in-out;
    -webkit-filter: blur(1px);
    -moz-filter: blur(1px);
    -ms-filter: blur(1px);
    -o-filter: blur(1px);
    filter: blur(1px);
    transform: scale(1.03);
  }
`;
