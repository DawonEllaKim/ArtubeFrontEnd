import React from "react";
import styled from "styled-components";

const UserModal = () => {
  return (
    <>
      <Wrap>
        <Modal>
          <Head>
            <h2>Edit Profile</h2>
            <Cancel>Close</Cancel>
          </Head>
          <UserProfile>
            <ImageUpload>
              <Priview></Priview>
              <ImgUploadBtn>Upload</ImgUploadBtn>
              <ImgDeleteBtn>삭제</ImgDeleteBtn>
            </ImageUpload>
            <IntroUpload>자기소개를 입력하세요</IntroUpload>
          </UserProfile>
          <BtnWrap>
            <Complete>수정 완료</Complete>
          </BtnWrap>
        </Modal>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div``;
const Head = styled.div``;
const Cancel = styled.button``;
const UserProfile = styled.div``;
const ImageUpload = styled.div``;
const Priview = styled.div``;
const ImgUploadBtn = styled.button``;
const ImgDeleteBtn = styled.button``;
const IntroUpload = styled.div``;
const BtnWrap = styled.div``;
const Complete = styled.div``;

export default UserModal;
