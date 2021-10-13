// 마이페이지에서 내가 올린 게시물 하나하나

import React from "react";
import styled from "styled-components";

<<<<<<< HEAD
// import { Image } from "../elements";
=======
import { Image, Grid } from "../elements";
>>>>>>> 987bb8ff4c7c1070ff34502065250c6e510414d9
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
<<<<<<< HEAD
            <PostImage
              src={`https://img.youtube.com/vi/${url}/sddefault.jpg`}
=======
            <Image
              shape="rectangle"
              src={image_url}
              style={{ width: "250px", height: "250px" }}
>>>>>>> 987bb8ff4c7c1070ff34502065250c6e510414d9
            />
            <TitleWrap>
              <Title>hover</Title>
            </TitleWrap>
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
  border: 1px solid red;
`;

const Post = styled.div`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  /* position: relative;
  overflow: hidden;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  background-color:#000;
  background-size: cover;
  cursor: pointer;

  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease; */

  /* background-color: pink; */
  /* background-image: url("https://img.seoul.co.kr/img/upload/2021/09/28/SSI_20210928100517.jpg"); */


  /* &:after{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.65);
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
    opacity: 0;
  }

  &:hover:after{
    opacity: 1;
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
  } */

  &:hover {
    /* -webkit-transition: all 300ms ease-in-out;
    -o-transition: all 300ms ease-in-out;
    transition: all 300ms ease-in-out;
    -webkit-filter: blur(1px);
    -moz-filter: blur(1px);
    -ms-filter: blur(1px);
    -o-filter: blur(1px);
    filter: blur(1px);
    transform: scale(1.03); */
  }
`;

const PostLink = styled.a`
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  color:#fff;
  font-size: 20px;
  background-color: #000;
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;

  &:after{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.65);
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
    opacity: 0;

    &:hover:after{
      
    }

`;

const PostImage = styled.img`
  src: url(${(props) => props.src});
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  vertical-align: top;

  &:hover{
    zoom: 1;
    filter: alpha(opacity=50);
    -webkit-opacity: 0.5;
    opacity: 0.5;
  }
`

const TitleWrap = styled.div`
 position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 40px;
`
const Title = styled.p`
  /* width:100%;
  height: 100%; */
  /* &:hover{
    -webkit-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
    opacity: 1;
  } */
`

export default MypagePost;
