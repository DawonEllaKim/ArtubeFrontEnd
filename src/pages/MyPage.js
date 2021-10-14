// 내 프로필 페이지 - 내가 올린 게시물들을 볼 수 있음

import React, { useEffect } from "react";
import styled from "styled-components";

import MypagePost from "../components/MypagePost";
import Header from "../components/Header";
import { AddModal } from "../components/AddModal";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../redux/modules/post";

import { IoIosAddCircle } from "react-icons/io";

const MyPage = () => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const userId = "나당";

  const myPostList = post_list.filter((p) => p.userId === userId);
  // console.log(userId);
  console.log(myPostList);

  // 게시물 추가 모달 창 function
  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    dispatch(postActions.getPostMiddleware());
  }, []);

  return (
    <>
      <Wrap>
        {/* 고정된 헤더 */}
        <Header />

        {/* 내가 올린 동영상 모음 */}
        <PostWrap>
          {myPostList.map((p, idx) => {
            return <MypagePost {...p} key={idx} />;
          })}
        </PostWrap>

        {/* 게시물 추가 모달창 여는 버튼 */}
        <AddButton>
          <IoIosAddCircle
            style={{
              width: "50px",
              height: "50px",
              color: "#f5df4d",
              cursor: "pointer",
            }}
            onClick={openModal}
          />
        </AddButton>
      </Wrap>

      {/* 게시물 추가 모달창 */}
      <AddModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostWrap = styled.div`
  width: 900px;
  margin: 80px 0 0 10%;
  display: grid;
  grid-template-columns: 250px 250px 250px;
  grid-template-rows: 250px 250px 250px;
  gap: 3%;
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

export default MyPage;
