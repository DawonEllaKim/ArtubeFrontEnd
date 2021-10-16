import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/modules/user";
import { profileActions } from "../redux/modules/profile";
import { Image } from "../elements";

const UserModal = (props) => {
  const dispatch = useDispatch();
  const userId = props.userId;

  const userInfo = useSelector((state) => state.profile.userInfo);
  const preview = useSelector((state) => state.profile.preview);
  const token = localStorage.getItem("token");

  const [userPic, setUserPic] = useState("");
  const profileImage = useRef();
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = profileImage.current.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(profileActions.setPreview(reader.result));
      setUserPic(reader.result);
    };
  };

  const [userIntro, setIntro] = useState();
  const editProfile = () => {
    dispatch(profileActions.updateProfileMiddleware(userPic, userIntro));
    setIntro("");
    setShowProfileModal(false);
  };

  useEffect(() => {
    dispatch(profileActions.getUserProfile(userId));
  }, []);

  const modalRef = useRef();
  const closemodal = (e) => {
    if (modalRef.current === e.target) {
      setShowProfileModal(false);
    }
  };
  const { showProfileModal, setShowProfileModal } = props;

  return (
    <div>
      {showProfileModal ? (
        <Wrap ref={modalRef} onClick={closemodal}>
          <Modal showModal={showProfileModal}>
            <Head>
              <h2>Edit Profile</h2>
              <Cancel
                onClick={() => {
                  setShowProfileModal((prev) => !prev);
                }}
              ></Cancel>
            </Head>
            <UserProfile>
              <ImageUpload>
                <Priview>
                  <Image
                    size="300"
                    style={{}}
                    src={
                      preview
                        ? preview
                        : "https://img.seoul.co.kr/img/upload/2021/09/28/SSI_20210928100517.jpg"
                    }
                  />
                </Priview>
                <input
                  type="file"
                  ref={profileImage}
                  onChange={selectFile}
                  style={{ marginTop: "30px", width: "200px" }}
                />
                <BtnWrap>
                  <ImgDeleteBtn> 프로필삭제</ImgDeleteBtn>
                </BtnWrap>
              </ImageUpload>
              <textarea
                style={{
                  width: "400px",
                  height: "100px",
                  border: "1px solid #dbdbdb",
                }}
                onChange={(e) => setIntro(e.target.value)}
                value={userIntro}
              >
                {userInfo.userIntro
                  ? userInfo.userIntro
                  : "자기소개를 입력하세요"}
              </textarea>
            </UserProfile>
            <BtnWrap>
              <Complete onClick={editProfile}>수정 완료</Complete>
            </BtnWrap>
          </Modal>
        </Wrap>
      ) : null}
    </div>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 2;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;
const Modal = styled.div`
  position: fixed;
  top: 10%;
  width: 676px;
  height: 800px;
  background-color: white;
`;
const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1.5px solid #e5e5e5;
`;
const Cancel = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: 20px;
  right: 23px;
  color: gray;
  background-color: transparent;
`;
const UserProfile = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px 0;
`;
const ImageUpload = styled.div`
  /* border: 1px solid red; */
`;
const Priview = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 150px;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  margin: auto;
`;

const ImgDeleteBtn = styled.button`
  width: 100px;
  height: 45px;
  padding: 12px 0px;
  margin: 20px 10px;
  background-color: #000;
  border: 1px solid #939597;
  border-radius: 7px;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
`;
/* const IntroUpload = styled.div``; */
const BtnWrap = styled.div`
  margin: 20px 0;
`;
const Complete = styled.button`
  width: 100px;
  height: 45px;
  padding: 12px 0px;
  background-color: #000;
  border: 1px solid #939597;
  border-radius: 7px;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
`;

export default UserModal;
