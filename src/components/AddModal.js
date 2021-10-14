import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
// import { useDispatch } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import post, { postActions } from "../redux/modules/post";
import { ImCancelCircle } from "react-icons/im";
import { IoPersonOutline } from "react-icons/io5";
import { Image } from "../elements";

export const AddModal = (props) => {
  const modalRef = useRef();
  const dispatch = useDispatch();

  const closemodal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const { showModal, setShowModal, _postId } = props;

  function TextInput(e, setState) {
    setState(e.target.value);
  }
  const _post = useSelector((state) => {
    console.log("스테이트포스트", state.post);
    return state.post.list;
  });
  // console.log("스테이트포스트", state.post);

  // // .filter(
  // // 	(p) => p.id === _postId
  // // 	)[0];
  console.log("언더바포스트", _post);
  // // const post_list = useSelector((state) => state.post.list);
  // const _post.id = props.match.params.id;
  // console.log("파람즈", props.match.params.id);
  console.log("프롭스", props);
  // // return;
  const is_edit = _post.id ? true : false;
  console.log("이즈에딧", is_edit);

  // const _post = is_edit ? post.find((p) => p.id === post_id) : null;

  const [title, setTitle] = useState(is_edit ? _post.title : "");
  const [url, setUrl] = useState(is_edit ? _post.youtube_url : "");
  const [desc, setDesc] = useState(is_edit ? _post.desc : "");
  const [preview, setPreview] = useState(is_edit ? _post.image_url : "");

  const getPreview = () => {
    const videoId = url.split("=")[1];
    const image_url = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
    setPreview(image_url);
  };

  const deletePost = () => {
    dispatch(postActions.deletePostMiddleware(_postId));
  };

  const addPost = () => {
    const post = {
      title,
      url,
      desc,
    };
    // setShowModal(false);
    setTitle("");
    setUrl("");
    setDesc("");
    dispatch(postActions.addPostMiddleware(post));
  };

  const editPost = () => {
    const post = {
      title,
      url,
      desc,
    };
    setTitle("");
    setUrl("");
    setDesc("");
    dispatch(postActions.editPostMiddleware(_post.id, post));
  };

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
                    // defaultValue={is_edit ? title : _post.title}
                    onChange={(e) => TextInput(e, setTitle)}
                    value={title}
                  />
                </PostWrap>
                <PostWrap>
                  <p> 동영상 url:</p>

                  <Input
                    // defaultValue={is_edit ? url : _post.youtube_url}
                    onChange={(e) => TextInput(e, setUrl)}
                    value={url}
                  />
                  <Submit onClick={getPreview}>이미지</Submit>
                </PostWrap>
                <PostWrap>
                  <Image shape="rectangle" src={preview} />
                </PostWrap>
                <PostWrap>
                  <p> 동영상 후기:</p>
                  <Input
                    onChange={(e) => TextInput(e, setDesc)}
                    value={desc}
                    // defaultValue={is_edit ? desc : _post.desc}
                  />
                </PostWrap>
                <Submit onClick={addPost}>게시물 추가</Submit>
                <Submit onClick={editPost}>수정 완료</Submit>
                <Submit onClick={deletePost}>게시물 삭제</Submit>
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
