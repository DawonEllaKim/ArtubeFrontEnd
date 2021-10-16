import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import { IoPersonOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../redux/modules/post";
import { Image } from "../elements";

export const EditModal = (props) => {
  const modalRef = useRef();

  const closemodal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const { showModal, setShowModal, _postId } = props;

  function TextInput(e, setState) {
    setState(e.target.value);
  }

  const _post = useSelector((state) => state.post.list).filter(
    (p) => p.id === _postId
  )[0];
  const userId = _post.userId;
  // console.log(_post.userId);

  const [title, setTitle] = useState(_post.title);
  const [url, setUrl] = useState(_post.youtube_url);
  const [desc, setDesc] = useState(_post.desc);
  const [preview, setPreview] = useState(_post.image_url);

  const dispatch = useDispatch();

  const deletePost = () => {
    dispatch(postActions.deletePostMiddleware(_postId));
  };

  const getPreview = () => {
    const videoId = url.split("=")[1];
    const image_url = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
    setPreview(image_url);
  };

  const editPost = () => {
    const post = {
      title,
      youtube_url: url,
      desc,
    };
    setTitle("");
    setUrl("");
    setDesc("");
    dispatch(postActions.editPostMiddleware(_post.id, post));
  };

  return (
    <div>
      {showModal && _post ? (
        <Wrap ref={modalRef} onClick={closemodal}>
          <ModalContent showModal={showModal}>
            <Head>
              <h2>Edit Post</h2>
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
              <InputBox>
                <p> 동영상 제목:</p>
                <Input
                  defaultValue={_post.title}
                  onChange={(e) => TextInput(e, setTitle)}
                />
              </InputBox>

              <InputBox>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    marginLeft: "50px",
                  }}
                >
                  <p
                  // style={{ marginLeft: "180px" }}
                  >
                    동영상 url:
                  </p>
                  <PicBtn onClick={getPreview}>썸네일 확인하기</PicBtn>
                </div>

                <Input
                  defaultValue={_post.youtube_url}
                  onChange={(e) => TextInput(e, setUrl)}
                />
              </InputBox>

              <div>
                <img
                  src={preview}
                  style={{ width: "80%", marginTop: "10px" }}
                />
              </div>

              <div>
                <p> 동영상 후기:</p>
                <Input
                  defaultValue={_post.desc}
                  onChange={(e) => TextInput(e, setDesc)}
                />
              </div>

              <Buttons>
                <Submit onClick={editPost}>수정 완료</Submit>
                <Submit onClick={deletePost}>게시물 삭제</Submit>
              </Buttons>
            </Body>
          </ModalContent>
        </Wrap>
      ) : null}
    </div>
  );
};

const PicBtn = styled.button`
  height: 50px;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  cursor: pointer;
  /* font-size: large; */
`;
const InputBox = styled.div`
  width: 100%;
  /* background-color: black; */
  /* color: white; */
`;
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
  /* background-color: black; */
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
  width: 50%;
  /* height: 1%; */
  background-color: white;
  border-radius: 20px;
`;
const Body = styled.div`
  width: 90%;

  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto auto auto -1px;
  /* background-color: pink; */

  /* align-items: center; */
`;

const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  width: 100%;
  height: 90px;
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
  /* width: 100px;
  height: 45px; */
  width: 100px;
  /* margin: 30px 10px; */
  padding: 12px 0px;
  background-color: #000;
  border: 1px solid #939597;
  border-radius: 7px;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  /* margin: auto; */
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;
