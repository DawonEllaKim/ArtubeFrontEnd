import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import { IoPersonOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../redux/modules/post";

export const EditModal = props => {
  const modalRef = useRef();

  const closemodal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const { showModal, setShowModal, _postId } = props;

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");

  function TextInput(e, setState) {
    setState(e.target.value);
    console.log(title, url, desc);
  }

  const _post = useSelector(state => state.post.list).filter(
    p => p.postId === _postId
  )[0];
  console.log(_post);

  const dispatch = useDispatch();

  const deletePost = () => {
    dispatch(postActions.deletePostMiddleware(_postId));
  };

  const editPost = () => {};

  return (
    <div>
      {showModal && _post ? (
        <Wrap ref={modalRef} onClick={closemodal}>
          <ModalContent showModal={showModal}>
            <Head>
              <h2>Create Post</h2>
              <Cancel
                onClick={() => {
                  setShowModal(prev => !prev);
                }}
              >
                <ImCancelCircle
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                />
              </Cancel>
            </Head>

            <Body>
              <UserInfo>
                <IoPersonOutline
                  style={{
                    width: "25px",
                    height: "25px",
                    border: "2px solid #000",
                    borderRadius: "50%",
                    padding: "2px",
                    cursor: "pointer",
                    zIndex: "10000",
                    margin: "10px",
                  }}
                />
                <h3>userid</h3>
              </UserInfo>

              <PostInput>
                <PostWrap>
                  <p style={{ textAlign: "left" }}> 동영상 제목:</p>
                  <Input
                    defaultValue={_post.title}
                    _onChange={e => TextInput(e, setTitle)}
                    value={title}
                  />
                </PostWrap>
                <PostWrap>
                  <p> 동영상 url:</p>
                  <Input
                    defaultValue={`https://www.youtube.com/embed/${_post.url}`}
                    _onChange={e => TextInput(e, setUrl)}
                    value={url}
                  />
                </PostWrap>
                <PostWrap>
                  <p> 동영상 썸네일:</p>
                  <Input
                    defaultValue={`https://img.youtube.com/vi/${_post.url}/sddefault.jpg`}
                    _onChange={e => TextInput(e, setUrl)}
                    value={url}
                  />
                </PostWrap>
                <PostWrap>
                  <p> 동영상 후기:</p>
                  <Input
                    defaultValue={_post.desc}
                    _onChange={e => TextInput(e, setDesc)}
                    value={desc}
                  />
                </PostWrap>
                <Buttons>
                  <Submit>수정 완료</Submit>
                  <Submit onClick={deletePost}>게시물 삭제</Submit>
                </Buttons>
              </PostInput>
            </Body>
          </ModalContent>
        </Wrap>
      ) : null}
    </div>
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
  width: 100px;
  height: 45px;
  margin: 30px 10px;
  padding: 12px 0px;
  background-color: #000;
  border: 1px solid #939597;
  border-radius: 7px;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
