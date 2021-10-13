// 마이페이지에서 내가 올린 게시물 하나하나

import React from "react";
import styled from "styled-components";

import { Image, Grid } from "../elements";
import { history } from "../redux/configuerStore";

const MypagePost = props => {
  console.log(props);
  const { id, image_url } = props;

  return (
    <>
      <Grid is_flex margin="20px" width="auto">
        <Post>
          <PostLink
            onClick={() => {
              history.push(`/detail/${id}`);
            }}
          >
            <Image
              shape="rectangle"
              src={image_url}
              style={{ width: "250px", height: "250px" }}
            />
          </PostLink>
        </Post>
      </Grid>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 250px 250px;
  grid-template-rows: 250px 250px 250px;
  gap: 3%;
`;

const PostLink = styled.a``;

const Post = styled.div`
  display: flex;
  height: 100%;
  background-color: pink;
  /* background-image: url("https://img.seoul.co.kr/img/upload/2021/09/28/SSI_20210928100517.jpg"); */
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

export default MypagePost;
