import React, { useEffect } from "react";
import styled from "styled-components";

import MypagePost from "../components/MypagePost";
import Header from "../components/Header";
import { AddModal } from "../components/AddModal";
// import UserModal from "../components/UserModal";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../redux/modules/post";
import { profileActions } from "../redux/modules/profile";

import { IoIosAddCircle } from "react-icons/io";
import { Image } from "../elements";

// const logedInUserId = useSelector((state) => state.user.user);
// const sameUser = userId === logedInUserId ? true : false;
const MyPage = (props) => {
  const dispatch = useDispatch();

  const myPostList = useSelector((state) => state.post.list);
  const userId = props.match.params.userId;
  const userInfo = useSelector((state) => state.profile.userInfo);
  console.log(userInfo);

  // 게시물 추가 모달 창 function
  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  // 프로필 추가 모달 창
  // const [showProfileModal, setShowProfileModal] = React.useState(false);
  // const openProfileModal = () => {
  //   setShowProfileModal(prev => !prev);
  // };

  useEffect(() => {
    dispatch(profileActions.getUserProfile(userId));
    dispatch(postActions.getMyPostMiddleware(userId));
  }, []);

  return (
    <>
      {userInfo && (
        <>
          <Wrap>
            {/* 고정된 헤더 */}
            <Header />
            <UserId>
              {userId}
              <span style={{ fontSize: "20px" }}> 님의 페이지입니다</span>
            </UserId>

            {/* 유저 프로필 */}
            {/* <ProfileWrap>
              <ProfileLeft>
                <ProfileImage src={userInfo ? userInfo.userPic : null} />
              </ProfileLeft>

              <ProfileRight>
                <UserWrap>
                  <UserId>{userId}</UserId>
                  {userId === userInfo.userId ? (
                    <EditBtn onClick={openProfileModal}>edit</EditBtn>
                  ) : null}
                </UserWrap>

                <Introduction>
                  <p>
                    {userInfo.userIntro
                      ? userInfo.userIntro
                      : `안녕하세요 ${userId}입니다.`}
                  </p>
                </Introduction>
              </ProfileRight>
            </ProfileWrap> */}

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
          {/* <UserModal
            userId={userId}
            showProfileModal={showProfileModal}
            setShowProfileModal={setShowProfileModal}
          /> */}
        </>
      )}
    </>
  );
};

const ProfileWrap = styled.div`
  display: flex;
  margin-top: 100px;
  width: 800px;
`;
const ProfileLeft = styled.div`
  width: 300px;
`;
const ProfileImage = styled.img`
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px auto;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
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
  color: #939597;
  font-size: 24px;
  font-weight: bold;
  padding: 120px 20px 20px 20px;
  border-bottom: 1px solid #dbdbdb;
`;
const EditBtn = styled.button`
  border: 1px solid #939597;
  background-color: transparent;
  height: 25px;
  margin-top: 30px;
`;
const Introduction = styled.div``;
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
  width: 790px;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 250px 250px 250px;
  grid-template-rows: 250px 250px 250px;
  gap: 20px;
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
