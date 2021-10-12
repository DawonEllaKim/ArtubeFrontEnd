import React from "react";
import styled from "styled-components";

import { Grid, Input, Button, Text } from "../elements";

const Comment = () => {
  return (
    <>
      <Grid>
        <CommentWrap>
          <User>
            김다원
          </User>
          <UserComment>재미따~~~완전 재미따~~~~ 강추강추 꼭봐여~~</UserComment>
        </CommentWrap>
        <CommentWrap>
          <User>
            김덕현
          </User>
          <UserComment>노잼이다~~~</UserComment>
        </CommentWrap>
        <CommentWrap>
          <User>
            안성규
          </User>
          <UserComment>아직 못 봤습니당</UserComment>
        </CommentWrap>
        <CommentWrap>
          <User>
            박선웅
          </User>
          <UserComment>시즌 2는 언제 나와요</UserComment>
        </CommentWrap>
        <CommentWrap>
          <User>
            황유정
          </User>
          <UserComment>항해 끝나면 볼거임</UserComment>
        </CommentWrap>
        <CommentWrap>
          <User>
            김효진
          </User>
          <UserComment>나빼고 다봄 외국인들도 다보는데 나만 못봄</UserComment>
        </CommentWrap>
      </Grid>
    </>
  );
};

const CommentWrap = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;
`
const User = styled.div`
    width:25%;
    font-weight: bold;
    font-size: 14px;
`
const UserComment = styled.div`
    width: 73%;
    text-align: left;
    margin: 0 1%;
    font-size: 14px;
`

export default Comment;
