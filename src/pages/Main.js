import React from "react";

import Header from "../components/Header";
import Post from "../components/Post";
import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { AddModal } from "../components/AddModal";

import { Grid } from "../elements";

const Main = () => {
  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Header />
      <Post />
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
      <AddModal showModal={showModal} setShowModal={setShowModal} />
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
