import React, { useState } from "react";
import styled from "styled-components";
import { IoHomeSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import ArtubeLogo3 from "../Image/ArtubeLogo3.png";

import { history } from "../redux/configuerStore";
import { Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";

const Header = () => {
  const token = localStorage.getItem("token");
  const is_signin = token ? true : false;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user);
  console.log(userId);

  const signOut = () => {
    dispatch(userActions.signOutAPI());
    history.replace('/')
  };
  const signIn = () =>{
    history.push('/signin')
  }

  return (
    <>
      <Wrap>
        <Box>
          {/* Home 버튼: 이거 누르면 "/"로 이동*/}
          <IoHomeSharp
            style={{
              width: "26px",
              height: "26px",
              cursor: "pointer",
              marginLeft: "30px",
            }}
            onClick={() => {
              window.location.replace('/')
            }}
          />
          {/* IoHomeOutline */}

          {/* 로고: 이거 눌러도 "/"로 이동*/}
          <Logo
            src={ArtubeLogo3}
            style={{ cursor: "pointer", margin:'10px 0 0 50px' }}
            onClick={() => {
              window.location.replace('/')
            }}
          />

          {/* My Profile 버튼: 이거 누르면 "/mypage"로 이동*/}
          {is_signin ?
          <IoPersonOutline
            style={{
              width: "25px",
              height: "25px",
              border: "2px solid #000",
              borderRadius: "50%",
              padding: "2px",
              cursor: "pointer",
              zIndex: "10000",
              marginLeft: '80px',
            }}
            onClick={() => {
              history.push(`/mypage/${userId}`);
            }}
          />
          : null
          }

          {/* 로그인/로그아웃 버튼 */}
          {is_signin ? 
            <LogInOut onClick={signOut}>로그아웃</LogInOut>
          : <LogInOut onClick={signIn}>로그인</LogInOut>
          }
        </Box>
      </Wrap>
    </>
  );
};

export default Header;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80px;
  background-color: #f5df4d;
  border-bottom: 1px solid #9e9e9e;
  z-index: 100;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  height: 80px;
  margin: auto;
`;

const Logo = styled.img`
  height: 80%;
  width: 300px;
`;

const LogInOut = styled.button`
  border: 2px solid #000;
  border-radius: 3px;
  background-color: transparent;
  color: #000;
  height: 34px;
  margin-right: 30px;
`
