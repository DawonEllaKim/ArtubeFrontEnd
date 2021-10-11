import React from "react";
import styled from "styled-components";
import { MdLockOutline } from "react-icons/md";

const SignIn = (props) => {
  return (
    <>
      <Wrap>
        <LeftBox>Image goes here</LeftBox>

        <RightBox>
          <IconWrap>
            <MdLockOutline
              style={{ width: "24px", height: "24px", color: "#000" }}
            />
          </IconWrap>
          <div>Sign In</div>
          <input></input>
          <input></input>
          <div> 수정 </div>
          <div> 수정 </div>
          <div> hello </div>
          <div> hello </div>
          <div> hello </div>
          <div> hello </div>

          <button>Sign In</button>
          <button>Don't have an account? Sign Up</button>
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
  width: 55%;
  height: 100%;
  background-color: #f5df4d;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 100%;
  background-color: #fff;
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #f5df4d;
  border-radius: 50%;
`;
