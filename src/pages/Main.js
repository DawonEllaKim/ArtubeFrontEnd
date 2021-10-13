import React, { useEffect } from "react";

import Post from "../components/Post";
import { Grid } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../redux/modules/post";

import Header from "../components/Header";

const Main = () => {
  const dispatch = useDispatch();
  const post_list = useSelector(state => state.post.list);
  console.log(post_list);

  useEffect(() => {
    dispatch(postActions.getPostMiddleware());
  }, []);

  return (
    <>
      <Header />
      {post_list.map((p, idx) => {
        return <Post {...p} key={idx} />;
      })}
    </>
  );
};

export default Main;
