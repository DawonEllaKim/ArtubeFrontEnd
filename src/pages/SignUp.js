import React, { useState } from "react";
import styled from "styled-components";
import { MdLockOutline } from "react-icons/md";
import { Grid, Input, Button } from "../elements";
// import ArtubeLogo from "../Image/ArtubeLogo.png";
import { history } from "../redux/configuerStore";
import { userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const SignUp = props => {
  const dispatch = useDispatch();

  const [userId, setId] = useState("");
  const [password, setPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function TextInput(e, setState) {
    setState(e.target.value);
  }

  const signup = () => {
    console.log("클릭");
    dispatch(userActions.signupAPI(userId, password, confirmPassword));
  };

  return (
    <>
      <Wrap>
        <Grid>
          <Grid>
            <IconWrap>
              <MdLockOutline
                style={{ width: "28px", height: "28px", color: "#000" }}
              />
            </IconWrap>
            <SignInText>Sign Up</SignInText>
          </Grid>

          <Grid>
            <Input
              label=""
              placeholder="Email Address*"
              _onChange={e => TextInput(e, setId)}
              value={userId}
            />
            <Input
              placeholder="Password"
              type="password"
              _onChange={e => TextInput(e, setPwd)}
              label="password1"
              value={password}
            />
            <Input
              label="password2"
              placeholder="Password 확인"
              type="password"
              _onChange={e => TextInput(e, setConfirmPassword)}
              value={confirmPassword}
            />
          </Grid>

          <Grid>
            <Button>LOG IN</Button>
            <Button _onClick={signup}>Sign Up</Button>
          </Grid>
        </Grid>
      </Wrap>
    </>
  );
};
export default SignUp;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 600px;
  /* height: 100vh; */
  margin: 5% auto;
  background-color: #f5df4d;
  border-radius: 5px;
  box-shadow: 5px 5px 10px 5px #9e9e9e;
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

const IdInput = styled.input`
  box-sizing: border-box;
  width: 190%;
  height: 45px;
  margin-bottom: 20px;
  padding: 15px 10px;
  border: 1px solid #939597;
  border-radius: 5px;
  font-size: 16px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;
const PWcheck = styled.button`
  width: 50%;
  height: 45px;
  margin: 0 0 15px 0px;
  padding: 12px 0px;
  background-color: #000;
  border: 1px solid #939597;
  border-radius: 7px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  color: #fff;
  font-weight: 700;
  font-size: 15px;

  cursor: pointer;
`;

const UserExist = styled.button`
  border: none;
  background-color: none;
  color: black;
  background-color: transparent;
  cursor: pointer;
  text-decoration: underline;
  font-size: 15px;
`;
