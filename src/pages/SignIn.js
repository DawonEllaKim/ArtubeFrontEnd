import React from "react";
import styled from "styled-components";
import { MdLockOutline } from "react-icons/md";
import { Grid, Input, Button, Image } from "../elements";
import ArtubeLogo from "../Image/ArtubeLogo.png";

import { history } from '../redux/configuerStore';

const SignIn = (props) => {
  return (
    <>
      <Wrap>
        <LeftBox>
          <MainBtn onClick={()=>{
            history.push('/')
          }}>
            <img src={ArtubeLogo} style={{ width: "100%" }} />
          </MainBtn>
        </LeftBox>

        <RightBox>
          <RightWrap>
            <IconWrap>
              <MdLockOutline
                style={{ width: "28px", height: "28px", color: "#000" }}
              />
            </IconWrap>
            <SignInText>Sign In</SignInText>

            <Grid>
              <Input label="" placeholder="Email Address*" />
              <Input label="" placeholder="Password*" type="password" />
            </Grid>

            <Grid>
              <Button>LOG IN</Button>
              <NewUser onClick={() =>{
                history.push('/signup')
              }}>회원이 아니신가요? 회원가입하러 가기</NewUser>
            </Grid>
          </RightWrap>
        </RightBox>
      </Wrap>
    </>
  );
};
export default SignIn;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55%;
  height: 100%;
  background-color: #fff;
`;

const MainBtn = styled.button`
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 100%;
  background-color: #f5df4d;
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 600px;
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background-color: #fff;
  border-radius: 50%;
`;

const SignInText = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 10px 0 20px 0px;
`;
const NewUser = styled.button`
  border: none;
  background-color: none;
  color: black;
  background-color: transparent;
  cursor: pointer;
  text-decoration: underline;
  font-size: 15px;
`;
