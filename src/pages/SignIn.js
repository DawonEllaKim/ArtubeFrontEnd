import React, { useState } from "react";
import styled from "styled-components";
import { MdLockOutline } from "react-icons/md";
import { Grid, Input, Button, Image } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

// import ArtubeLogo from "../Image/ArtubeLogo.png";

const SignIn = props => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");

  function TextInput(e, setState) {
    setState(e.target.value);
  }

  const signin = () => {
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
          <Image
            src="https://i.pinimg.com/originals/7d/c9/93/7dc993c70d4adba215b87cafdc59d82d.png"
            size="100"
            shape="rectangle"
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
              <Button _onClick={signin}>Sign Up</Button>
            </Grid>
          </Grid>
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
