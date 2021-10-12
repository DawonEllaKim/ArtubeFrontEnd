import React, { useState } from "react";
import styled from "styled-components";
import { MdLockOutline } from "react-icons/md";
import { Grid, Input, Button } from "../elements";
import ArtubeLogo from "../Image/ArtubeLogo.png";
import { history } from "../redux/configuerStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const SignUp = props => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");

  function TextInput(e, setState) {
    setState(e.target.value);
  }

  const signup = () => {
    const user = {
      id,
      pwd,
    };
    pwd === pwdCheck
      ? dispatch(userActions.signupMilddleware(user))
      : window.alert("잘보고치셈");
  };
  return (
    <>
      <Wrap>
        <LeftBox>
          <img
            src={ArtubeLogo}
            style={{
              width: "100%",
            }}
          />
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
              <Input
                label="password2"
                placeholder="Password 확인"
                type="password"
                _onChange={e => TextInput(e, setPwdCheck)}
                value={pwdCheck}
              />
            </Grid>

            <Grid>
              <Button>LOG IN</Button>
              <Button _onClick={signup}>Sign Up</Button>
            </Grid>
          </Grid>
        </RightBox>
      </Wrap>
    </>
  );
};
export default SignUp;

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
