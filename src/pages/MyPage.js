import React from "react";
import MypagePost from "../components/MypagePost";
import Header from "../components/Header";
import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";

const MyPage = () => {
  return (
    <>
      <Wrap>
        <Header />
        <PostWrap>
          <MypagePost />
        </PostWrap>
        <AddButton>
          <IoIosAddCircle
            style={{
              width: "50px",
              height: "50px",
              color: "#f5df4d",
              cursor: "pointer",
            }}
          />
        </AddButton>
      </Wrap>
    </>
  );
};

export default MyPage;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostWrap = styled.div`
  width: 900px;
  margin: 80px 0 0 10%;
`;

const AddButton = styled.div`
  position: fixed;
  bottom: 10px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #000;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    transition: all 300ms ease-in-out;
    transform: scale(1.03);
    box-shadow: 1px 1px 8px 1px #9e9e9e;
    cursor: pointer;
  }
`;
