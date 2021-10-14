import React, { useState } from "react";
import styled from "styled-components";
import { MdLockOutline } from "react-icons/md";
import ArtubeLogo from "../Image/ArtubeLogo.png";
import { Grid, Input, Button, Image } from "../elements";
import { userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { history } from "../redux/configuerStore";

const SignIn = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  function TextInput(e, setState) {
    setState(e.target.value);
  }

  const signIn = () => {
    console.log(id, pwd);
    dispatch(userActions.signInAPI(id, pwd));
  };

  return (
    <>
      <Wrap>
        <LeftBox>
          <MainBtn
            onClick={() => {
              history.push("/");
            }}
          >
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
              <Input
                label=""
                placeholder="Id*"
                _onChange={(e) => TextInput(e, setId)}
                value={id}
              />
              <Input
                placeholder="Password"
                type="password"
                _onChange={(e) => TextInput(e, setPwd)}
                label="password1"
                value={pwd}
              />
            </Grid>

            <Grid>
              <Button _onClick={signIn}>LOG IN</Button>
              <NewUser
                onClick={() => {
                  history.push("/signup");
                }}
              >
                회원이 아니신가요? 회원가입하러 가기
              </NewUser>
            </Grid>
          </RightWrap>
        </RightBox>
      </Wrap>
    </>
  );
};

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
`;

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

export default SignIn;
