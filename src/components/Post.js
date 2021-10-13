import React from "react";
import { Grid, Image, Text } from "../elements";
import { FaUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

import { history } from "../redux/configuerStore";

const Post = props => {
  const { userId, title, url, date } = props;

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
            <Text color="#939597" bold size="16px">
              {userId}
            </Text>
          </Grid>
          <Grid is_flex width="auto">
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
        </Grid>

        <Grid padding="0">
          <Image
            shape="rectangle"
            src={`https://img.youtube.com/vi/${url}/sddefault.jpg`}
          />
        </Grid>
        <Grid is_flex>
          <Grid is_flex>
            <Text color="#939597" bold size="24px" margin=" 20px auto">
              {title}
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Post;
