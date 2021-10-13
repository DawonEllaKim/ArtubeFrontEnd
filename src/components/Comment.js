import React from "react";
import styled from "styled-components";

import { Grid, Input, Button, Text } from "../elements";

const Comment = props => {
  const { commentUserId, commentDesc } = props;
  return (
    <>
      <Grid>
        <CommentWrap>
          <User>{commentUserId}</User>
          <UserComment>{commentDesc}</UserComment>
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
  width: 25%;
  font-weight: bold;
  font-size: 14px;
`;
const UserComment = styled.div`
  width: 73%;
  text-align: left;
  margin: 0 1%;
  font-size: 14px;
`;

export default Comment;
