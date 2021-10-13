import React from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

import Header from "../components/Header";
import Comment from "../components/Comment";

import { Grid, Input, Text, Button, Image } from "../elements";
import { history } from "../redux/configuerStore";

const Detail = () => {
  return (
    <>
      <Header />
      <CommentWrap>
        <ImageWrap>
          <Image shape="rectangle" />
        </ImageWrap>
        <DetailWrap>
          <User>
            <FaUserCircle
              style={{
                width: "24px",
                height: "24px",
                color: "#939597",
                margin: "10px",
              }}
            />
            <UserLink
              onClick={() => {
                history.push("/mypage");
              }}
            >
              <Text bold>Hwang</Text>
            </UserLink>
          </User>
          <Comments>
            <Comment />
          </Comments>
          <InputWrap>
            <InputBox />
            <AddButton>등록</AddButton>
          </InputWrap>
        </DetailWrap>
      </CommentWrap>
    </>
  );
};

const CommentWrap = styled.div`
  display: flex;
  width: 65%;
  border: 1px solid #f5df4d;
  border-radius: 2px;
  padding: 5px 0;
  margin: 100px auto;
  box-shadow: 2px 2px 2px #dbdbdb;
`;

const ImageWrap = styled.div`
  width: 70%;
`;
const DetailWrap = styled.div`
  position: relative;
  width: 30%;
  margin-right: 5px;
  box-sizing: border-box;
`;

const User = styled.div`
  display: flex;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  width: 100%;
  position: absolute;
  top: 0;
`;
const UserLink = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Comments = styled.div`
  padding-top: 50px;
`;
const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #dbdbdb;
  padding-top: 5px;
`;

const InputBox = styled.input`
  border: none;
  border-bottom: 1px solid #939597;
  padding: 4px;
  width: 75%;
`;
const AddButton = styled.button`
  border: none;
  background-color: #939597;
  color: #fff;
  width: 20%;
  padding: 8px 0;
  cursor: pointer;
`;

export default Detail;
