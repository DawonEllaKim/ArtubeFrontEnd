import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";

const UserModal = (props) => {
  const modalRef = useRef();

  const closemodal = (e) => {
    if (modalRef.current === e.target) {
      setShowProfileModal(false);
    }
  };

  const { showProfileModal, setShowProfileModal } = props;

  return (
    <>
      {showProfileModal ? (
        <Wrap ref={modalRef} onClick={closemodal}>
          <Modal showModal={showProfileModal}>
            <Head>
              <h2>Edit Profile</h2>
              <Cancel
                onClick={() => {
                  setShowProfileModal((prev) => !prev);
                }}
              >
                <ImCancelCircle
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                />
              </Cancel>
            </Head>
            <UserProfile>
              <ImageUpload>
                <Priview />
                <BtnWrap>
                  <ImgUploadBtn>수정</ImgUploadBtn>
                  <ImgDeleteBtn>삭제</ImgDeleteBtn>
                </BtnWrap>
              </ImageUpload>
              <textarea style={{width: '400px', height: '100px', border:'1px solid #dbdbdb'}}>자기소개를 입력하세요</textarea>
            </UserProfile>
            <BtnWrap>
              <Complete>수정 완료</Complete>
            </BtnWrap>
          </Modal>
        </Wrap>
      ) : null}
    </>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 2;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
const ImageUpload = styled.div``;
const Priview = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 150px;
  border: 1px solid #dbdbdb;
  margin: auto;
`;
const ImgUploadBtn = styled.button`
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
