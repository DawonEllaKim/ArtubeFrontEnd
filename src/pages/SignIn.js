import React from "react";
import styled from "styled-components";
import { MdLockOutline } from "react-icons/md";
import { Grid, Input, Button, Image } from "../elements";
// import ArtubeLogo from "../Image/ArtubeLogo.png";

const SignIn = props => {
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
              <Input label="" placeholder="Email Address*" />
              <Input label="" placeholder="Password*" type="password" />
            </Grid>

            <Grid>
              <Button>LOG IN</Button>
              <Button>Sign Up</Button>
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
