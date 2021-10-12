import React from "react";
import { Grid, Image, Text } from "../elements";

import { history } from "../redux/configuerStore";

const Post = () => {
  return (
    <>
      <Grid
        width="900px"
        border=" 3px solid #f5df4d"
        borderRadius="50px"
        padding="30px 50px"
        margin="100px auto"
      >
        <Grid is_flex>
          <Grid is_flex width="auto">
            <Text bold size="16px">
              Hwang
            </Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text bold size="24px">
              오징어 게임
            </Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text size="16px">2021.10.10</Text>
          </Grid>
        </Grid>
        <Image shape="rectangle" />
      </Grid>
    </>
  );
};

export default Post;
