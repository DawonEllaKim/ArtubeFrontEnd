import React from "react";
import styled from "styled-components";
import { Grid, Image, Text } from "../elements";
import { FaUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

import { history } from "../redux/configuerStore";

const Post = () => {
  return (
    <>
      <Grid
        width="65%"
        border=" 1px solid #f5df4d"
        borderRadius="2px"
        margin="70px auto"
        shadow=" 2px 2px 2px #dbdbdb"
      >
        <Grid is_flex>
          <Grid is_flex width="auto">
            <FaUserCircle
              style={{
                width: "24px",
                height: "24px",
                color: "#939597",
                margin: "0 10px",
              }}
            />
            <UserLink
              onClick={() => {
                history.push("/mypage");
              }}
            >
              <Text color="#939597" bold size="16px">
                Hwang
              </Text>
            </UserLink>
          </Grid>
          <Grid is_flex width="auto">
            <Text color="#939597" size="16px">
              2021.10.10
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
        </Grid>

        <Grid>
          <ImageLink
            onClick={() => {
              history.push("/detail");
            }}
          >
            <Image shape="rectangle" />
          </ImageLink>
        </Grid>
        <Grid>
          <TitleLink
            onClick={() => {
              history.push("/detail");
            }}
          >
            <Text color="#939597" bold size="24px" margin=" 20px auto">
              폰트를 바꿔보자~
            </Text>
          </TitleLink>
        </Grid>
      </Grid>
    </>
  );
};

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
