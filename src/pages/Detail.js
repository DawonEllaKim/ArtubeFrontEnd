import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import Header from "../components/Header";
import Comment from "../components/Comment";

import { Grid, Input, Text, Button, Image } from "../elements";
import { history } from "../redux/configuerStore";

import { useDispatch, useSelector } from "react-redux";
import { commentActions } from "../redux/modules/comment";
import { postActions } from "../redux/modules/post";
import { EditModal } from "../components/EditModal";

const Detail = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const comment_list = useSelector((state) => state.comment.list);
  const postId = props.match.params.postId;
  const post = post_list.filter((p) => p.id === postId)[0];

  const [commentDesc, setComment] = useState("");

  const addComment = () => {
    const commentUserId = "나다요";
    dispatch(
      commentActions.addCommentMiddleware(commentUserId, commentDesc, postId)
    );
    setComment("");
    console.log("등록");
  };

  useEffect(() => {
    dispatch(postActions.getPostMiddleware());
    dispatch(commentActions.getCommentMiddleware(postId));
  }, []);

  return (
    <>
      {post && (
        <>
          <Header />
          <CommentWrap>
            <Left>
              <BtnWrap>
                <IoArrowBackCircleOutline
                  onClick={() => {
                    history.goBack();
                  }}
                  style={{ fontSize: "28px" }}
                />
              </BtnWrap>
              <TitleWrap>{post.title}</TitleWrap>
              <ImageWrap>
                <Image shape="rectangle" src={post.image_url} />
              </ImageWrap>
            </Left>
            <DetailWrap>
              <User>
                <FaUserCircle
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "#939597",
                    margin: "10px",
                  }}
                />
                <UserLink
                  onClick={() => {
                    history.push(`/myPage/${post.userId}`);
                  }}
                >
                  <Text bold>{post.userId}</Text>
                </UserLink>
                <EditButton onClick={openModal}>Edit</EditButton>
              </User>
              <Description>{post.desc}</Description>
              <Comments>
                {comment_list.map((c, idx) => {
                  return <Comment {...c} key={idx} />;
                })}
              </Comments>
              <InputWrap>
                <InputBox
                  onChange={(e) => setComment(e.target.value)}
                  value={commentDesc}
                />
                <AddButton onClick={addComment}>등록</AddButton>
              </InputWrap>
            </DetailWrap>
          </CommentWrap>

          <EditModal
            _postId={postId}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </>
      )}
    </>
  );
};

const CommentWrap = styled.div`
  display: flex;
  width: 900px;
  border: 1px solid #f5df4d;
  border-radius: 2px;
  padding: 5px 0;
  margin: 100px auto;
  box-shadow: 2px 2px 2px #dbdbdb;
`;

const Left = styled.div`
  position: relative;
`;
const BtnWrap = styled.div`
  position: absolute;
  top: 10px;
  left: 12px;
  color: #939597;
  cursor: pointer;
`;
const TitleWrap = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #939597;
  padding: 11px 0;
`;
const ImageWrap = styled.div`
  width: 600px;
`;
const DetailWrap = styled.div`
  position: relative;
  width: 295px;
  margin-right: 5px;
  box-sizing: border-box;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  width: 100%;
  position: absolute;
  top: 0;
`;
const UserLink = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const EditButton = styled.button`
  width: 45px;
  height: 30px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  color: #939597;
  background-color: #fff;
  cursor: pointer;
`;

const Description = styled.div`
  font-size: 14px;
  text-align: left;
  padding: 58px 5px 10px 10px;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
`;

const Comments = styled.div`
  padding-right: 5px;
`;
const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #dbdbdb;
  padding-top: 5px;
`;

const InputBox = styled.input`
  border: none;
  border-bottom: 1px solid #939597;
  padding: 4px;
  width: 235px;
`;
const AddButton = styled.button`
  border: none;
  background-color: #939597;
  color: #fff;
  width: 45px;
  padding: 8px 0;
  border-radius: 5px;
  cursor: pointer;
`;

export default Detail;
