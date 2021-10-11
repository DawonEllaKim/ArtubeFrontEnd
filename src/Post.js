import React, { useState } from "react";
import { Grid, Image, Text, Button } from "./elements";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "./redux/modules/post";

const Post = props => {
  const post_id = props.id;
  const dispatch = useDispatch();

  return (
    <>
      <Grid>
        <Grid is_flex>
          <Grid is_flex width="auto">
            <Image
              shape="circle"
              src={props.user_info.user_profile}
              onClick={() => {}}
            />
            <Text bold>{props.author}</Text>
            <Text bold>{props.insert_dt.split(" ")[0]}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Button
              width="auto"
              padding="10px"
              size="10px"
              margin="0px 5px 0px 0px"
              _onClick={() => {}}
            >
              TBD
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Image shape="rectangle" src={props.image_url} margin="10px" />
      </Grid>
      <Grid>
        <Text>{props.desc}</Text>
        <Text>{props.url}</Text>
      </Grid>
    </>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "다니엘",
    user_profile:
      "https://www.007.com/wp-content/uploads/2020/05/B25_11846_RC.jpg",
  },
  image_url: "https://www.007.com/wp-content/uploads/2020/05/B25_11846_RC.jpg",
  contents: "노타임투다이",
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;
