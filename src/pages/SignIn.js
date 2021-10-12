import React, { useState } from "react";
import styled from "styled-components";
import { MdLockOutline } from "react-icons/md";
import ArtubeLogo from "../Image/ArtubeLogo.png";
import { Grid, Input, Button, Image } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const SignIn = props => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  function TextInput(e, setState) {
    setState(e.target.value);
  }

  const login = () => {
    dispatch(userActions.loginMiddleware(id, pwd));
  };
  return (
    <>
      <Wrap>
        <LeftBox>
          <img src={ArtubeLogo} style={{ width: "100%" }} />
        </LeftBox>

        <RightBox>
          <Grid>
            <Grid>
              <IconWrap>
                <MdLockOutline
                  style={{ width: "28px", height: "28px", color: "#000" }}
                />
              </IconWrap>
              <SignInText>Sign In</SignInText>
            </Grid>

            <Grid>
              <Input
                label=""
                placeholder="Email Address*"
                _onChange={e => TextInput(e, setId)}
                value={id}
              />
              <Input
                placeholder="Password"
                type="password"
                _onChange={e => TextInput(e, setPwd)}
                label="password1"
                value={pwd}
              />
            </Grid>

            <Grid>
              <Button _onClick={login}>LOG IN</Button>
              <Button _onClick={() => {}}>Sign Up</Button>
            </Grid>
            <NewUser>회원이 아니신가요? 회원가입하러 가기</NewUser>
          </Grid>
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

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 100%;
  background-color: #f5df4d;
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
