// 내 프로필 페이지 - 내가 올린 게시물들을 볼 수 있음

import React, { useEffect } from "react";
import styled from "styled-components";

import MypagePost from "../components/MypagePost";
import Header from "../components/Header";
import { AddModal } from "../components/AddModal";
import UserModal from '../components/UserModal';
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../redux/modules/post";

import { IoIosAddCircle } from "react-icons/io";

const MyPage = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  // const post_list = useSelector((state) => state.post.list);
  const userId = props.match.params.userId;
  console.log(props.match);
  const myPostList = useSelector((state) => state.post.list);
  const logedInUserId = useSelector((state) => state.user.user);
  const sameUser = userId === logedInUserId ? true : false;
  // const myPostList = post_list.filter((p) => p.userId === userId);
  // console.log(myPostList);

  // 게시물 추가 모달 창 function
  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  // 프로필 추가 모달 창
  const [showProfileModal, setShowProfileModal] = React.useState(false);
  const openProfileModal = () =>{
    setShowProfileModal((prev) => !prev);
  } 

  // useEffect(() => {
  //   dispatch(postActions.getPostMiddleware());
  // }, []);

  useEffect(() => {
    dispatch(postActions.getMyPostMiddleware(userId));
  }, [userId]);

  return (
    <>
      <Wrap>
        {/* 고정된 헤더 */}
        <Header />

        {/* 유저 프로필 */}
        <ProfileWrap>
          <ProfileLeft>
            <ProfileImage></ProfileImage>
          </ProfileLeft>

          <ProfileRight>
            <UserWrap>
              <UserId>{userId}</UserId>
              {sameUser ? <EditBtn onClick={openProfileModal}>edit</EditBtn> : null}
            </UserWrap>

            <Introduction>
              <p>자기소개를 입력하세요</p>
            </Introduction>
          </ProfileRight>
        </ProfileWrap>

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
      {/* 프로필 수정 모달창 */}
      <UserModal showProfileModal={showProfileModal} setShowProfileModal={setShowProfileModal} />
    </>
  );
};

const ProfileWrap = styled.div`
  display: flex;
  margin-top: 70px;
  width: 800px;
`;
const ProfileLeft = styled.div`
  width: 300px;
`;
const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px auto;

  border: 1px solid #dbdbdb;
  box-sizing: border-box; ;
`;
const ProfileRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;
const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const UserId = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 30px 0;
`;
const EditBtn = styled.button`
  border: 1px solid #939597;
  background-color: transparent;
  height: 25px;
  margin-top: 30px;
`;
const Introduction = styled.div`
`;
const WriteTintro = styled.textarea`
  width: 400px;
  height: 100px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  box-sizing: border-box;
`;
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
