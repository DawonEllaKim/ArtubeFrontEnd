import React, { useEffect } from "react";

import Header from "../components/Header";
import Post from "../components/Post";
import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { AddModal } from "../components/AddModal";

import { Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../redux/modules/post";
import { history } from "../redux/configuerStore";
import { userActions } from "../redux/modules/user";
import { profileActions } from "../redux/modules/profile";

const Main = () => {
  const token = localStorage.getItem("token");
  const is_signin = token ? true : false;
  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();
  const post_list = useSelector(state => state.post.list);

  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => {
    setShowModal(prev => !prev);
  };

  useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostMiddleware());
      dispatch(userActions.userCheckAPI());
    }
  }, []);

  return (
    <>
      {post_list.length > 2 && (
        <>
          <Header />
          {post_list.map((p, idx) => {
            return <Post {...p} key={idx} />;
          })}
          {is_signin ? (
            <AddButton>
              <IoIosAddCircle
                style={{
                  width: "50px",
                  height: "50px",
                  color: "#f5df4d",
                  cursor: "pointer",
                }}
                onClick={openModal}
              />
            </AddButton>
          ) : null}

          <AddModal showModal={showModal} setShowModal={setShowModal} />
        </>
      )}
    </>
  );
};

export default Main;

const AddButton = styled.div`
  position: fixed;
  bottom: 10px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #000;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    transition: all 300ms ease-in-out;
    transform: scale(1.03);
    box-shadow: 1px 1px 8px 1px #9e9e9e;
    cursor: pointer;
  }
`;
