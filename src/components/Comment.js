import React, { useEffect } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

import { Grid, Input, Button, Text } from "../elements";
import { useDispatch } from "react-redux";
import { commentActions } from "../redux/modules/comment";

const Comment = props => {
  const { commentUserId, commentDesc, commentId, postId } = props;

  const dispatch = useDispatch();

  const deleteComment = () => {
    dispatch(commentActions.deleteCommentMiddleware(commentId));
  };

  useEffect(() => {
    dispatch(commentActions.getCommentMiddleware(postId));
  }, []);

  return (
    <>
      <Grid>
        <CommentWrap>
          <User>{commentUserId}</User>
          <UserComment>{commentDesc}</UserComment>
          <DeleteBtn onClick={deleteComment}>
            <IoMdClose />
          </DeleteBtn>
        </CommentWrap>
      </Grid>
    </>
  );
};

const CommentWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
`;
const User = styled.div`
  width: 77px;
  font-weight: bold;
  font-size: 14px;
`;
const UserComment = styled.div`
  width: 190px;
  text-align: left;
  font-size: 14px;
  word-break: break-all;
`;
const DeleteBtn = styled.div`
  width: 23px;
  color: #939597;
  cursor: pointer;
`;

export default Comment;
