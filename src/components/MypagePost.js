// 마이페이지에서 내가 올린 게시물 하나하나
import React from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { history } from "../redux/configuerStore";

const MypagePost = (props) => {
  const { id, image_url, title } = props;

  return (
    <>
      <Post>
        <PostLink
          onClick={() => {
            history.push(`/detail/${id}`);
          }}
        >
          <PostImage src={image_url} />
          <TitleWrap>
            <Title>
              {title}
              <Link>
                <span style={{ fontSize: "16px", verticalAlign: "top" }}>
                  바로가기
                </span>
                <IoIosArrowForward style={{ marginLeft: "8px" }} />
              </Link>
            </Title>
          </TitleWrap>
        </PostLink>
      </Post>
    </>
  );
};

const Post = styled.div`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  cursor: pointer;

  /* &:hover {
    -webkit-transition: all 300ms ease-in-out;
    -o-transition: all 300ms ease-in-out;
    transition: all 300ms ease-in-out;
    -webkit-filter: blur(1px);
    -moz-filter: blur(1px);
    -ms-filter: blur(1px);
    -o-filter: blur(1px);
    filter: blur(1px);
    transform: scale(1.03);
  } */
`;
const PostLink = styled.a`
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-color: #000;
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;

  &:after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    background-color: rgba(0, 0, 0, 0.65);
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
    opacity: 0;
  }
  &:hover:after {
    opacity: 1;
    position: absolute;
    /* top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px; */
  }
`;
const PostImage = styled.img`
  src: url(${(props) => props.src});
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  vertical-align: top;

  &:hover {
    zoom: 1;
    filter: alpha(opacity=50);
    -webkit-opacity: 0.5;
    opacity: 0.5;
  }
`;
const TitleWrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  text-align: center;
`;
const Title = styled.p`
  width: 90%;
  height: 100%;
  padding-top: 70px;
  margin: 0 5%;
  word-break: keep-all;
  opacity: 0;

  &:hover {
    -webkit-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
    opacity: 1;
  }
`;
const Link = styled.p`
  padding-top: 20px;
`;

export default MypagePost;
