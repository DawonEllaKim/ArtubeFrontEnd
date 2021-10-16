import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import { IoPersonOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { postActions } from "../redux/modules/post";

export const AddModal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();

  const closemodal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");

  function TextInput(e, setState) {
    setState(e.target.value);
  }

  const addPost = () => {
    const post = {
      title,
      url,
      desc,
    };
    dispatch(postActions.addPostMiddleware(post));
    setShowModal(false);
    setTitle("");
    setUrl("");
    setDesc("");
  };

  // const
  // if (is_addModal) {
  return (
    <div>
      {showModal ? (
        <Wrap ref={modalRef} onClick={closemodal}>
          <ModalContent showModal={showModal}>
            <Head>
              <h2>Create Post</h2>
              <Cancel
                onClick={() => {
                  setShowModal((prev) => !prev);
                }}
              >
                <ImCancelCircle
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                />
              </Cancel>
            </Head>

            <Body>
              <PostInput>
                <PostWrap>
                  <p style={{ textAlign: "left" }}> 동영상 제목:</p>
                  <Input
                    onChange={(e) => TextInput(e, setTitle)}
                    value={title}
                  />
                </PostWrap>
                <PostWrap>
                  <p> 동영상 url:</p>
                  <Input onChange={(e) => TextInput(e, setUrl)} value={url} />
                </PostWrap>
                <PostWrap>
                  <p> 동영상 후기:</p>
                  <Input onChange={(e) => TextInput(e, setDesc)} value={desc} />
                </PostWrap>
                <Submit onClick={addPost}>게시물 추가</Submit>
              </PostInput>
            </Body>
          </ModalContent>
        </Wrap>
      ) : null}
    </div>
  );
};
// };

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
const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1.5px solid #e5e5e5;
`;
const Cancel = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: 20px;
  right: 23px;
  color: gray;
`;
const ModalContent = styled.div`
  position: fixed;
  top: 10%;
  width: 676px;
  height: 800px;
  background-color: white;
`;
const Body = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: left;
`;
const PostInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  width: 90%;
  margin: auto auto auto -1px;
`;
const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  width: 100%;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 80%;
  height: 50px;
  margin: 0 0 10px 0;
  /* margin-bottom: 10px; */
  padding: 15px 10px;
  border: 1px solid #939597;
  border-radius: 5px;
  font-size: 16px;
`;
const Submit = styled.button`
  /* box-sizing: border-box; */
  width: 80%;
  height: 45px;
  margin: 30px;
  padding: 12px 0px;
  background-color: #000;
  border: 1px solid #939597;
  border-radius: 7px;

  color: #fff;
  font-weight: 700;
  font-size: 15px;

  cursor: pointer;
`;
