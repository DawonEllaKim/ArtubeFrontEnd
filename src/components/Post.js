import React from "react";
import styled from "styled-components";
import { Grid, Image, Text } from "../elements";
import { FaUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

import { history } from "../redux/configuerStore";

const Post = (props) => {
  const { userId, title, date, postId, image_url } = props;

  return (
    <>
      <Grid
        width="600px"
        border=" 1px solid #f5df4d"
        borderRadius="2px"
        margin="100px auto"
        shadow=" 2px 2px 2px #dbdbdb"
      >
        {/* 프로필 아이콘 + 유저아이디 + 데이트*/}
        <Top>
          <Grid is_flex>
            {/* 프로필 아이콘 */}
            <FaUserCircle
              style={{
                width: "24px",
                height: "24px",
                color: "#939597",
                margin: "0 10px",
              }}
            />

            {/* user id */}
            <UserLink
              onClick={() => {
                history.push(`/mypage/${userId}`);
              }}
            >
              <Text color="#939597" bold size="16px">
                {userId}
              </Text>
            </UserLink>
          </Grid>

          <Grid is_flex >
            {/* 데이트*/}
            <Text color="#939597" size="16px">
              {date}
            </Text>
            <MdDateRange
              style={{
                width: "24px",
                height: "24px",
                color: "#939597",
                margin: "0 10px",
              }}
            />
          </Grid>
        </Top>

        {/* 포스트 임베드  */}
        <Grid>
          <ImageLink
            onClick={() => {
              history.push(`/detail/${postId}`);
            }}
          >
            <Image shape="rectangle" src={image_url} />
          </ImageLink>
        </Grid>

        {/* 밑에 타이틀 */}
        <Grid>
          <TitleLink
            onClick={() => {
              history.push(`/detail/${postId}`);
            }}
          >
            <Text color="#939597" bold size="24px" margin=" 20px auto">
              {title}
            </Text>
          </TitleLink>
        </Grid>
      </Grid>
    </>
  );
};

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`

const UserLink = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const ImageLink = styled.button`
  width: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const TitleLink = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default Post;
